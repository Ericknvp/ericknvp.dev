interface WallTextureProps {
  stripe?: string
  opacity?: number
}

// The same quiet whitewash streaks from the Hero, reused so every
// signboard in the street shares one painted-wall surface.
export default function WallTexture({ stripe = 'var(--cream)', opacity = 0.05 }: WallTextureProps) {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
      style={{
        opacity,
        background: `repeating-linear-gradient(100deg, ${stripe} 0 2px, transparent 2px 140px)`,
      }}
    />
  )
}
