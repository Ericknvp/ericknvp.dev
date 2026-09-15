'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
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
import { FaAws, FaJava } from 'react-icons/fa'
import { useLang } from '@/providers/LanguageProvider'
import WallTexture from '../ui/WallTexture'
import TornEdge from '../ui/TornEdge'

type Skill = { name: string; icon: IconType; color: string }
type Category = { id: string; label: string; skills: Skill[] }

const BOARD_COLORS = ['var(--mustard)', 'var(--blue)', 'var(--terracotta)', 'var(--mustard-deep)']
const BOARD_SHADOWS = ['rgba(217,154,34,0.4)', 'rgba(44,95,168,0.4)', 'rgba(193,80,43,0.4)', 'rgba(169,116,14,0.4)']
const BOARD_TILTS = [-1.6, 1.2, -1, 1.8]

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
      { name: 'Next.js',    icon: SiNextdotjs,   color: '#334155' },
    ],
  },
  {
    id: 'backend',
    label: 'Backend',
    skills: [
      { name: 'Java',    icon: FaJava,    color: '#ED8B00' },
      { name: 'Python',  icon: SiPython,  color: '#3776AB' },
      { name: 'Flask',   icon: SiFlask,   color: '#334155' },
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
      { name: 'AWS',     icon: FaAws,     color: '#a9740e' },
      { name: 'n8n',     icon: SiN8N,     color: '#EA4B71' },
    ],
  },
]

function SkillChip({ skill }: { skill: Skill }) {
  return (
    <span className="tag text-xs font-semibold px-3 py-1.5" style={{ background: 'var(--paper)' }}>
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

function CategoryCard({
  category, index, dragging = false, dimmed = false, onToggleFocus,
}: {
  category: Category
  index: number
  dragging?: boolean
  dimmed?: boolean
  onToggleFocus?: () => void
}) {
  const tilt = BOARD_TILTS[index % BOARD_TILTS.length]
  const scale = dimmed ? 0.97 : dragging ? 1.03 : 1

  return (
    <div
      className="panel p-5 transition-all duration-300"
      style={{
        background: BOARD_COLORS[index % BOARD_COLORS.length],
        opacity: dimmed ? 0.35 : 1,
        transform: `rotate(${tilt}deg) scale(${scale})`,
        boxShadow: `0 20px 36px -14px ${BOARD_SHADOWS[index % BOARD_SHADOWS.length]}, 0 4px 10px rgba(var(--shadow-c), 0.22)`,
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={(e) => { e.stopPropagation(); onToggleFocus?.() }}
          className="font-display text-lg text-left cursor-pointer"
          style={{ color: 'var(--cream)' }}
        >
          {category.label}
        </button>
        <span className="opacity-50" style={{ color: 'var(--cream)' }}>
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

function SortableCard({
  category, index, dimmed, onToggleFocus,
}: {
  category: Category
  index: number
  dimmed: boolean
  onToggleFocus: () => void
}) {
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
      <CategoryCard category={category} index={index} dimmed={dimmed} onToggleFocus={onToggleFocus} />
    </div>
  )
}

export default function BentoSkills() {
  const { t } = useLang()
  const [categories, setCategories] = useState<Category[]>(initialCategories)
  const [activeId, setActiveId] = useState<string | null>(null)
  const [focusedId, setFocusedId] = useState<string | null>(null)

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
  const activeIndex = categories.findIndex(c => c.id === activeId)

  return (
    <section id="skills" className="relative py-28 px-6 overflow-hidden" style={{ background: 'var(--ink)' }}>
      <WallTexture stripe="var(--cream)" opacity={0.04} />
      <div className="max-w-6xl mx-auto relative">
        <h2
          className="font-display mb-16 text-center"
          style={{ color: 'var(--cream)', fontSize: 'clamp(2.25rem, 6vw, 4.5rem)' }}
        >
          {t.skills.title}
        </h2>

        <DndContext
          id="skills-dnd"
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={categories.map(c => c.id)} strategy={rectSortingStrategy}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 items-start">
              {categories.map((cat, i) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.5, delay: i * 0.07, ease: [0.23, 1, 0.32, 1] }}
                >
                  <SortableCard
                    category={cat}
                    index={i}
                    dimmed={focusedId !== null && focusedId !== cat.id}
                    onToggleFocus={() => setFocusedId(prev => (prev === cat.id ? null : cat.id))}
                  />
                </motion.div>
              ))}
            </div>
          </SortableContext>

          <DragOverlay dropAnimation={{ duration: 180, easing: 'cubic-bezier(0.18,0.67,0.6,1.22)' }}>
            {activeCategory && <CategoryCard category={activeCategory} index={activeIndex} dragging />}
          </DragOverlay>
        </DndContext>

        <p className="mt-8 text-xs font-hand text-center" style={{ color: 'var(--cream-soft)' }}>
          arrastra para reordenar · toca un letrero para resaltarlo
        </p>
      </div>
      <TornEdge color="var(--ink)" />
    </section>
  )
}
