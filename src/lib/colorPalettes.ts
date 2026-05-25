export interface PaletteMode {
  accent:      string
  accent2:     string
  accentRgb:   string   // "r,g,b" for use inside rgba()
  fgMuted:     string
  glassBg:     string
  glassBorder: string
  glow:        string
  cardHover:   string
}

export interface ColorPalette {
  id:    string
  dark:  PaletteMode
  light: PaletteMode
  scene: {
    sparkle: string
    light1:  string   // key light
    light2:  string   // complementary fill
    light3:  string   // warm fill
  }
}

export const palettes: ColorPalette[] = [
  {
    id: 'orange',
    dark: {
      accent:      '#f97316',
      accent2:     '#f59e0b',
      accentRgb:   '249,115,22',
      fgMuted:     '#b07a50',
      glassBg:     'rgba(255,255,255,0.04)',
      glassBorder: 'rgba(255,255,255,0.08)',
      glow:        'rgba(249,115,22,0.22)',
      cardHover:   'rgba(255,255,255,0.06)',
    },
    light: {
      accent:      '#ea580c',
      accent2:     '#d97706',
      accentRgb:   '234,88,12',
      fgMuted:     '#6b4c30',
      glassBg:     'rgba(234,88,12,0.05)',
      glassBorder: 'rgba(234,88,12,0.12)',
      glow:        'rgba(234,88,12,0.2)',
      cardHover:   'rgba(234,88,12,0.07)',
    },
    scene: { sparkle: '#f97316', light1: '#f97316', light2: '#93c5fd', light3: '#fb923c' },
  },
  {
    id: 'red',
    dark: {
      accent:      '#ef4444',
      accent2:     '#f97316',
      accentRgb:   '239,68,68',
      fgMuted:     '#b06060',
      glassBg:     'rgba(255,255,255,0.04)',
      glassBorder: 'rgba(255,255,255,0.08)',
      glow:        'rgba(239,68,68,0.22)',
      cardHover:   'rgba(255,255,255,0.06)',
    },
    light: {
      accent:      '#dc2626',
      accent2:     '#b91c1c',
      accentRgb:   '220,38,38',
      fgMuted:     '#7a3535',
      glassBg:     'rgba(220,38,38,0.05)',
      glassBorder: 'rgba(220,38,38,0.12)',
      glow:        'rgba(220,38,38,0.2)',
      cardHover:   'rgba(220,38,38,0.07)',
    },
    scene: { sparkle: '#ef4444', light1: '#ef4444', light2: '#818cf8', light3: '#f97316' },
  },
  {
    id: 'cyan',
    dark: {
      accent:      '#06b6d4',
      accent2:     '#0891b2',
      accentRgb:   '6,182,212',
      fgMuted:     '#50909a',
      glassBg:     'rgba(255,255,255,0.04)',
      glassBorder: 'rgba(255,255,255,0.08)',
      glow:        'rgba(6,182,212,0.22)',
      cardHover:   'rgba(255,255,255,0.06)',
    },
    light: {
      accent:      '#0891b2',
      accent2:     '#0e7490',
      accentRgb:   '8,145,178',
      fgMuted:     '#2a6a78',
      glassBg:     'rgba(8,145,178,0.05)',
      glassBorder: 'rgba(8,145,178,0.12)',
      glow:        'rgba(8,145,178,0.2)',
      cardHover:   'rgba(8,145,178,0.07)',
    },
    scene: { sparkle: '#06b6d4', light1: '#06b6d4', light2: '#f0abfc', light3: '#22d3ee' },
  },
  {
    id: 'blue',
    dark: {
      accent:      '#3b82f6',
      accent2:     '#6366f1',
      accentRgb:   '59,130,246',
      fgMuted:     '#6080b0',
      glassBg:     'rgba(255,255,255,0.04)',
      glassBorder: 'rgba(255,255,255,0.08)',
      glow:        'rgba(59,130,246,0.22)',
      cardHover:   'rgba(255,255,255,0.06)',
    },
    light: {
      accent:      '#2563eb',
      accent2:     '#4f46e5',
      accentRgb:   '37,99,235',
      fgMuted:     '#2a4a8a',
      glassBg:     'rgba(37,99,235,0.05)',
      glassBorder: 'rgba(37,99,235,0.12)',
      glow:        'rgba(37,99,235,0.2)',
      cardHover:   'rgba(37,99,235,0.07)',
    },
    scene: { sparkle: '#3b82f6', light1: '#3b82f6', light2: '#fde68a', light3: '#60a5fa' },
  },
  {
    id: 'purple',
    dark: {
      accent:      '#a855f7',
      accent2:     '#8b5cf6',
      accentRgb:   '168,85,247',
      fgMuted:     '#9060b0',
      glassBg:     'rgba(255,255,255,0.04)',
      glassBorder: 'rgba(255,255,255,0.08)',
      glow:        'rgba(168,85,247,0.22)',
      cardHover:   'rgba(255,255,255,0.06)',
    },
    light: {
      accent:      '#9333ea',
      accent2:     '#7c3aed',
      accentRgb:   '147,51,234',
      fgMuted:     '#5a2a8a',
      glassBg:     'rgba(147,51,234,0.05)',
      glassBorder: 'rgba(147,51,234,0.12)',
      glow:        'rgba(147,51,234,0.2)',
      cardHover:   'rgba(147,51,234,0.07)',
    },
    scene: { sparkle: '#a855f7', light1: '#a855f7', light2: '#86efac', light3: '#c084fc' },
  },
  {
    id: 'yellow',
    dark: {
      accent:      '#eab308',
      accent2:     '#f59e0b',
      accentRgb:   '234,179,8',
      fgMuted:     '#a0a040',
      glassBg:     'rgba(255,255,255,0.04)',
      glassBorder: 'rgba(255,255,255,0.08)',
      glow:        'rgba(234,179,8,0.22)',
      cardHover:   'rgba(255,255,255,0.06)',
    },
    light: {
      accent:      '#ca8a04',
      accent2:     '#b45309',
      accentRgb:   '202,138,4',
      fgMuted:     '#6a5510',
      glassBg:     'rgba(202,138,4,0.05)',
      glassBorder: 'rgba(202,138,4,0.12)',
      glow:        'rgba(202,138,4,0.2)',
      cardHover:   'rgba(202,138,4,0.07)',
    },
    scene: { sparkle: '#eab308', light1: '#eab308', light2: '#818cf8', light3: '#fbbf24' },
  },
]
