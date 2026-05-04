"use client"

import type * as React from "react"
import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "../lib/utils"

// Adapted from prompt-kit's ResponseStream — token-by-token typewriter or
// word-by-word fade reveal for streaming AI output. Pass a string (replays at
// `speed`) or an `AsyncIterable<string>` (reveals chunks as they arrive).

export type ResponseStreamMode = "typewriter" | "fade"

export type UseTextStreamOptions = {
  textStream: string | AsyncIterable<string>
  speed?: number
  mode?: ResponseStreamMode
  onComplete?: () => void
  fadeDuration?: number
  segmentDelay?: number
  characterChunkSize?: number
  onError?: (error: unknown) => void
}

export type UseTextStreamResult = {
  displayedText: string
  isComplete: boolean
  segments: { text: string; index: number }[]
  getFadeDuration: () => number
  getSegmentDelay: () => number
  reset: () => void
  startStreaming: () => void
  pause: () => void
  resume: () => void
}

function useTextStream({
  textStream,
  speed = 20,
  mode = "typewriter",
  onComplete,
  fadeDuration,
  segmentDelay,
  characterChunkSize,
  onError,
}: UseTextStreamOptions): UseTextStreamResult {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)
  const [segments, setSegments] = useState<{ text: string; index: number }[]>([])

  const speedRef = useRef(speed)
  const modeRef = useRef(mode)
  const currentIndexRef = useRef(0)
  const animationRef = useRef<number | null>(null)
  const fadeDurationRef = useRef(fadeDuration)
  const segmentDelayRef = useRef(segmentDelay)
  const characterChunkSizeRef = useRef(characterChunkSize)
  const streamRef = useRef<AbortController | null>(null)
  const completedRef = useRef(false)
  const onCompleteRef = useRef(onComplete)
  const onErrorRef = useRef(onError)

  useEffect(() => {
    speedRef.current = speed
    modeRef.current = mode
    fadeDurationRef.current = fadeDuration
    segmentDelayRef.current = segmentDelay
    characterChunkSizeRef.current = characterChunkSize
  }, [speed, mode, fadeDuration, segmentDelay, characterChunkSize])

  useEffect(() => {
    onCompleteRef.current = onComplete
    onErrorRef.current = onError
  }, [onComplete, onError])

  const getChunkSize = useCallback(() => {
    if (typeof characterChunkSizeRef.current === "number") {
      return Math.max(1, characterChunkSizeRef.current)
    }
    const normalized = Math.min(100, Math.max(1, speedRef.current))
    if (modeRef.current === "typewriter") {
      if (normalized < 25) return 1
      return Math.max(1, Math.round((normalized - 25) / 10))
    }
    return 1
  }, [])

  const getProcessingDelay = useCallback(() => {
    if (typeof segmentDelayRef.current === "number") {
      return Math.max(0, segmentDelayRef.current)
    }
    const normalized = Math.min(100, Math.max(1, speedRef.current))
    return Math.max(1, Math.round(100 / Math.sqrt(normalized)))
  }, [])

  const getFadeDuration = useCallback(() => {
    if (typeof fadeDurationRef.current === "number") {
      return Math.max(10, fadeDurationRef.current)
    }
    const normalized = Math.min(100, Math.max(1, speedRef.current))
    return Math.round(1000 / Math.sqrt(normalized))
  }, [])

  const getSegmentDelay = useCallback(() => {
    if (typeof segmentDelayRef.current === "number") {
      return Math.max(0, segmentDelayRef.current)
    }
    const normalized = Math.min(100, Math.max(1, speedRef.current))
    return Math.max(1, Math.round(100 / Math.sqrt(normalized)))
  }, [])

  const updateSegments = useCallback((text: string) => {
    if (modeRef.current !== "fade") return
    try {
      const segmenter = new Intl.Segmenter(navigator.language, { granularity: "word" })
      const segmentIterator = segmenter.segment(text)
      const next = Array.from(segmentIterator).map((segment, index) => ({
        text: segment.segment,
        index,
      }))
      setSegments(next)
    } catch (error) {
      const next = text
        .split(/(\s+)/)
        .filter(Boolean)
        .map((word, index) => ({ text: word, index }))
      setSegments(next)
      onErrorRef.current?.(error)
    }
  }, [])

  const markComplete = useCallback(() => {
    if (!completedRef.current) {
      completedRef.current = true
      setIsComplete(true)
      onCompleteRef.current?.()
    }
  }, [])

  const reset = useCallback(() => {
    currentIndexRef.current = 0
    setDisplayedText("")
    setSegments([])
    setIsComplete(false)
    completedRef.current = false
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
  }, [])

  const processStringTypewriter = useCallback(
    (text: string) => {
      let lastFrameTime = 0
      const stream = (timestamp: number) => {
        const delay = getProcessingDelay()
        if (delay > 0 && timestamp - lastFrameTime < delay) {
          animationRef.current = requestAnimationFrame(stream)
          return
        }
        lastFrameTime = timestamp

        if (currentIndexRef.current >= text.length) {
          markComplete()
          return
        }
        const chunkSize = getChunkSize()
        const endIndex = Math.min(currentIndexRef.current + chunkSize, text.length)
        const next = text.slice(0, endIndex)
        setDisplayedText(next)
        if (modeRef.current === "fade") updateSegments(next)
        currentIndexRef.current = endIndex
        if (endIndex < text.length) {
          animationRef.current = requestAnimationFrame(stream)
        } else {
          markComplete()
        }
      }
      animationRef.current = requestAnimationFrame(stream)
    },
    [getProcessingDelay, getChunkSize, updateSegments, markComplete],
  )

  const processAsyncIterable = useCallback(
    async (stream: AsyncIterable<string>) => {
      const controller = new AbortController()
      streamRef.current = controller
      let displayed = ""
      try {
        for await (const chunk of stream) {
          if (controller.signal.aborted) return
          displayed += chunk
          setDisplayedText(displayed)
          updateSegments(displayed)
        }
        markComplete()
      } catch (error) {
        markComplete()
        onErrorRef.current?.(error)
      }
    },
    [updateSegments, markComplete],
  )

  const startStreaming = useCallback(() => {
    reset()
    if (typeof textStream === "string") {
      processStringTypewriter(textStream)
    } else if (textStream) {
      processAsyncIterable(textStream)
    }
  }, [textStream, reset, processStringTypewriter, processAsyncIterable])

  const pause = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = null
    }
  }, [])

  const resume = useCallback(() => {
    if (typeof textStream === "string" && !isComplete) {
      processStringTypewriter(textStream)
    }
  }, [textStream, isComplete, processStringTypewriter])

  useEffect(() => {
    startStreaming()
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      if (streamRef.current) streamRef.current.abort()
    }
  }, [textStream, startStreaming])

  return {
    displayedText,
    isComplete,
    segments,
    getFadeDuration,
    getSegmentDelay,
    reset,
    startStreaming,
    pause,
    resume,
  }
}

