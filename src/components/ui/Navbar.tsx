'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '@/providers/LanguageProvider'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)
  const { locale, t, toggle: toggleLang } = useLang()

  useEffect(() => {
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
    setMobileOpen(false)
  }

  const navLinks = [
    { href: '#about',    label: t.nav.about },
    { href: '#projects', label: t.nav.projects },
    { href: '#skills',   label: t.nav.skills },
    { href: '#contact',  label: t.nav.contact },
  ]

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pt-3">
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-4xl"
      >
        <div
          className="relative flex items-center justify-between gap-3 px-4 sm:px-5 py-2.5 rounded-2xl"
          style={{
            background: 'var(--ink)',
            border: '3px solid var(--ink)',
            boxShadow: scrolled
              ? '0 14px 30px -8px rgba(var(--shadow-c), 0.55)'
              : '0 8px 20px -8px rgba(var(--shadow-c), 0.4)',
            transition: 'box-shadow 0.4s ease',
          }}
        >
          {/* Logo — painted board */}
          <span className="font-display text-lg sm:text-xl tracking-wide shrink-0" style={{ color: 'var(--mustard)' }}>
            ericknvp<span style={{ color: 'var(--cream)' }}>.dev</span>
          </span>

          {/* Links */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link, i) => (
              <motion.li
                key={link.href}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.4 }}
                className="relative"
              >
                {activeSection === link.href && (
                  <motion.div
                    layoutId="nav-active-pill"
                    className="absolute inset-0 rounded-lg"
                    style={{ background: 'rgba(217, 154, 34, 0.16)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <a
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative block px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors duration-200"
                  style={{
                    color: activeSection === link.href ? 'var(--mustard)' : 'var(--cream-soft)',
                  }}
                >
                  {link.label}
                </a>
              </motion.li>
            ))}
          </ul>

          {/* Shelf switches: language + theme */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={toggleLang}
              className="px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide"
              style={{ background: 'var(--mustard)', color: 'var(--ink)', border: '2px solid var(--cream)' }}
              title="Toggle language"
            >
              {locale === 'en' ? 'EN' : 'ES'}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-[5px] shrink-0"
              aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={mobileOpen}
            >
              <motion.span
                animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 6 : 0 }}
                className="block w-5 h-[2px] rounded-full"
                style={{ background: 'var(--cream)' }}
              />
              <motion.span
                animate={{ opacity: mobileOpen ? 0 : 1 }}
                className="block w-5 h-[2px] rounded-full"
                style={{ background: 'var(--cream)' }}
              />
              <motion.span
                animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -6 : 0 }}
                className="block w-5 h-[2px] rounded-full"
                style={{ background: 'var(--cream)' }}
              />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="md:hidden overflow-hidden mt-2 rounded-2xl"
              style={{ background: 'var(--ink)' }}
            >
              <ul className="flex flex-col p-2">
                {navLinks.map(link => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="block px-4 py-3 text-sm font-semibold rounded-lg"
                      style={{
                        color: activeSection === link.href ? 'var(--mustard)' : 'var(--cream-soft)',
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </div>
  )
}
