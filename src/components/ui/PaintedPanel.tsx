'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface PaintedPanelProps {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  delay?: number
  tilt?: number
}

export default function PaintedPanel({ children, className = '', style, delay = 0, tilt = -0.6 }: PaintedPanelProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, rotate: tilt * 2 }}
      animate={isInView ? { opacity: 1, y: 0, rotate: tilt } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`panel p-6 ${className}`}
      style={style}
    >
      {children}
    </motion.div>
  )
}