export type ResponseStreamProps = {
  textStream: string | AsyncIterable<string>
  mode?: ResponseStreamMode
  /** 1–100 (1 slowest, 100 fastest). Defaults to 20. */
  speed?: number
  className?: string
  onComplete?: () => void
  /** Container element. Defaults to "div". */
  as?: keyof React.JSX.IntrinsicElements
  /** Override fade duration (ms) — bypasses `speed`. */
  fadeDuration?: number
  /** Override delay between segments (ms) — bypasses `speed`. */
  segmentDelay?: number
  /** Override characters per frame in typewriter mode — bypasses `speed`. */
  characterChunkSize?: number
}

function ResponseStream({
  textStream,
  mode = "typewriter",
  speed = 20,
  className,
  onComplete,
  as = "div",
  fadeDuration,
  segmentDelay,
  characterChunkSize,
}: ResponseStreamProps) {
  const animationEndRef = useRef<(() => void) | null>(null)
  const { displayedText, isComplete, segments, getFadeDuration, getSegmentDelay } = useTextStream({
    textStream,
    speed,
    mode,
    onComplete,
    fadeDuration,
    segmentDelay,
    characterChunkSize,
  })

  useEffect(() => {
    animationEndRef.current = onComplete ?? null
  }, [onComplete])

  const handleLastSegmentAnimationEnd = useCallback(() => {
    if (animationEndRef.current && isComplete) animationEndRef.current()
  }, [isComplete])

  const fadeStyle = `
    @keyframes response-stream-fade-in { from { opacity: 0 } to { opacity: 1 } }
    .response-stream-fade-segment {
      display: inline-block;
      opacity: 0;
      animation: response-stream-fade-in ${getFadeDuration()}ms ease-out forwards;
    }
    .response-stream-fade-space { white-space: pre }
  `

  const Container = as as keyof React.JSX.IntrinsicElements

  return (
    <Container data-slot="response-stream" data-mode={mode} className={cn(className)}>
      {mode === "typewriter" ? (
        displayedText
      ) : (
        <>
          <style>{fadeStyle}</style>
          <span className="relative">
            {segments.map((segment, idx) => {
              const isWhitespace = /^\s+$/.test(segment.text)
              const isLast = idx === segments.length - 1
              return (
                <span
                  key={`${segment.index}-${segment.text}`}
                  className={cn(
                    "response-stream-fade-segment",
                    isWhitespace && "response-stream-fade-space",
                  )}
                  style={{ animationDelay: `${idx * getSegmentDelay()}ms` }}
                  onAnimationEnd={isLast ? handleLastSegmentAnimationEnd : undefined}
                >
                  {segment.text}
                </span>
              )
            })}
          </span>
        </>
      )}
    </Container>
  )
}

export { ResponseStream, useTextStream }
