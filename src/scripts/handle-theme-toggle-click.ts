import { getTheme, setTheme } from 'astro-theme-toggle/client'

const STYLE_ID = 'astro-theme-toggle-temporary-styles'
const STYLE_CONTENT =
  '::view-transition-old(root), ::view-transition-new(root) { animation: none; mix-blend-mode: normal; }'
const DEFAULT_DURATION_MS = 750

function removeTemporaryStyles() {
  const style = document.getElementById(STYLE_ID)
  style?.remove()
}

function injectTemporaryStyles() {
  removeTemporaryStyles()
  const style = document.createElement('style')
  style.id = STYLE_ID
  style.textContent = STYLE_CONTENT
  document.head.appendChild(style)
}

function toggleTheme() {
  const theme = getTheme()
  setTheme(theme === 'light' ? 'dark' : 'light')
}

function getDurationMs(target: EventTarget | null | undefined) {
  const rawValue = target instanceof HTMLElement ? target.dataset.duration : undefined
  const parsed = rawValue ? Number.parseFloat(rawValue) : Number.NaN
  return Number.isFinite(parsed) ? parsed : DEFAULT_DURATION_MS
}

async function startCircleAnimation(
  callback: () => void,
  x: number,
  y: number,
  durationMs: number,
) {
  const doc = document as unknown as {
    startViewTransition?: (updateCallback?: () => unknown) => {
      ready?: Promise<void>
      finished?: Promise<void>
    }
  }

  if (typeof doc.startViewTransition !== 'function') {
    callback()
    return
  }

  injectTemporaryStyles()

  const transition = doc.startViewTransition(() => {
    callback()
  })

  await transition?.ready
  void transition?.finished?.then(removeTemporaryStyles)

  const gradientOffset = 0.7
  const maskSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 8 8"><defs><radialGradient id="toggle-theme-gradient"><stop offset="${gradientOffset}"/><stop offset="1" stop-opacity="0"/></radialGradient></defs><circle cx="4" cy="4" r="4" fill="url(#toggle-theme-gradient)"/></svg>`
  const maskUrl = `data:image/svg+xml;base64,${window.btoa(maskSvg)}`

  const w = window.innerWidth
  const h = window.innerHeight

  const maxRadius = Math.ceil(
    Math.hypot(Math.max(x, w - x), Math.max(y, h - y)) / gradientOffset,
  )

  document.documentElement.animate(
    {
      maskImage: [`url('${maskUrl}')`, `url('${maskUrl}')`],
      maskRepeat: ['no-repeat', 'no-repeat'],
      maskPosition: [`${x}px ${y}px`, `${x - maxRadius}px ${y - maxRadius}px`],
      maskSize: ['0', `${2 * maxRadius}px`],
    },
    {
      duration: durationMs,
      easing: 'ease-in',
      pseudoElement: '::view-transition-new(root)',
    },
  )
}

export function handleThemeToggleClick(event: MouseEvent | { clientX: number; clientY: number; currentTarget?: EventTarget | null }) {
  const durationMs = getDurationMs('currentTarget' in event ? event.currentTarget : undefined)
  void startCircleAnimation(toggleTheme, event.clientX, event.clientY, durationMs)
}
