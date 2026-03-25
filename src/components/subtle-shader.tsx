"use client"

import { useEffect, useRef } from "react"

import { cn } from "../lib/utils"

type Palette = "blue" | "green" | "amber"

const PALETTES: Record<Palette, { light: string[]; dark: string[] }> = {
  blue: {
    light: ["100, 140, 200", "80, 160, 120", "140, 100, 180"],
    dark: ["140, 180, 255", "160, 255, 180", "200, 160, 255"],
  },
  green: {
    light: ["60, 140, 90", "100, 160, 60", "40, 120, 130"],
    dark: ["120, 220, 150", "180, 255, 120", "100, 200, 180"],
  },
  amber: {
    light: ["180, 130, 60", "160, 100, 80", "140, 140, 60"],
    dark: ["255, 200, 120", "255, 160, 140", "220, 220, 120"],
  },
}

type SubtleShaderProps = React.ComponentProps<"canvas"> & {
  paused?: boolean
  palette?: Palette
}

function SubtleShader({
  paused = false,
  palette = "blue",
  className,
  ...props
}: SubtleShaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef(0)
  const pausedRef = useRef(paused)

  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    if (mq.matches) return

    const startTime = performance.now()

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2)
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      canvas.width = w * dpr * 0.25
      canvas.height = h * dpr * 0.25
    }

    resize()
    window.addEventListener("resize", resize)

    const render = (now: number) => {
      if (pausedRef.current) {
        rafRef.current = requestAnimationFrame(render)
        return
      }

      const w = canvas.width
      const h = canvas.height
      if (w === 0 || h === 0) {
        rafRef.current = requestAnimationFrame(render)
        return
      }

      const t = (now - startTime) * 0.00008

      const isDark = document.documentElement.classList.contains("dark")
      const baseAlpha = isDark ? 0.06 : 0.04
      const colors = isDark ? PALETTES[palette].dark : PALETTES[palette].light

      ctx.clearRect(0, 0, w, h)

      const blobs = [
        {
          x: w * (0.3 + 0.2 * Math.sin(t * 1.1)),
          y: h * (0.3 + 0.2 * Math.cos(t * 0.9)),
          r: Math.max(w, h) * 0.6,
          color: colors[0],
        },
        {
          x: w * (0.7 + 0.15 * Math.cos(t * 0.7)),
          y: h * (0.6 + 0.2 * Math.sin(t * 1.3)),
          r: Math.max(w, h) * 0.5,
          color: colors[1],
        },
        {
          x: w * (0.5 + 0.25 * Math.sin(t * 0.5)),
          y: h * (0.4 + 0.15 * Math.cos(t * 1.1)),
          r: Math.max(w, h) * 0.55,
          color: colors[2],
        },
      ]

      for (const blob of blobs) {
        const gradient = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, blob.r)
        gradient.addColorStop(0, `rgba(${blob.color}, ${baseAlpha})`)
        gradient.addColorStop(1, `rgba(${blob.color}, 0)`)
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, w, h)
      }

      rafRef.current = requestAnimationFrame(render)
    }

    rafRef.current = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener("resize", resize)
    }
  }, [palette])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-slot="subtle-shader"
      className={cn("absolute inset-0 h-full w-full", className)}
      style={{ imageRendering: "auto", filter: "blur(40px)" }}
      {...props}
    />
  )
}

export { SubtleShader }
export type { Palette as SubtleShaderPalette, SubtleShaderProps }
