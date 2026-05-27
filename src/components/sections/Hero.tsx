'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useLang } from '@/providers/LanguageProvider'

const GITHUB_URL = 'https://github.com/Ericknvp'
const INSTAGRAM_URL = 'https://instagram.com/ericknvp'

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

function ExternalIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className="w-3 h-3 opacity-40 group-hover:opacity-70 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
      <path d="M3.75 2h8.5c.966 0 1.75.784 1.75 1.75v8.5A1.75 1.75 0 0112.25 14h-8.5A1.75 1.75 0 012 12.25v-8.5C2 2.784 2.784 2 3.75 2zm0 1.5a.25.25 0 00-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 00.25-.25v-8.5a.25.25 0 00-.25-.25h-8.5zM10.5 5a.5.5 0 010 1H6.707l4.147 4.146a.5.5 0 01-.708.708L6 6.707V10.5a.5.5 0 01-1 0v-5a.5.5 0 01.5-.5h5z" />
    </svg>
  )
}

export default function Hero() {
  const { t } = useLang()

  return (
    <section className="relative min-h-screen flex items-center px-6">
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* ── Left: text ── */}
        <div className="order-2 md:order-1">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs font-mono mb-5 tracking-[0.3em] uppercase"
            style={{ color: 'var(--accent)' }}
          >
            {t.hero.role}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-none tracking-tight"
          >
            {t.hero.greeting}{' '}
            <span className="gradient-text">Erick</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="text-lg text-muted max-w-md mb-10 leading-relaxed"
          >
            {t.hero.desc}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="#projects"
              onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="glass px-7 py-3 rounded-full text-sm font-medium border border-[var(--glass-border)] hover:border-[var(--accent)]/60 hover:bg-[var(--card-hover)] transition-all duration-300 cursor-pointer"
              style={{ color: 'var(--fg)' }}
            >
              {t.hero.cta_projects}
            </a>

            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }) }}
              className="btn-accent px-7 py-3 rounded-full text-white text-sm font-medium cursor-pointer"
            >
              {t.hero.cta_contact}
            </a>

            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 glass px-7 py-3 rounded-full text-sm font-medium border border-[var(--glass-border)] hover:border-[var(--accent)]/40 hover:bg-[var(--card-hover)] transition-all duration-300 text-muted hover:text-[var(--fg)]"
            >
              <GitHubIcon />
              <span>GitHub</span>
              <ExternalIcon />
            </a>

            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 glass px-7 py-3 rounded-full text-sm font-medium border border-[var(--glass-border)] hover:border-[var(--accent)]/40 hover:bg-[var(--card-hover)] transition-all duration-300 text-muted hover:text-[var(--fg)]"
            >
              <InstagramIcon />
              <span>Instagram</span>
              <ExternalIcon />
            </a>
          </motion.div>
        </div>

        {/* ── Right: avatar ── */}
        <div className="order-1 md:order-2 flex justify-center md:justify-end">
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            {/* Ambient glow */}
            <div
              className="absolute -inset-8 rounded-full blur-3xl pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(var(--accent-rgb),0.35) 0%, rgba(var(--accent-rgb),0.15) 50%, transparent 70%)',
              }}
            />

            {/* Outer decorative ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              className="absolute -inset-3 rounded-full pointer-events-none"
              style={{
                background: 'conic-gradient(from 0deg, transparent 60%, rgba(var(--accent-rgb),0.5) 80%, rgba(var(--accent-rgb),0.6) 90%, transparent 100%)',
                borderRadius: '50%',
              }}
            />

            {/* Glass frame */}
            <div
              className="relative rounded-full overflow-hidden border border-white/10"
              style={{
                width: 320,
                height: 320,
                background: 'rgba(5, 8, 25, 0.75)',
                backdropFilter: 'blur(12px)',
                boxShadow:
                  '0 0 0 1px rgba(var(--accent-rgb),0.2), 0 0 40px rgba(var(--accent-rgb),0.12), 0 24px 60px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.06) inset',
              }}
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-full h-full"
              >
                <Image
                  src="/erickanimado.png"
                  alt="Erick"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </div>

            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 whitespace-nowrap"
              style={{
                background: 'rgba(5, 8, 25, 0.85)',
                backdropFilter: 'blur(16px)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-xs font-mono text-emerald-400 font-medium">Open to Work</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase" style={{ color: 'var(--fg-muted)', opacity: 0.5 }}>
          {t.hero.scroll}
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10"
          style={{ background: 'linear-gradient(to bottom, var(--accent), transparent)', opacity: 0.4 }}
        />
      </motion.div>
    </section>
  )
}
