'use client'
import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import { palettes, ColorPalette } from '@/lib/colorPalettes'

interface ColorCtx { palette: ColorPalette }
const Ctx = createContext<ColorCtx>({ palette: palettes[0] })

export function useColorPalette() { return useContext(Ctx) }

export default function ColorProvider({ children }: { children: React.ReactNode }) {
  const [palette, setPalette] = useState<ColorPalette>(palettes[0])
  const { resolvedTheme } = useTheme()
  const picked = useRef(false)

  // Pick once per session
  useEffect(() => {
    if (picked.current) return
    picked.current = true
    setPalette(palettes[Math.floor(Math.random() * palettes.length)])
  }, [])

  // Apply CSS vars whenever palette or theme changes
  useEffect(() => {
    const isDark = resolvedTheme !== 'light'
    const v = isDark ? palette.dark : palette.light
    const r = document.documentElement
    r.style.setProperty('--accent',       v.accent)
    r.style.setProperty('--accent2',      v.accent2)
    r.style.setProperty('--accent-rgb',   v.accentRgb)
    r.style.setProperty('--fg-muted',     v.fgMuted)
    r.style.setProperty('--glass-bg',     v.glassBg)
    r.style.setProperty('--glass-border', v.glassBorder)
    r.style.setProperty('--glow',         v.glow)
    r.style.setProperty('--card-hover',   v.cardHover)
  }, [palette, resolvedTheme])

  return <Ctx.Provider value={{ palette }}>{children}</Ctx.Provider>
}
