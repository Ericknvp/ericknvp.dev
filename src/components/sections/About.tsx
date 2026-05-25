'use client'
import GlassCard from '../ui/GlassCard'
import { useLang } from '@/providers/LanguageProvider'

export default function About() {
  const { t } = useLang()

  return (
    <section id="about" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-xs font-mono tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--accent)' }}>
            {t.about.label}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">{t.about.title}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <GlassCard className="md:col-span-2" delay={0}>
            <h3 className="text-lg font-semibold mb-4">{t.about.card1_title}</h3>
            <p className="text-muted leading-relaxed mb-4">{t.about.card1_p1}</p>
            <p className="text-muted leading-relaxed">{t.about.card1_p2}</p>
          </GlassCard>

          <GlassCard delay={0.15}>
            <h3 className="text-lg font-semibold mb-4">{t.about.card2_title}</h3>
            <ul className="space-y-3">
              {(Object.keys(t.about.facts) as (keyof typeof t.about.facts)[]).map((key) => (
                <li key={key} className="flex justify-between text-sm">
                  <span className="text-muted font-mono">{t.about.factLabels[key]}</span>
                  <span>{t.about.facts[key]}</span>
                </li>
              ))}
            </ul>
          </GlassCard>
        </div>
      </div>
    </section>
  )
}
