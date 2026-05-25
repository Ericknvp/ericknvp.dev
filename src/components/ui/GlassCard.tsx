'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export default function GlassCard({ children, className = '', delay = 0 }: GlassCardProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`glass rounded-2xl p-6 ${className}`}
    >
      {children}
    </motion.div>
  )
}
