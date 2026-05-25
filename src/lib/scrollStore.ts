// Mutable ref shared between the scroll tracker and R3F useFrame.
// Using a plain object avoids re-renders on scroll.
export const scrollStore = {
  progress: 0,   // 0 → 1  (page scroll percentage)
  velocity: 0,   // scroll speed for inertia effects
}
