'use client'
import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useLang } from '@/providers/LanguageProvider'

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, visible: false })
  const navRef = useRef<HTMLDivElement>(null)
  const { theme, setTheme } = useTheme()
  const { locale, t, toggle: toggleLang } = useLang()

  useEffect(() => {
    setMounted(true)
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = ['about', 'skills', 'projects', 'contact']
    const sections = ids.map(id => document.getElementById(id)).filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection('#' + entry.target.id)
        })
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 }
    )

    sections.forEach(s => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
    setActiveSection(href)
  }

  const navLinks = [
    { href: '#about',    label: t.nav.about },
    { href: '#skills',   label: t.nav.skills },
    { href: '#projects', label: t.nav.projects },
    { href: '#contact',  label: t.nav.contact },
  ]

  return (
    <div className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-auto w-full max-w-2xl"
      >
        <div
          ref={navRef}
          onMouseMove={(e) => {
            const rect = navRef.current!.getBoundingClientRect()
            setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true })
          }}
          onMouseLeave={() => setSpotlight(s => ({ ...s, visible: false }))}
          className="relative overflow-hidden flex items-center justify-between px-5 py-3 rounded-2xl border border-[var(--glass-border)] transition-all duration-500"
          style={{
            background: scrolled ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.05)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            boxShadow: scrolled
              ? '0 8px 32px rgba(0,0,0,0.18), 0 1px 0 rgba(255,255,255,0.06) inset, 0 0 0 1px rgba(255,255,255,0.04) inset'
              : '0 4px 24px rgba(0,0,0,0.10), 0 1px 0 rgba(255,255,255,0.06) inset',
          }}
        >
          {/* Spotlight cursor glow */}
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
            style={{
              opacity: spotlight.visible ? 1 : 0,
              background: `radial-gradient(180px circle at ${spotlight.x}px ${spotlight.y}px, rgba(255,255,255,0.07), transparent 70%)`,
            }}
          />
          {/* Logo */}
          <span className="font-mono text-sm font-bold gradient-text tracking-tight">
            ericknvp.dev
          </span>

          {/* Links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link, i) => (
              <motion.li
                key={link.href}
                className="relative"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.5 }}
              >
                {activeSection === link.href && (
                  <motion.div
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-lg"
                    style={{
                      background: 'rgba(var(--accent-rgb),0.13)',
                      boxShadow: '0 0 10px rgba(var(--accent-rgb),0.12)',
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <motion.a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  whileHover={{ y: -2 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  className={`relative z-10 block px-3 py-1.5 text-sm rounded-lg font-medium transition-colors duration-200 ${
                    activeSection === link.href
                      ? 'text-[var(--accent)]'
                      : 'text-muted hover:text-[var(--fg)]'
                  }`}
                  style={
                    activeSection !== link.href
                      ? undefined
                      : { textShadow: '0 0 12px rgba(var(--accent-rgb),0.6)' }
                  }
                >
                  {link.label}
                </motion.a>
              </motion.li>
            ))}
          </ul>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold text-muted hover:text-[var(--fg)] border border-[var(--glass-border)] hover:border-[var(--accent)]/40 transition-all duration-200"
              style={{ background: 'rgba(255,255,255,0.06)' }}
              title="Toggle language"
            >
              <span className="text-sm leading-none">{locale === 'en' ? '🇺🇸' : '🇻🇪'}</span>
              <span>{locale === 'en' ? 'EN' : 'ES'}</span>
            </motion.button>

            {mounted && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const x = rect.left + rect.width / 2
                  const y = rect.top + rect.height / 2
                  document.documentElement.style.setProperty('--theme-x', `${x}px`)
                  document.documentElement.style.setProperty('--theme-y', `${y}px`)
                  const next = theme === 'dark' ? 'light' : 'dark'
                  if (!('startViewTransition' in document)) {
                    setTheme(next)
                    return
                  }
                  ;(document as Document & { startViewTransition: (cb: () => void) => void })
                    .startViewTransition(() => setTheme(next))
                }}
                className="w-9 h-9 flex items-center justify-center rounded-full text-muted hover:text-[var(--fg)] border border-[var(--glass-border)] hover:border-[var(--accent)]/40 transition-all duration-200"
                style={{ background: 'rgba(255,255,255,0.06)' }}
                title="Toggle theme"
              >
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </motion.button>
            )}
          </div>
        </div>
      </motion.nav>
    </div>
  )
}
