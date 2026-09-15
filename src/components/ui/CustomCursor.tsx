'use client'
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'

type Splat = { id: number; x: number; y: number; color: string }

const SPLAT_COLORS = ['var(--terracotta)', 'var(--mustard)', 'var(--blue)']

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [visible, setVisible] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [pressed, setPressed] = useState(false)
  const [splats, setSplats] = useState<Splat[]>([])

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  // Dot: snappy, near-instant. Halo: loose spring, trails behind like wet paint.
  const dotX = useSpring(x, { damping: 30, stiffness: 900, mass: 0.4 })
  const dotY = useSpring(y, { damping: 30, stiffness: 900, mass: 0.4 })
  const haloX = useSpring(x, { damping: 20, stiffness: 150, mass: 0.7 })
  const haloY = useSpring(y, { damping: 20, stiffness: 150, mass: 0.7 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduce) return

    setEnabled(true)
    document.body.classList.add('custom-cursor-active')

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
      const target = e.target as HTMLElement
      setHovering(!!target.closest('a, button, [role="button"], input, textarea, [data-cursor-hover]'))
    }
    const leave = () => setVisible(false)
    const down = (e: MouseEvent) => {
      setPressed(true)
      const id = Date.now() + Math.random()
      const color = SPLAT_COLORS[Math.floor(Math.random() * SPLAT_COLORS.length)]
      setSplats(prev => [...prev.slice(-5), { id, x: e.clientX, y: e.clientY, color }])
      window.setTimeout(() => {
        setSplats(prev => prev.filter(s => s.id !== id))
      }, 650)
    }
    const up = () => setPressed(false)

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', leave)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', leave)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
      document.body.classList.remove('custom-cursor-active')
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      {/* Halo — a soft wet-paint blob that trails loosely behind the pointer */}
      <motion.div
        className="fixed top-0 left-0 z-[997] pointer-events-none rounded-full"
        style={{
          x: haloX, y: haloY,
          opacity: visible ? (hovering ? 0.5 : 0.28) : 0,
          background: hovering ? 'var(--mustard)' : 'var(--terracotta)',
          filter: 'blur(10px)',
          mixBlendMode: 'multiply',
        }}
        animate={{
          width: hovering ? 76 : 44,
          height: hovering ? 76 : 44,
          marginLeft: hovering ? -38 : -22,
          marginTop: hovering ? -38 : -22,
          scale: pressed ? 0.7 : 1,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 22 }}
      />

      {/* Ring — a crisp outline tracking a beat behind the dot */}
      <motion.div
        className="fixed top-0 left-0 z-[998] pointer-events-none rounded-full"
        style={{ x: haloX, y: haloY, opacity: visible ? 1 : 0, borderStyle: 'solid' }}
        animate={{
          width: hovering ? 40 : 26,
          height: hovering ? 40 : 26,
          marginLeft: hovering ? -20 : -13,
          marginTop: hovering ? -20 : -13,
          borderWidth: hovering ? 2 : 1.5,
          borderColor: hovering ? 'var(--mustard)' : 'var(--terracotta)',
          rotate: hovering ? 45 : 0,
          scale: pressed ? 0.8 : 1,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      />

      {/* Dot — snaps to the true pointer position */}
      <motion.div
        className="fixed top-0 left-0 z-[999] pointer-events-none rounded-full"
        style={{
          x: dotX, y: dotY,
          width: 7, height: 7, marginLeft: -3.5, marginTop: -3.5,
          background: 'var(--ink)',
          opacity: visible ? (hovering ? 0 : 1) : 0,
        }}
        animate={{ scale: pressed ? 0.5 : 1 }}
        transition={{ duration: 0.15 }}
      />

      {/* Click splats — quick ink-drop bursts, painted-sign signature */}
      <AnimatePresence>
        {splats.map(s => (
          <motion.div
            key={s.id}
            className="fixed top-0 left-0 z-[996] pointer-events-none rounded-full"
            style={{
              left: s.x, top: s.y,
              background: s.color,
              width: 10, height: 10, marginLeft: -5, marginTop: -5,
            }}
            initial={{ opacity: 0.55, scale: 0.3 }}
            animate={{ opacity: 0, scale: 5.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </AnimatePresence>
    </>
  )
}
