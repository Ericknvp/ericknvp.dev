'use client'
import { useState } from 'react'
import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  DragOverlay,
  type DragStartEvent,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
  arrayMove,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { IconType } from 'react-icons'
import {
  SiFlutter, SiDart, SiFirebase, SiAndroidstudio,
  SiHtml5, SiCss, SiJavascript, SiBootstrap, SiTailwindcss, SiReact, SiNextdotjs,
  SiPython, SiFlask, SiPhp, SiMysql, SiMongodb,
  SiGit, SiN8N,
} from 'react-icons/si'
import { VscVscode } from 'react-icons/vsc'
import { FaAws } from 'react-icons/fa'
import { useLang } from '@/providers/LanguageProvider'

type Skill = { name: string; icon: IconType; color: string }
type Category = { id: string; label: string; skills: Skill[] }

const initialCategories: Category[] = [
  {
    id: 'mobile',
    label: 'Mobile',
    skills: [
      { name: 'Flutter',        icon: SiFlutter,       color: '#54C5F8' },
      { name: 'Dart',           icon: SiDart,          color: '#0175C2' },
      { name: 'Firebase',       icon: SiFirebase,      color: '#FFCA28' },
      { name: 'Android Studio', icon: SiAndroidstudio, color: '#3DDC84' },
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend',
    skills: [
      { name: 'HTML',       icon: SiHtml5,       color: '#E34F26' },
      { name: 'CSS',        icon: SiCss,         color: '#1572B6' },
      { name: 'JavaScript', icon: SiJavascript,  color: '#F7DF1E' },
      { name: 'Bootstrap',  icon: SiBootstrap,   color: '#7952B3' },
      { name: 'Tailwind',   icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'React',      icon: SiReact,       color: '#61DAFB' },
      { name: 'Next.js',    icon: SiNextdotjs,   color: '#e2e8f0' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    skills: [
      { name: 'Python',  icon: SiPython,  color: '#3776AB' },
      { name: 'Flask',   icon: SiFlask,   color: '#e2e8f0' },
      { name: 'PHP',     icon: SiPhp,     color: '#777BB4' },
      { name: 'MySQL',   icon: SiMysql,   color: '#4479A1' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
    ],
  },
  {
    id: 'tools',
    label: 'Tools',
    skills: [
      { name: 'Git',     icon: SiGit,     color: '#F05032' },
      { name: 'VS Code', icon: VscVscode, color: '#007ACC' },
      { name: 'AWS',     icon: FaAws,     color: '#FF9900' },
      { name: 'n8n',     icon: SiN8N,     color: '#EA4B71' },
    ],
  },
]

function SkillChip({ skill }: { skill: Skill }) {
  return (
    <span
      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full text-muted"
      style={{ background: 'var(--glass-bg)', border: '1px solid var(--glass-border)' }}
    >
      <skill.icon className="w-3.5 h-3.5 shrink-0" style={{ color: skill.color }} />
      {skill.name}
    </span>
  )
}

function GripIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
      <circle cx="5" cy="4" r="1.2" /><circle cx="5" cy="8" r="1.2" /><circle cx="5" cy="12" r="1.2" />
      <circle cx="11" cy="4" r="1.2" /><circle cx="11" cy="8" r="1.2" /><circle cx="11" cy="12" r="1.2" />
    </svg>
  )
}

function CategoryCard({ category, dragging = false }: { category: Category; dragging?: boolean }) {
  return (
    <div
      className="h-full rounded-2xl p-5 transition-all duration-200"
      style={{
        background: dragging
          ? 'rgba(var(--accent-rgb), 0.08)'
          : 'var(--card-bg, rgba(255,255,255,0.04))',
        border: `1px solid ${dragging ? 'rgba(var(--accent-rgb),0.4)' : 'var(--glass-border)'}`,
        backdropFilter: 'blur(20px)',
        boxShadow: dragging
          ? '0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(var(--accent-rgb),0.3)'
          : '0 4px 24px rgba(0,0,0,0.12)',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3
          className="text-[11px] font-mono tracking-[0.2em] uppercase"
          style={{ color: 'var(--accent)' }}
        >
          {category.label}
        </h3>
        <span className="opacity-20 hover:opacity-50 transition-opacity" style={{ color: 'var(--fg)' }}>
          <GripIcon />
        </span>
      </div>
      <div className="flex flex-wrap gap-2">
        {category.skills.map(skill => (
          <SkillChip key={skill.name} skill={skill} />
        ))}
      </div>
    </div>
  )
}

function SortableCard({ category }: { category: Category }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: category.id,
  })

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`touch-none cursor-grab active:cursor-grabbing ${isDragging ? 'opacity-30' : ''}`}
      {...attributes}
      {...listeners}
    >
      <CategoryCard category={category} />
    </div>
  )
}

export default function BentoSkills() {
  const { t } = useLang()
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [activeId, setActiveId] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  )

  function handleDragStart({ active }: DragStartEvent) {
    setActiveId(active.id as string)
  }

  function handleDragEnd({ active, over }: DragEndEvent) {
    if (over && active.id !== over.id) {
      setCategories(prev => {
        const from = prev.findIndex(c => c.id === active.id)
        const to   = prev.findIndex(c => c.id === over.id)
        return arrayMove(prev, from, to)
      })
    }
    setActiveId(null)
  }

  const activeCategory = categories.find(c => c.id === activeId)

  return (
    <section id="skills" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <p className="text-xs font-mono tracking-[0.3em] uppercase mb-3" style={{ color: 'var(--accent)' }}>
            {t.skills.label}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">{t.skills.title}</h2>
        </div>

        <DndContext
          id="skills-dnd"
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={categories.map(c => c.id)} strategy={rectSortingStrategy}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {categories.map(cat => (
                <SortableCard key={cat.id} category={cat} />
              ))}
            </div>
          </SortableContext>

          <DragOverlay dropAnimation={{ duration: 180, easing: 'cubic-bezier(0.18,0.67,0.6,1.22)' }}>
            {activeCategory && <CategoryCard category={activeCategory} dragging />}
          </DragOverlay>
        </DndContext>

        <p className="mt-6 text-[11px] font-mono text-center opacity-30" style={{ color: 'var(--fg)' }}>
          drag to rearrange
        </p>
      </div>
    </section>
  )
}
