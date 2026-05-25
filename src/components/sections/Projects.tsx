'use client'
import GlassCard from '../ui/GlassCard'
import { useLang } from '@/providers/LanguageProvider'

const projectMeta = [
  { tech: ['React', 'Node.js', 'PostgreSQL'], gradient: 'from-blue-900/70 to-indigo-900/40', href: '#' },
  { tech: ['Next.js', 'Stripe', 'MongoDB'],   gradient: 'from-cyan-900/70 to-blue-900/40',   href: '#' },
  { tech: ['NestJS', 'TypeScript', 'Redis'],  gradient: 'from-indigo-900/70 to-violet-900/40', href: '#' },
]

export default function Projects() {
  const { t } = useLang()

  return (
    <section id="projects" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-xs font-mono tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--accent)' }}>
            {t.projects.label}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">{t.projects.title}</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {t.projects.items.map((project, i) => (
            <GlassCard
              key={project.title}
              delay={i * 0.12}
              className="group cursor-pointer hover:border-[var(--accent)]/25 transition-all duration-300"
            >
              <a href={projectMeta[i].href} className="block">
                <div
                  className={`h-36 rounded-xl bg-gradient-to-br ${projectMeta[i].gradient} mb-5 transition-all duration-500 group-hover:scale-[1.02]`}
                />
                <h3
                  className="text-base font-semibold mb-2 transition-colors duration-200 group-hover:text-[var(--accent)]"
                  style={{ color: 'var(--fg)' }}
                >
                  {project.title}
                </h3>
                <p className="text-sm text-muted mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {projectMeta[i].tech.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2.5 py-1 rounded-full"
                      style={{
                        background: 'rgba(59,130,246,0.1)',
                        border: '1px solid rgba(59,130,246,0.2)',
                        color: 'var(--accent)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </a>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
