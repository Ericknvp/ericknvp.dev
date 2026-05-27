'use client'
import GlassCard from '../ui/GlassCard'
import { useLang } from '@/providers/LanguageProvider'

const inputClass = `
  w-full rounded-xl px-4 py-3 text-sm
  transition-all duration-200 outline-none
  bg-[var(--glass-bg)] border border-[var(--glass-border)]
  text-[var(--fg)] placeholder:text-[var(--fg-muted)]
  focus:border-[var(--accent)]/50
`.trim()

export default function Contact() {
  const { t } = useLang()

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
          <form className="flex flex-col gap-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <input type="text"  placeholder={t.contact.name}    className={inputClass} />
              <input type="email" placeholder={t.contact.email}   className={inputClass} />
            </div>
            <input type="text" placeholder={t.contact.subject} className={inputClass} />
            <textarea
              placeholder={t.contact.message}
              rows={5}
              className={`${inputClass} resize-none`}
            />
            <button
              type="submit"
              className="btn-accent w-full py-3.5 rounded-xl text-sm font-medium text-white"
            >
              {t.contact.send}
            </button>
          </form>
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
