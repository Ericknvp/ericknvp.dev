'use client'
import GlassCard from '../ui/GlassCard'
import { useLang } from '@/providers/LanguageProvider'

const skills: Record<string, string[]> = {
  Frontend: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  Backend: ['Node.js', 'Express', 'NestJS', 'PostgreSQL', 'MongoDB'],
  DevOps: ['Docker', 'AWS', 'Vercel', 'GitHub Actions', 'Linux'],
  Tools: ['Git', 'Figma', 'Postman', 'Prisma', 'Redis'],
}

export default function Skills() {
  const { t } = useLang()

  return (
    <section id="skills" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-xs font-mono tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--accent)' }}>
            {t.skills.label}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">{t.skills.title}</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Object.entries(skills).map(([category, items], i) => (
            <GlassCard key={category} delay={i * 0.1}>
              <h3 className="text-[11px] font-mono mb-5 tracking-[0.2em] uppercase" style={{ color: 'var(--accent)' }}>
                {category}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {items.map((skill) => (
                  <li
                    key={skill}
                    className="text-xs px-3 py-1.5 rounded-full transition-all duration-200 cursor-default text-muted hover:text-[var(--fg)]"
                    style={{
                      background: 'var(--glass-bg)',
                      border: '1px solid var(--glass-border)',
                    }}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
