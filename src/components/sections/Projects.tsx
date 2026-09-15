'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLang } from '@/providers/LanguageProvider'
import PaintedPanel from '../ui/PaintedPanel'
import PhoneMockup from '../ui/PhoneMockup'
import StoreShotSlideshow from '../ui/StoreShotSlideshow'
import WallTexture from '../ui/WallTexture'
import TornEdge from '../ui/TornEdge'
import { useParallax } from '@/lib/useParallax'

const MONEDO_STORE_SHOTS = ['/images/monedo/store-1.png', '/images/monedo/store-2.png', '/images/monedo/store-3.png']

const projectMeta = [
  { ground: 'var(--mustard)',    tech: ['Flutter', 'Dart', 'Firebase'],                video: null,                    href: 'https://github.com/Ericknvp/monedo',   liveHref: 'https://monedo-e7849.web.app', upcoming: false, vertical: true,  storeShots: MONEDO_STORE_SHOTS as string[] | undefined, caseStudy: true },
  { ground: 'var(--terracotta)', tech: ['Python', 'Flask', 'MySQL', 'MongoDB'],        video: '/videos/travelia.mp4', href: 'https://github.com/Ericknvp/Travelia', liveHref: null,                           upcoming: false, vertical: false, storeShots: undefined as string[] | undefined,         caseStudy: false },
  { ground: 'var(--blue)',       tech: ['React', 'Node.js', 'Supabase', 'Capacitor'], video: null,                   href: null,                                   liveHref: null,                           upcoming: true,  vertical: false, storeShots: undefined as string[] | undefined,         caseStudy: false },
]

function ProjectCard({
  project, meta, index,
}: {
  project: { title: string; description: string; problem: string; approach: string; result: string }
  meta: (typeof projectMeta)[number]
  index: number
}) {
  const { t } = useLang()
  const [caseOpen, setCaseOpen] = useState(false)
  const { ref, y } = useParallax<HTMLDivElement>(24)
  const reversed = index % 2 === 1

  return (
    <PaintedPanel
      delay={index * 0.1}
      tilt={index % 2 === 0 ? -0.6 : 0.6}
      className="!p-4 sm:!p-6"
      style={{ background: meta.ground, borderColor: 'var(--ink)' }}
    >
      <div className={`grid md:grid-cols-2 gap-6 items-stretch ${reversed ? 'md:[direction:rtl]' : ''}`}>
        <div
          ref={ref}
          className={`relative overflow-hidden [direction:ltr] ${meta.vertical ? 'h-72 md:h-[420px]' : 'h-56 md:h-72 rounded-2xl'}`}
          style={{
            border: meta.vertical ? 'none' : '4px solid var(--ink)',
            borderRadius: meta.vertical ? 20 : undefined,
            background: meta.vertical ? meta.ground : 'var(--ink)',
          }}
        >
          {meta.upcoming ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
              <span className="font-display text-2xl" style={{ color: 'var(--mustard)' }}>
                {t.projects.upcoming}
              </span>
              <p className="font-hand text-lg" style={{ color: 'var(--cream)' }}>VALU</p>
            </div>
          ) : meta.storeShots ? (
            <motion.div style={{ y }} className="absolute inset-0">
              <StoreShotSlideshow images={meta.storeShots} />
            </motion.div>
          ) : meta.vertical ? (
            <motion.div style={{ y }} className="absolute inset-0">
              <PhoneMockup videoSrc={meta.video!} />
            </motion.div>
          ) : (
            <motion.video
              style={{ y, scale: 1.08 }}
              src={meta.video!}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
          )}
        </div>

        <div className="[direction:ltr] flex flex-col">
          <div
            className="panel p-5 flex-1 flex flex-col"
            style={{ background: 'var(--paper)' }}
          >
            <h3 className="font-display text-2xl mb-3" style={{ color: 'var(--ink)' }}>
              {project.title}
            </h3>
            <p className="text-sm leading-relaxed mb-4 text-ink-soft">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {meta.tech.map((tech) => (
                <span
                  key={tech}
                  className="tag text-[11px] font-semibold px-2.5 py-1"
                  style={{ background: 'var(--paper-2)' }}
                >
                  {tech}
                </span>
              ))}
            </div>

            {meta.caseStudy && (
              <>
                <button
                  onClick={() => setCaseOpen(v => !v)}
                  className="self-start text-xs font-bold uppercase tracking-wide mb-1 flex items-center gap-1.5 opacity-80 hover:opacity-100 transition-opacity"
                  style={{ color: 'var(--terracotta-deep)' }}
                  aria-expanded={caseOpen}
                >
                  <motion.span animate={{ rotate: caseOpen ? 90 : 0 }} transition={{ duration: 0.25 }} className="inline-block">
                    ▸
                  </motion.span>
                  {caseOpen ? t.projects.hideCase : t.projects.viewCase}
                </button>

                <AnimatePresence initial={false}>
                  {caseOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="flex flex-col gap-3 pt-3 pb-1 text-sm leading-relaxed">
                        <div>
                          <span className="font-hand text-base block" style={{ color: 'var(--terracotta-deep)' }}>{t.projects.problem}</span>
                          <p className="text-ink-soft">{project.problem}</p>
                        </div>
                        <div>
                          <span className="font-hand text-base block" style={{ color: 'var(--terracotta-deep)' }}>{t.projects.approach}</span>
                          <p className="text-ink-soft">{project.approach}</p>
                        </div>
                        <div>
                          <span className="font-hand text-base block" style={{ color: 'var(--terracotta-deep)' }}>{t.projects.result}</span>
                          <p className="text-ink-soft">{project.result}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}

            {!meta.upcoming && (
              <div className="flex gap-3 mt-auto pt-3">
                {meta.href && (
                  <a
                    href={meta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-paint px-4 py-2 text-xs"
                    style={{ background: 'var(--paper-2)' }}
                  >
                    GitHub
                  </a>
                )}
                {meta.liveHref && (
                  <a
                    href={meta.liveHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-paint px-4 py-2 text-xs"
                    style={{ background: 'var(--mustard)' }}
                  >
                    Live App
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </PaintedPanel>
  )
}

export default function Projects() {
  const { t } = useLang()

  return (
    <section id="projects" className="relative py-28 px-6 overflow-hidden" style={{ background: 'var(--street)' }}>
      <WallTexture stripe="var(--ink)" opacity={0.04} />
      <div className="max-w-5xl mx-auto relative">
        <h2
          className="font-display mb-16 text-center"
          style={{ color: 'var(--ink)', fontSize: 'clamp(2.25rem, 6vw, 4.5rem)' }}
        >
          {t.projects.title}
        </h2>

        <div className="flex flex-col gap-14">
          {t.projects.items.map((project, i) => (
            <ProjectCard key={project.title} project={project} meta={projectMeta[i]} index={i} />
          ))}
        </div>
      </div>
      <TornEdge color="var(--street)" />
    </section>
  )
}
