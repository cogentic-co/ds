/** Shared animation constants — keeps motion usage consistent across projects. */

/** Standard ease curve used for all fade/slide transitions. */
export const EASE_OUT: [number, number, number, number] = [0.22, 0.61, 0.36, 1]

/** Default whileInView viewport config. */
export const VIEWPORT_ONCE = { once: true, margin: "-80px" } as const

/** Standard fade-up transition (matches CSS @keyframes fade-up). */
export const FADE_UP = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: VIEWPORT_ONCE,
  transition: { duration: 0.5, ease: EASE_OUT },
} as const

/** Default transition timing. */
export const TRANSITION_DEFAULT = { duration: 0.5, ease: EASE_OUT } as const

/** Faster transition for micro-interactions. */
export const TRANSITION_FAST = { duration: 0.35, ease: EASE_OUT } as const

/** Stagger children container variant (use with motion variants API). */
export const STAGGER_CHILDREN = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
} as const

/** Individual item variant for use inside stagger containers. */
export const SLIDE_UP_VARIANT = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
} as const
