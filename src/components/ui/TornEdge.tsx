interface TornEdgeProps {
  color: string
  edgeColor?: string
  height?: number
  flip?: boolean
  className?: string
}

// Irregular tear line — mixed spike heights and widths, like a page
// actually ripped by hand rather than a clean sawtooth.
const TEETH: [number, number][] = [
  [0, 0], [2, 9], [5, 3], [7, 11], [10, 5], [12, 14], [15, 4], [17, 10],
  [19, 2], [22, 12], [25, 6], [27, 15], [30, 3], [33, 9], [35, 13], [38, 4],
  [41, 10], [44, 2], [47, 12], [50, 6], [53, 14], [56, 3], [59, 9], [62, 13],
  [65, 5], [68, 11], [71, 2], [74, 10], [77, 15], [80, 4], [83, 9], [86, 13],
  [89, 3], [92, 11], [95, 5], [98, 13], [100, 6],
]

function buildPath(offsetY: number) {
  const points = TEETH.map(([x, y]) => `${x},${(y + offsetY).toFixed(1)}`).join(' L')
  return `M0,0 L${points} L100,0 Z`
}

const FILL_PATH = buildPath(0)
// The white core peeks a couple of units past the colored fill's tear line.
const EDGE_PATH = buildPath(2.6)

// A jagged, hand-torn paper edge — like a scrap ripped off a comic panel,
// showing the pale core of the paper along the tear before the color resumes.
export default function TornEdge({ color, edgeColor = 'var(--cream)', height = 42, flip = false, className = '' }: TornEdgeProps) {
  return (
    <svg
      viewBox="0 0 100 20"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={`absolute left-0 right-0 bottom-0 w-full pointer-events-none ${className}`}
      style={{
        height,
        transform: flip ? 'scaleY(-1)' : undefined,
        filter: 'drop-shadow(0 4px 5px rgba(var(--shadow-c), 0.3))',
      }}
    >
      <path d={EDGE_PATH} fill={edgeColor} />
      <path d={FILL_PATH} fill={color} />
    </svg>
  )
}
