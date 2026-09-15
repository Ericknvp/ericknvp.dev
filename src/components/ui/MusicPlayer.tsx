'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => {
      setReady(true)
      audioRef.current?.play().then(() => setPlaying(true)).catch(() => {})
    }, 500)
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
        {ready && (
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3"
          >
            {/* Expanded card — track info + controls */}
            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, y: 14, scale: 0.92, rotate: 2 }}
                  animate={{ opacity: 1, y: 0, scale: 1, rotate: -1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="panel overflow-visible"
                  style={{ minWidth: 220, background: 'var(--terracotta)' }}
                >
                  <div className="flex items-center gap-3 px-4 py-3.5">
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="font-hand text-xs" style={{ color: 'var(--cream-soft)' }}>
                        {playing ? 'sonando ahora' : 'en pausa'}
                      </span>
                      <span className="text-sm font-bold truncate" style={{ color: 'var(--cream)' }}>
                        Passionfruit
                      </span>
                      <span className="text-xs truncate" style={{ color: 'var(--cream-soft)' }}>
                        Drake
                      </span>
                    </div>

                    {playing && (
                      <div className="flex items-end gap-[2px] h-4 shrink-0">
                        {[1, 1.6, 0.8].map((h, i) => (
                          <motion.span
                            key={i}
                            className="block w-[3px] rounded-full"
                            style={{ background: 'var(--cream)' }}
                            animate={{ scaleY: [h, h * 0.4, h] }}
                            transition={{ duration: 0.6 + i * 0.1, repeat: Infinity, ease: 'easeInOut', delay: i * 0.12 }}
                          />
                        ))}
                      </div>
                    )}

                    <button
                      onClick={toggle}
                      className="shrink-0 w-9 h-9 flex items-center justify-center rounded-full transition-transform duration-200 hover:scale-110 active:scale-95"
                      style={{ background: 'var(--paper)', border: '2px solid var(--ink)', color: 'var(--ink)' }}
                      aria-label={playing ? 'Pausar' : 'Reproducir'}
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
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* The vinyl — always on screen, always turning */}
            <motion.button
              onClick={() => setExpanded(v => !v)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.94 }}
              className="relative shrink-0 rounded-full flex items-center justify-center"
              style={{
                width: 60, height: 60,
                boxShadow: '0 14px 28px -8px rgba(var(--shadow-c), 0.55), 0 0 0 4px var(--paper)',
              }}
              aria-label={expanded ? 'Minimizar reproductor' : 'Abrir reproductor'}
              aria-pressed={expanded}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: playing ? 3.2 : 16, repeat: Infinity, ease: 'linear' }}
                className="relative rounded-full overflow-hidden"
                style={{ width: 60, height: 60, border: '3px solid var(--ink)', background: 'var(--ink)' }}
              >
                <Image src="/music/cover.jpg" alt="" fill className="object-cover opacity-80" />
                {/* Vinyl grooves */}
                <div className="absolute inset-[6px] rounded-full" style={{ border: '1px solid rgba(251,243,223,0.35)' }} />
                <div className="absolute inset-[13px] rounded-full" style={{ border: '1px solid rgba(251,243,223,0.25)' }} />
                {/* Label hole */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full" style={{ width: 16, height: 16, background: 'var(--cream)', border: '2px solid var(--ink)' }} />
                  <div className="absolute rounded-full" style={{ width: 4, height: 4, background: 'var(--ink)' }} />
                </div>
              </motion.div>

              {playing && (
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: 'var(--terracotta)' }} />
                  <span className="relative inline-flex rounded-full h-3 w-3" style={{ background: 'var(--terracotta)', border: '2px solid var(--paper)' }} />
                </span>
              )}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
