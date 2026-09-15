'use client'
import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLang } from '@/providers/LanguageProvider'
import AsciiReveal from '../ui/AsciiReveal'
import Magnetic from '../ui/Magnetic'

const GITHUB_URL = 'https://github.com/Ericknvp'

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 shrink-0">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

const AVATAR_SIZE = 320

export default function Hero() {
  const { t } = useLang()
  const [avatarActive, setAvatarActive] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const textureY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 60])
  const windowY = useTransform(scrollYProgress, [0, 1], [0, -100])

  // No mouse on touch devices to trigger the ASCII reveal, so pulse it
  // on a slow frequency instead — it's a signature interaction, it should be seen.
  useEffect(() => {
    const noHover = window.matchMedia('(hover: none)').matches
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!noHover || reduceMotion) return

    let showTimer: ReturnType<typeof setTimeout>
    let hideTimer: ReturnType<typeof setTimeout>
    let cancelled = false

    const cycle = () => {
      showTimer = setTimeout(() => {
        if (cancelled) return
        setAvatarActive(true)
        hideTimer = setTimeout(() => {
          if (cancelled) return
          setAvatarActive(false)
          cycle()
        }, 2200)
      }, 4500)
    }
    cycle()

    return () => {
      cancelled = true
      clearTimeout(showTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center px-6 pt-28 pb-16 overflow-hidden"
      style={{ background: 'var(--blue)' }}
    >
      {/* Painted wall texture: a couple of quiet whitewash streaks — drifts slower than the content */}
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          y: textureY,
          background:
            'repeating-linear-gradient(100deg, var(--cream) 0 2px, transparent 2px 140px)',
        }}
      />

      <motion.div style={{ y: contentY }} className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative">

        {/* ── Left: the sign ── */}
        <div className="order-2 md:order-1">
          <motion.div
            initial={{ opacity: 0, y: -12, rotate: -6 }}
            animate={{ opacity: 1, y: 0, rotate: -3 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="tag font-hand font-bold text-sm px-4 py-1.5 mb-6"
          >
            {t.hero.role}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-display leading-[0.95] mb-6"
            style={{ color: 'var(--cream)', fontSize: 'clamp(2.75rem, 8vw, 6rem)' }}
          >
            {t.hero.greeting}
            <br />
            <span style={{ color: 'var(--mustard)' }}>Erick</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="text-lg max-w-md mb-10 leading-relaxed text-cream-soft"
          >
            {t.hero.desc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="flex flex-wrap gap-4"
          >
            <Magnetic>
              <a
                href="#contact"
                onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="btn-paint px-7 py-3 text-sm"
                style={{ background: 'var(--mustard)' }}
              >
                {t.hero.cta_contact}
              </a>
            </Magnetic>

            <Magnetic>
              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}
                className="btn-paint px-7 py-3 text-sm"
                style={{ background: 'var(--paper)' }}
              >
                {t.hero.cta_projects}
              </a>
            </Magnetic>

            <Magnetic>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-paint px-6 py-3 text-sm"
                style={{ background: 'var(--terracotta)', color: 'var(--cream)' }}
              >
                <GitHubIcon />
                <span>GitHub</span>
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* ── Right: the shop window ── */}
        <div className="order-1 md:order-2 flex justify-center md:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.88, rotate: 3 }}
            animate={{ opacity: 1, scale: 1, rotate: 1.5 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ y: windowY }}
            className="relative"
          >
            <div
              className="relative overflow-hidden group focus-within:outline-4 w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] md:w-[320px] md:h-[320px]"
              style={{
                borderRadius: 28,
                border: '10px solid var(--paper)',
                boxShadow: '0 0 0 4px var(--ink), 0 24px 50px -10px rgba(var(--shadow-c), 0.55)',
                background: 'var(--ink)',
              }}
              tabIndex={0}
              onMouseEnter={() => setAvatarActive(true)}
              onMouseLeave={() => setAvatarActive(false)}
              onFocus={() => setAvatarActive(true)}
              onBlur={() => setAvatarActive(false)}
              role="button"
              aria-label="Erick — technical preview"
            >
              <Image
                src="/avatar-erick.png"
                alt="Erick"
                fill
                sizes="(max-width: 640px) 220px, (max-width: 768px) 280px, 320px"
                className="object-cover"
                priority
              />
              <AsciiReveal
                src="/avatar-erick.png"
                width={AVATAR_SIZE}
                height={AVATAR_SIZE}
                active={avatarActive}
              />
            </div>

            {/* Hanging "open to work" tag — swings from the pin like it just dropped onto it */}
            <motion.div
              initial={{ opacity: 0, y: -18, rotate: -24 }}
              animate={{ opacity: 1, y: 0, rotate: 6 }}
              transition={{
                opacity: { duration: 0.25, delay: 1 },
                default: { type: 'spring', stiffness: 140, damping: 7, delay: 1 },
              }}
              style={{ transformOrigin: 'top center' }}
              className="tag absolute -bottom-3 -left-3 sm:-bottom-5 sm:-left-6 px-4 py-2 font-hand font-bold text-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: 'var(--terracotta)' }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: 'var(--terracotta)' }} />
              </span>
              {t.about.facts.Available}
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Awning stripe — the seam into the next signboard */}
      <div className="awning absolute bottom-0 left-0 right-0 h-3" style={{ ['--stripe-a' as string]: 'var(--cream)', ['--stripe-b' as string]: 'var(--mustard)' }} />
    </section>
  )
}
