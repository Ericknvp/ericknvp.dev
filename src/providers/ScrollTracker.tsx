'use client'
import { useEffect, useRef } from 'react'
import { scrollStore } from '@/lib/scrollStore'

export default function ScrollTracker() {
  const lastProgress = useRef(0)

  useEffect(() => {
    let rafId: number

    const update = () => {
      const el = document.documentElement
      const progress = el.scrollTop / (el.scrollHeight - el.clientHeight || 1)
      scrollStore.velocity = Math.abs(progress - lastProgress.current) * 60
      scrollStore.progress = progress
      lastProgress.current = progress
      rafId = requestAnimationFrame(update)
    }

    rafId = requestAnimationFrame(update)
    return () => cancelAnimationFrame(rafId)
  }, [])

  return null
}
