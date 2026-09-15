'use client'
import { useRef } from 'react'
import { useScroll, useTransform } from 'framer-motion'

// Classic scroll parallax: as the element travels through the viewport,
// its y offset eases from +distance to -distance.
export function useParallax<T extends HTMLElement = HTMLDivElement>(distance = 60) {
  const ref = useRef<T>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance])
  return { ref, y, scrollYProgress }
}
