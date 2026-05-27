'use client'
import GlassCard from '../ui/GlassCard'
import { useLang } from '@/providers/LanguageProvider'

const projectMeta = [
  { tech: ['Flutter', 'Dart', 'Firebase'],         video: '/videos/monedo.mp4',   href: 'https://github.com/Ericknvp/monedo',   liveHref: 'https://monedo-e7849.web.app', blurBg: true  },
  { tech: ['Python', 'Flask', 'MySQL', 'MongoDB'], video: '/videos/travelia.mp4', href: 'https://github.com/Ericknvp/Travelia', liveHref: null,                           blurBg: false },
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

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl">
          {t.projects.items.map((project, i) => (
            <GlassCard
              key={project.title}
              delay={i * 0.12}
              className="group hover:border-[var(--accent)]/25 transition-all duration-300"
            >
              <div>
                <div className="h-48 rounded-xl overflow-hidden mb-5 transition-all duration-500 group-hover:scale-[1.02] bg-black/30 relative">
                  {projectMeta[i].blurBg && (
                    <video
                      src={projectMeta[i].video}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover scale-110 blur-xl opacity-60"
                    />
                  )}
                  <video
                    src={projectMeta[i].video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={`relative w-full h-full ${projectMeta[i].blurBg ? 'object-contain' : 'object-cover'}`}
                  />
                </div>
                <h3
                  className="text-base font-semibold mb-2 transition-colors duration-200 group-hover:text-[var(--accent)]"
                  style={{ color: 'var(--fg)' }}
                >
                  {project.title}
                </h3>
                <p className="text-sm text-muted mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
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
                <div className="flex gap-3">
                  <a
                    href={projectMeta[i].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] px-3 py-1.5 rounded-full border transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)]"
                    style={{ borderColor: 'rgba(255,255,255,0.15)', color: 'var(--muted)' }}
                  >
                    GitHub
                  </a>
                  {projectMeta[i].liveHref && (
                    <a
                      href={projectMeta[i].liveHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] px-3 py-1.5 rounded-full border transition-colors duration-200 hover:opacity-80"
                      style={{
                        background: 'rgba(59,130,246,0.15)',
                        border: '1px solid rgba(59,130,246,0.3)',
                        color: 'var(--accent)',
                      }}
                    >
                      Live App ↗
                    </a>
                  )}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
