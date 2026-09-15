'use client'
import { useEffect, useRef } from 'react'

const RAMP = ' .:-=+*#%@'

interface AsciiRevealProps {
  src: string
  width: number
  height: number
  active: boolean
  cell?: number
}

/**
 * Signature interaction: while `active`, resamples the portrait into a live
 * monospace glyph-density render — a technical wink inside the painted-sign
 * world, in the spirit of the terminal/glyph direction it was raised from.
 */
export default function AsciiReveal({ src, width, height, active, cell = 9 }: AsciiRevealProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const sampleRef = useRef<HTMLCanvasElement | null>(null)
  const imgRef = useRef<HTMLImageElement | null>(null)
  const rafRef = useRef<number | null>(null)

  const cols = Math.max(1, Math.floor(width / cell))
  const rows = Math.max(1, Math.floor(height / cell))

  useEffect(() => {
    const img = new window.Image()
    img.src = src
    img.onload = () => { imgRef.current = img }
    sampleRef.current = document.createElement('canvas')
    sampleRef.current.width = cols
    sampleRef.current.height = rows
  }, [src, cols, rows])

  useEffect(() => {
    const canvas = canvasRef.current
    const sample = sampleRef.current
    if (!active || !canvas || !sample) return

    const ctx = canvas.getContext('2d')
    const sctx = sample.getContext('2d', { willReadFrequently: true })
    if (!ctx || !sctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame = 0

    function draw() {
      const img = imgRef.current
      if (!img) { rafRef.current = requestAnimationFrame(draw); return }
      sctx!.drawImage(img, 0, 0, cols, rows)
      const data = sctx!.getImageData(0, 0, cols, rows).data
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)
      ctx!.fillStyle = 'rgba(21, 15, 6, 0.9)'
      ctx!.fillRect(0, 0, canvas!.width, canvas!.height)
      ctx!.font = `${cell}px "Courier New", monospace`
      ctx!.textBaseline = 'top'
      ctx!.fillStyle = '#fbf3df'
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const i = (y * cols + x) * 4
          const lumBase = (0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2]) / 255
          const flicker = reduceMotion ? 0 : Math.sin(frame * 0.1 + x * 0.5 + y * 0.35) * 0.04
          const lum = Math.min(1, Math.max(0, lumBase + flicker))
          const ch = RAMP[Math.floor(lum * (RAMP.length - 1))]
          if (ch !== ' ') ctx!.fillText(ch, x * cell, y * cell)
        }
      }
      frame++
      if (!reduceMotion) rafRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [active, cols, rows, cell])

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none transition-opacity duration-300"
      style={{ opacity: active ? 1 : 0 }}
    />
  )
}
