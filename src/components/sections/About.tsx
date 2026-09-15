'use client'
import PaintedPanel from '../ui/PaintedPanel'
import WallTexture from '../ui/WallTexture'
import TornEdge from '../ui/TornEdge'
import { useLang } from '@/providers/LanguageProvider'

export default function About() {
  const { t } = useLang()

  return (
    <section id="about" className="relative py-28 px-6 overflow-hidden" style={{ background: 'var(--street)' }}>
      <WallTexture stripe="var(--ink)" opacity={0.04} />
      <div className="max-w-6xl mx-auto relative">
        <h2
          className="font-display mb-16 text-center"
          style={{ color: 'var(--ink)', fontSize: 'clamp(2.25rem, 6vw, 4.5rem)' }}
        >
          {t.about.title}
        </h2>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          <PaintedPanel className="md:col-span-2" delay={0} tilt={-0.4}>
            <h3 className="font-display text-xl mb-4" style={{ color: 'var(--terracotta-deep)' }}>
              {t.about.card1_title}
            </h3>
            <p className="leading-relaxed mb-4 text-ink-soft">{t.about.card1_p1}</p>
            <p className="leading-relaxed text-ink-soft">{t.about.card1_p2}</p>
          </PaintedPanel>

          <PaintedPanel delay={0.15} tilt={0.5} style={{ background: 'var(--mustard)' }}>
            <h3 className="font-display text-xl mb-4" style={{ color: 'var(--ink)' }}>
              {t.about.card2_title}
            </h3>
            <ul className="space-y-3">
              {(Object.keys(t.about.facts) as (keyof typeof t.about.facts)[]).map((key) => (
                <li key={key} className="flex items-baseline gap-2 text-sm">
                  <span className="font-semibold shrink-0" style={{ color: 'var(--ink)' }}>
                    {t.about.factLabels[key]}
                  </span>
                  <span className="flex-1 border-b-2 border-dotted" style={{ borderColor: 'rgba(28,19,9,0.35)' }} />
                  <span className="font-hand text-base shrink-0" style={{ color: 'var(--ink)' }}>
                    {t.about.facts[key]}
                  </span>
                </li>
              ))}
            </ul>
          </PaintedPanel>
        </div>
      </div>
      <TornEdge color="var(--street)" />
    </section>
  )
}
