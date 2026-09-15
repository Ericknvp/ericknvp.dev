'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PaintedPanel from '../ui/PaintedPanel'
import WallTexture from '../ui/WallTexture'
import { useLang } from '@/providers/LanguageProvider'

const inputClass = `
  form-field w-full rounded-lg px-4 py-3 text-sm outline-none
  transition-colors duration-200
`.trim()

const inputStyle: React.CSSProperties = {
  background: 'var(--paper-2)',
  color: 'var(--ink)',
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function Contact() {
  const { t } = useLang()
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } else {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="relative py-28 px-6 pb-36 overflow-hidden" style={{ background: 'var(--blue)' }}>
      <WallTexture stripe="var(--cream)" opacity={0.06} />
      <div className="max-w-xl mx-auto relative">
        <div className="mb-14 text-center relative">
          <div
            className="tag absolute -top-8 right-2 sm:right-8 px-3 py-1.5 font-hand font-bold text-sm rotate-6"
            style={{ background: 'var(--terracotta)', color: 'var(--cream)', borderColor: 'var(--cream)' }}
          >
            {status === 'idle' || status === 'error' ? 'OPEN' : '···'}
          </div>
          <h2 className="font-display mb-4" style={{ color: 'var(--cream)', fontSize: 'clamp(2.25rem, 6vw, 4.5rem)' }}>
            {t.contact.title}
          </h2>
          {t.contact.desc && <p className="text-base leading-relaxed text-cream-soft">{t.contact.desc}</p>}
        </div>

        <PaintedPanel delay={0.1} tilt={-0.5}>
          <AnimatePresence mode="wait" initial={false}>
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                className="py-10 flex flex-col items-center gap-3"
              >
                <p className="font-display text-2xl" style={{ color: 'var(--terracotta-deep)' }}>¡Enviado!</p>
                <p className="text-sm text-ink-soft">Mensaje enviado</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-4 text-xs font-semibold uppercase tracking-wide opacity-50 hover:opacity-100 transition-opacity"
                >
                  Enviar otro
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    type="text" name="name" value={form.name}
                    onChange={handleChange}
                    placeholder={t.contact.name}
                    required
                    className={inputClass}
                    style={inputStyle}
                  />
                  <input
                    type="email" name="email" value={form.email}
                    onChange={handleChange}
                    placeholder={t.contact.email}
                    required
                    className={inputClass}
                    style={inputStyle}
                  />
                </div>
                <input
                  type="text" name="subject" value={form.subject}
                  onChange={handleChange}
                  placeholder={t.contact.subject}
                  required
                  className={inputClass}
                  style={inputStyle}
                />
                <textarea
                  name="message" value={form.message}
                  onChange={handleChange}
                  placeholder={t.contact.message}
                  rows={5}
                  required
                  className={`${inputClass} resize-none font-hand text-base`}
                  style={inputStyle}
                />

                <AnimatePresence>
                  {status === 'error' && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="text-xs text-center"
                      style={{ color: 'var(--terracotta-deep)' }}
                    >
                      Hubo un error al enviar. Intenta de nuevo.
                    </motion.p>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-paint w-full py-3.5 text-sm disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: 'var(--mustard)' }}
                >
                  {status === 'loading' ? 'Enviando...' : t.contact.send}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </PaintedPanel>

        <p className="text-center text-sm mt-10 text-cream-soft">
          {t.contact.or}{' '}
          <a
            href="mailto:narvaezvegaerick@gmail.com"
            className="font-semibold underline decoration-2 underline-offset-4"
            style={{ color: 'var(--mustard)' }}
          >
            narvaezvegaerick@gmail.com
          </a>
        </p>
      </div>
    </section>
  )
}
