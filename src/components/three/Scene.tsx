'use client'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Float, MeshDistortMaterial, MeshWobbleMaterial } from '@react-three/drei'
import { useTheme } from 'next-themes'
import * as THREE from 'three'
import { scrollStore } from '@/lib/scrollStore'

// ─── Central torus knot — dramatic scroll animation ───────────────────────────

function CentralKnot() {
  const mesh = useRef<THREE.Mesh>(null)
  const mat = useRef<any>(null)
  const smooth = useRef(0)

  useFrame((_, delta) => {
    if (!mesh.current || !mat.current) return

    smooth.current = THREE.MathUtils.lerp(smooth.current, scrollStore.progress, 0.04)
    const p = smooth.current

    mesh.current.rotation.x += delta * (0.08 + p * 1.2)
    mesh.current.rotation.y += delta * (0.12 + p * 0.9)
    mesh.current.rotation.z += delta * (0.04 + p * 0.3)

    const targetScale = p < 0.5 ? 1 + p * 1.2 : 1.6 - (p - 0.5) * 2.4
    mesh.current.scale.setScalar(
      THREE.MathUtils.lerp(mesh.current.scale.x, Math.max(0.1, targetScale), 0.06)
    )

    mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, 2.8 - p * 7, 0.05)
    mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, Math.sin(p * Math.PI) * 2.5, 0.05)
    mesh.current.position.z = THREE.MathUtils.lerp(mesh.current.position.z, -1 - p * 3, 0.04)

    mat.current.distort = THREE.MathUtils.lerp(mat.current.distort, 0.05 + p * 0.65, 0.04)
    mat.current.emissiveIntensity = THREE.MathUtils.lerp(mat.current.emissiveIntensity, 0.2 + p * 1.4, 0.04)

    // Blue → cyan shift with scroll
    const r = THREE.MathUtils.lerp(0.23, 0.02, p)
    const g = THREE.MathUtils.lerp(0.51, 0.72, p)
    const b = THREE.MathUtils.lerp(0.96, 0.96, p)
    mat.current.color.setRGB(r, g, b)
    mat.current.emissive.setRGB(r * 0.4, g * 0.3, b * 0.5)
  })

  return (
    <mesh ref={mesh} position={[2.8, 0, -1]}>
      <torusKnotGeometry args={[1, 0.32, 220, 32, 2, 3]} />
      <MeshDistortMaterial
        ref={mat}
        color="#3b82f6"
        distort={0.05}
        speed={3}
        roughness={0.04}
        metalness={0.96}
        emissive="#1d4ed8"
        emissiveIntensity={0.2}
        transparent
        opacity={0.9}
      />
    </mesh>
  )
}

// ─── Satellite ring ───────────────────────────────────────────────────────────

function SatelliteRing() {
  const mesh = useRef<THREE.Mesh>(null)
  const smooth = useRef(0)

  useFrame((_, delta) => {
    if (!mesh.current) return
    smooth.current = THREE.MathUtils.lerp(smooth.current, scrollStore.progress, 0.04)
    const p = smooth.current

    mesh.current.rotation.x += delta * (0.06 + p * 0.8)
    mesh.current.rotation.y += delta * (0.1 + p * 0.5)
    mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, 2.8 - p * 7, 0.04)
    mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, Math.sin(p * Math.PI) * 2.5, 0.04)
    mesh.current.position.z = THREE.MathUtils.lerp(mesh.current.position.z, -1 - p * 3, 0.04)

    const scale = p < 0.5 ? 1.8 + p * 1.2 : 2.4 - (p - 0.5) * 3
    mesh.current.scale.setScalar(Math.max(0.05, scale))
  })

  return (
    <mesh ref={mesh} position={[2.8, 0, -1]}>
      <torusGeometry args={[1.9, 0.03, 16, 120]} />
      <meshStandardMaterial
        color="#06b6d4"
        emissive="#0e7490"
        emissiveIntensity={0.8}
        metalness={1}
        roughness={0.05}
        transparent
        opacity={0.5}
      />
    </mesh>
  )
}

// ─── Ambient shapes ───────────────────────────────────────────────────────────

interface ShapeProps {
  position: [number, number, number]
  color: string
  scale?: number
  factor?: number
  speed?: number
}

function AmbientShape({ position, color, scale = 1, factor = 1, speed = 1 }: ShapeProps) {
  const group = useRef<THREE.Group>(null)
  const mesh = useRef<THREE.Mesh>(null)
  const smooth = useRef(0)

  useFrame((_, delta) => {
    if (!group.current || !mesh.current) return
    smooth.current = THREE.MathUtils.lerp(smooth.current, scrollStore.progress, 0.03)
    const p = smooth.current

    mesh.current.rotation.x += delta * 0.12 * speed
    mesh.current.rotation.y += delta * 0.18 * speed
    group.current.position.y = position[1] - p * factor * 5
    group.current.position.x = position[0] + Math.sin(p * Math.PI * 1.5) * 0.8 * factor
    mesh.current.rotation.z = p * Math.PI * factor * 0.8
  })

  return (
    <group ref={group} position={position}>
      <Float speed={speed} floatIntensity={0.6} rotationIntensity={0.15}>
        <mesh ref={mesh} scale={scale}>
          <icosahedronGeometry args={[1, 1]} />
          <MeshWobbleMaterial
            color={color}
            factor={0.25}
            speed={1.5}
            roughness={0.1}
            metalness={0.85}
            transparent
            opacity={0.5}
          />
        </mesh>
      </Float>
    </group>
  )
}

// ─── Dynamic lights ───────────────────────────────────────────────────────────

function DynamicLights() {
  const light1 = useRef<THREE.PointLight>(null)
  const light2 = useRef<THREE.PointLight>(null)
  const smooth = useRef(0)

  useFrame((state) => {
    if (!light1.current || !light2.current) return
    smooth.current = THREE.MathUtils.lerp(smooth.current, scrollStore.progress, 0.04)
    const p = smooth.current
    const t = state.clock.elapsedTime

    light1.current.intensity = 3 + p * 4 + Math.sin(t * 1.5) * 0.5
    light2.current.intensity = 2 + p * 2 + Math.sin(t * 0.8 + 1) * 0.4
    light1.current.position.x = 5 - p * 10
    light1.current.position.y = 4 + Math.sin(t * 0.5) * 2
  })

  return (
    <>
      <pointLight ref={light1} position={[5, 4, 2]} color="#3b82f6" intensity={3} />
      <pointLight ref={light2} position={[-6, -3, -3]} color="#06b6d4" intensity={2} />
      <pointLight position={[0, 6, -4]} color="#818cf8" intensity={1.5} />
      <ambientLight intensity={0.2} />
    </>
  )
}

// ─── Canvas ───────────────────────────────────────────────────────────────────

export default function Scene() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme !== 'light'

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      <Canvas camera={{ position: [0, 0, 7], fov: 65 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }}>
        <DynamicLights />

        {isDark && (
          <Stars radius={90} depth={60} count={3500} factor={3} saturation={0.1} fade speed={0.4} />
        )}

        <CentralKnot />
        <SatelliteRing />

        <AmbientShape position={[-4.5, 2, -3]} color="#1d4ed8" scale={0.8} factor={0.7} speed={1.1} />
        <AmbientShape position={[4.5, -2, -5]} color="#0e7490" scale={0.6} factor={1.3} speed={0.9} />
        <AmbientShape position={[-2, -3.5, -4]} color="#3730a3" scale={0.5} factor={0.9} speed={1.4} />
      </Canvas>
    </div>
  )
}
