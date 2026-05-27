'use client'
import { useState } from 'react'
import GlassCard from '../ui/GlassCard'
import { useLang } from '@/providers/LanguageProvider'

const inputClass = `
  w-full rounded-xl px-4 py-3 text-sm
  transition-all duration-200 outline-none
  bg-[var(--glass-bg)] border border-[var(--glass-border)]
  text-[var(--fg)] placeholder:text-[var(--fg-muted)]
  focus:border-[var(--accent)]/50
`.trim()

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
    <section id="contact" className="py-32 px-6 pb-40">
      <div className="max-w-xl mx-auto">
        <div className="mb-16 text-center">
          <p className="text-xs font-mono tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--accent)' }}>
            {t.contact.label}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">{t.contact.title}</h2>
          {t.contact.desc && <p className="text-muted text-base leading-relaxed">{t.contact.desc}</p>}
        </div>

        <GlassCard delay={0.1}>
          {status === 'success' ? (
            <div className="py-10 flex flex-col items-center gap-3">
              <div
                className="w-10 h-px"
                style={{ backgroundColor: 'var(--accent)' }}
              />
              <p className="text-base font-semibold tracking-wide">Mensaje enviado</p>
<button
                onClick={() => setStatus('idle')}
                className="mt-4 text-xs font-mono tracking-widest uppercase opacity-40 hover:opacity-100 transition-opacity"
              >
                Enviar otro
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text" name="name" value={form.name}
                  onChange={handleChange}
                  placeholder={t.contact.name}
                  required
                  className={inputClass}
                />
                <input
                  type="email" name="email" value={form.email}
                  onChange={handleChange}
                  placeholder={t.contact.email}
                  required
                  className={inputClass}
                />
              </div>
              <input
                type="text" name="subject" value={form.subject}
                onChange={handleChange}
                placeholder={t.contact.subject}
                required
                className={inputClass}
              />
              <textarea
                name="message" value={form.message}
                onChange={handleChange}
                placeholder={t.contact.message}
                rows={5}
                required
                className={`${inputClass} resize-none`}
              />

              {status === 'error' && (
                <p className="text-xs text-red-400 text-center">
                  Hubo un error al enviar. Intenta de nuevo.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="btn-accent w-full py-3.5 rounded-xl text-sm font-medium text-white disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Enviando...' : t.contact.send}
              </button>
            </form>
          )}
        </GlassCard>

        <p className="text-center text-xs font-mono mt-10 text-muted opacity-60">
          {t.contact.or}{' '}
          <a
            href="mailto:narvaezvegaerick@gmail.com"
            className="hover:text-[var(--accent)] transition-colors"
            style={{ color: 'var(--accent)', opacity: 0.8 }}
          >
            narvaezvegaerick@gmail.com
          </a>
        </p>
      </div>
    </section>
  )
}
