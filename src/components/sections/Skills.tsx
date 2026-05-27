'use client'
import type { IconType } from 'react-icons'
import {
  SiFlutter, SiDart, SiFirebase, SiAndroidstudio,
  SiHtml5, SiCss, SiJavascript, SiBootstrap, SiTailwindcss, SiReact, SiNextdotjs,
  SiPython, SiFlask, SiPhp, SiMysql, SiMongodb,
  SiGit,
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'
import GlassCard from '../ui/GlassCard'
import { useLang } from '@/providers/LanguageProvider'

const skills: Record<string, { name: string; icon: IconType; color: string }[]> = {
  Mobile: [
    { name: 'Flutter',        icon: SiFlutter,       color: '#54C5F8' },
    { name: 'Dart',           icon: SiDart,          color: '#0175C2' },
    { name: 'Firebase',       icon: SiFirebase,      color: '#FFCA28' },
    { name: 'Android Studio', icon: SiAndroidstudio, color: '#3DDC84' },
  ],
  Frontend: [
    { name: 'HTML',       icon: SiHtml5,      color: '#E34F26' },
    { name: 'CSS',        icon: SiCss,        color: '#1572B6' },
    { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
    { name: 'Bootstrap',  icon: SiBootstrap,  color: '#7952B3' },
    { name: 'Tailwind',   icon: SiTailwindcss, color: '#06B6D4' },
    { name: 'React',      icon: SiReact,      color: '#61DAFB' },
    { name: 'Next.js',    icon: SiNextdotjs,  color: '#e2e8f0' },
  ],
  Backend: [
    { name: 'Python',  icon: SiPython,  color: '#3776AB' },
    { name: 'Flask',   icon: SiFlask,   color: '#e2e8f0' },
    { name: 'PHP',     icon: SiPhp,     color: '#777BB4' },
    { name: 'MySQL',   icon: SiMysql,   color: '#4479A1' },
    { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
  ],
  Tools: [
    { name: 'Git',     icon: SiGit,     color: '#F05032' },
    { name: 'VS Code', icon: VscVscode, color: '#007ACC' },
  ],
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
                {items.map(({ name, icon: Icon, color }) => (
                  <li
                    key={name}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-all duration-200 cursor-default text-muted hover:text-[var(--fg)]"
                    style={{
                      background: 'var(--glass-bg)',
                      border: '1px solid var(--glass-border)',
                    }}
                  >
                    <Icon className="w-3.5 h-3.5 shrink-0" style={{ color }} />
                    <span>{name}</span>
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
