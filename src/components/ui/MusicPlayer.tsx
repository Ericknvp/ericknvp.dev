'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      setVisible(true)
      audioRef.current?.play().then(() => setPlaying(true)).catch(() => {})
    }, 400)
    return () => clearTimeout(t)
  }, [])

  const toggle = () => {
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      audio.play()
      setPlaying(true)
    }
  }

  return (
    <>
      <audio ref={audioRef} src="/music/song.mp3" loop />

      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 left-6 z-50 rounded-2xl overflow-hidden"
            style={{
              minWidth: 260,
              border: playing
                ? '1px solid rgba(var(--accent-rgb),0.4)'
                : '1px solid var(--glass-border)',
              background: 'color-mix(in srgb, var(--bg) 88%, transparent)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              boxShadow: playing
                ? '0 0 0 1px rgba(var(--accent-rgb),0.15), 0 0 32px rgba(var(--accent-rgb),0.15), 0 16px 40px rgba(0,0,0,0.2)'
                : '0 8px 32px rgba(0,0,0,0.15)',
              transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
            }}
          >
            {/* Blurred cover background */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <Image src="/music/cover.jpg" alt="" fill className="object-cover" style={{ filter: 'blur(20px) saturate(1.5)' }} />
            </div>

            <div className="relative flex items-center gap-3 px-4 py-3.5">
              {/* Now playing label */}
              <div className="absolute top-2 right-10 flex items-center gap-1">
                {playing && (
                  <motion.div
                    className="flex items-end gap-[2px]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {[1, 1.6, 0.8, 1.4].map((h, i) => (
                      <motion.span
                        key={i}
                        className="block w-[3px] rounded-full"
                        style={{ background: 'var(--accent)' }}
                        animate={{ scaleY: [h, h * 0.4, h] }}
                        transition={{ duration: 0.6 + i * 0.1, repeat: Infinity, ease: 'easeInOut', delay: i * 0.12 }}
                      />
                    ))}
                  </motion.div>
                )}
              </div>

              {/* Spinning disc */}
              <div className="relative shrink-0" style={{ width: 52, height: 52 }}>
                {/* Glow behind disc */}
                {playing && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ background: 'radial-gradient(circle, rgba(var(--accent-rgb),0.5), transparent 70%)', filter: 'blur(6px)' }}
                  />
                )}
                <motion.div
                  animate={{ rotate: playing ? 360 : 0 }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'linear', repeatType: 'loop' }}
                  className="relative"
                  style={{ width: 52, height: 52, borderRadius: '50%', overflow: 'hidden' }}
                >
                  <Image
                    src="/music/cover.jpg"
                    alt="cover"
                    fill
                    className="object-cover"
                    style={{ filter: playing ? 'brightness(0.75)' : 'brightness(0.4)' }}
                  />
                  {/* Vinyl grooves overlay */}
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{
                      background: `
                        radial-gradient(circle, transparent 22%, rgba(0,0,0,0.25) 23%, transparent 24%),
                        radial-gradient(circle, transparent 33%, rgba(0,0,0,0.2) 34%, transparent 35%),
                        radial-gradient(circle, transparent 44%, rgba(0,0,0,0.15) 45%, transparent 46%)
                      `,
                    }}
                  />
                  {/* Shine */}
                  <div
                    className="absolute inset-0 rounded-full pointer-events-none"
                    style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 50%)' }}
                  />
                </motion.div>
                {/* Center hole */}
                <div
                  className="absolute inset-0 m-auto rounded-full"
                  style={{ width: 10, height: 10, background: 'var(--bg)', border: '1.5px solid var(--glass-border)', zIndex: 2 }}
                />
              </div>

              {/* Info */}
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-[11px] font-mono tracking-widest uppercase mb-0.5" style={{ color: 'var(--accent)', opacity: 0.7 }}>
                  {playing ? 'Now Playing' : 'Paused'}
                </span>
                <span className="text-sm font-semibold truncate" style={{ color: 'var(--fg)' }}>
                  Passionfruit
                </span>
                <span className="text-xs truncate" style={{ color: 'var(--muted)' }}>
                  Drake
                </span>
              </div>

              {/* Play/Pause */}
              <button
                onClick={toggle}
                className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110 active:scale-95"
                style={{
                  background: playing ? 'rgba(var(--accent-rgb),0.25)' : 'rgba(var(--accent-rgb),0.12)',
                  border: '1px solid rgba(var(--accent-rgb),0.4)',
                  color: 'var(--accent)',
                  boxShadow: playing ? '0 0 12px rgba(var(--accent-rgb),0.3)' : 'none',
                }}
              >
                {playing ? (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <rect x="6" y="5" width="4" height="14" rx="1" />
                    <rect x="14" y="5" width="4" height="14" rx="1" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" style={{ marginLeft: 1 }}>
                    <path d="M8 5.14v13.72a1 1 0 001.5.86l11-6.86a1 1 0 000-1.72l-11-6.86A1 1 0 008 5.14z" />
                  </svg>
                )}
              </button>

              {/* Close */}
              <button
                onClick={() => {
                  audioRef.current?.pause()
                  setPlaying(false)
                  setVisible(false)
                }}
                className="shrink-0 w-5 h-5 flex items-center justify-center rounded-full transition-colors duration-200"
                style={{ color: 'rgba(255,255,255,0.25)' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.25)')}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3 h-3">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
