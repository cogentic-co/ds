"use client"

import { useEffect, useRef } from "react"

import { cn } from "../lib/utils"

// 4×4 Bayer dithering matrix (normalised to 0–1)
const BAYER = [
  0 / 16,
  8 / 16,
  2 / 16,
  10 / 16,
  12 / 16,
  4 / 16,
  14 / 16,
  6 / 16,
  3 / 16,
  11 / 16,
  1 / 16,
  9 / 16,
  15 / 16,
  7 / 16,
  13 / 16,
  5 / 16,
]

const BAYER_SCALE = 4
const DOWNSAMPLE = 4

type RGB = [number, number, number]

type ThemeColors = {
  fg: RGB
  bg: RGB
}

const DEFAULT_COLORS = {
  light: { fg: [0xdc, 0xdf, 0xe3] as RGB, bg: [0xfa, 0xfa, 0xfa] as RGB },
  dark: { fg: [0x1a, 0x23, 0x34] as RGB, bg: [0x3a, 0x4a, 0x5c] as RGB },
}

function isDark() {
  return document.documentElement.classList.contains("dark")
}

interface BgShaderProps {
  className?: string
  /** Override foreground/background colors for light and dark modes. Accepts RGB tuples. */
  colors?: { light: ThemeColors; dark: ThemeColors }
}

function BgShader({ className, colors = DEFAULT_COLORS }: BgShaderProps) {
  const colorsRef = useRef(colors)
  colorsRef.current = colors

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)
  const visibleRef = useRef(false)
  const frameCount = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    let reducedMotion = mq.matches
    const onMotionChange = (e: MediaQueryListEvent) => {
      reducedMotion = e.matches
    }
    mq.addEventListener("change", onMotionChange)

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resolve = () => {
      const c = colorsRef.current
      return isDark() ? c.dark : c.light
    }

    let { fg, bg } = resolve()

    const updateColors = () => {
      const resolved = resolve()
      fg = resolved.fg
      bg = resolved.bg
    }

    const darkMq = window.matchMedia("(prefers-color-scheme: dark)")
    darkMq.addEventListener("change", updateColors)

    const mutObs = new MutationObserver(updateColors)
    mutObs.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    const ioObs = new IntersectionObserver(
      ([entry]) => {
        visibleRef.current = entry.isIntersecting
        if (entry.isIntersecting) {
          rafRef.current = requestAnimationFrame(render)
        }
      },
      { rootMargin: "100px" },
    )
    ioObs.observe(canvas)

    const startTime = performance.now()
    let cachedImageData: ImageData | null = null
    let cachedW = 0
    let cachedH = 0

    const render = (now: number) => {
      if (!visibleRef.current || reducedMotion) return

      frameCount.current++
      if (frameCount.current % 2 !== 0) {
        rafRef.current = requestAnimationFrame(render)
        return
      }

      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (w === 0 || h === 0) {
        rafRef.current = requestAnimationFrame(render)
        return
      }

      const cw = Math.ceil(w / DOWNSAMPLE)
      const ch = Math.ceil(h / DOWNSAMPLE)

      if (canvas.width !== cw || canvas.height !== ch) {
        canvas.width = cw
        canvas.height = ch
      }

      if (!cachedImageData || cachedW !== cw || cachedH !== ch) {
        cachedImageData = ctx.createImageData(cw, ch)
        cachedW = cw
        cachedH = ch
      }

      const data = cachedImageData.data
      const time = ((now - startTime) / 1000) * 0.5
      const t3 = time / 3
      const aspect = w / h

      for (let py = 0; py < ch; py++) {
        for (let px = 0; px < cw; px++) {
          const u = (px / cw) * aspect * 3.5 + t3 * 0.3
          const v = (py / ch) * 3.5 + t3 * 0.3

          const k = 0.1 + Math.cos(v + Math.sin(0.148 - t3)) + 2.4 * t3
          const w2 = 0.9 + Math.sin(u + Math.cos(0.628 + t3)) - 0.7 * t3
          const d = Math.sqrt(u * u + v * v)
          const s = 7.0 * Math.cos(d + w2) * Math.sin(k + w2)

          const r = 0.5 + 0.5 * Math.cos(s + 0.2)
          const g = 0.5 + 0.5 * Math.cos(s + 0.5)
          const b = 0.5 + 0.5 * Math.cos(s + 0.9)

          const gray = 0.299 * r + 0.587 * g + 0.114 * b

          const ox = px * DOWNSAMPLE
          const oy = py * DOWNSAMPLE
          const bx = Math.floor(ox / BAYER_SCALE) & 3
          const by = Math.floor(oy / BAYER_SCALE) & 3
          const threshold = BAYER[bx + by * 4]

          const idx = (py * cw + px) * 4
          const c = gray > threshold ? fg : bg
          data[idx] = c[0]
          data[idx + 1] = c[1]
          data[idx + 2] = c[2]
          data[idx + 3] = 255
        }
      }

      ctx.putImageData(cachedImageData, 0, 0)
      rafRef.current = requestAnimationFrame(render)
    }

    if (reducedMotion) {
      rafRef.current = requestAnimationFrame(() => {
        visibleRef.current = true
        frameCount.current = 1
        const w = canvas.clientWidth
        const h = canvas.clientHeight
        if (w === 0 || h === 0) return
        const cw = Math.ceil(w / DOWNSAMPLE)
        const ch = Math.ceil(h / DOWNSAMPLE)
        canvas.width = cw
        canvas.height = ch
        const imageData = ctx.createImageData(cw, ch)
        const data = imageData.data
        const aspect = w / h
        for (let py = 0; py < ch; py++) {
          for (let px = 0; px < cw; px++) {
            const u = (px / cw) * aspect * 3.5
            const v = (py / ch) * 3.5
            const k = 0.1 + Math.cos(v + Math.sin(0.148))
            const w2 = 0.9 + Math.sin(u + Math.cos(0.628))
            const d = Math.sqrt(u * u + v * v)
            const s = 7.0 * Math.cos(d + w2) * Math.sin(k + w2)
            const gray =
              0.299 * (0.5 + 0.5 * Math.cos(s + 0.2)) +
              0.587 * (0.5 + 0.5 * Math.cos(s + 0.5)) +
              0.114 * (0.5 + 0.5 * Math.cos(s + 0.9))
            const ox = px * DOWNSAMPLE
            const oy = py * DOWNSAMPLE
            const bx = Math.floor(ox / BAYER_SCALE) & 3
            const by = Math.floor(oy / BAYER_SCALE) & 3
            const threshold = BAYER[bx + by * 4]
            const idx = (py * cw + px) * 4
            const c = gray > threshold ? fg : bg
            data[idx] = c[0]
            data[idx + 1] = c[1]
            data[idx + 2] = c[2]
            data[idx + 3] = 255
          }
        }
        ctx.putImageData(imageData, 0, 0)
      })
    }

    return () => {
      cancelAnimationFrame(rafRef.current)
      ioObs.disconnect()
      mutObs.disconnect()
      darkMq.removeEventListener("change", updateColors)
      mq.removeEventListener("change", onMotionChange)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className={cn("absolute inset-0 opacity-50", className)}
      data-slot="bg-shader"
    >
      <canvas
        ref={canvasRef}
        className="block h-full w-full"
        style={{ imageRendering: "pixelated" }}
      />
    </div>
  )
}

export type { BgShaderProps, RGB, ThemeColors }
export { BgShader }
