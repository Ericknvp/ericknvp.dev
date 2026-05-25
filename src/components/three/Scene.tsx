'use client'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Sparkles, Float, MeshDistortMaterial, Stars } from '@react-three/drei'
import { useTheme } from 'next-themes'
import * as THREE from 'three'
import { scrollStore } from '@/lib/scrollStore'

// ─── Orbital ring (local to core group) ──────────────────────────────────────

function OrbitalRing({
  radius, tube, rotX, rotZ, speed,
}: { radius: number; tube: number; rotX: number; rotZ: number; speed: number }) {
  const mesh = useRef<THREE.Mesh>(null)

  useFrame((_, delta) => {
    if (!mesh.current) return
    mesh.current.rotation.y += delta * speed
    mesh.current.rotation.z += delta * speed * 0.3
  })

  return (
    <mesh ref={mesh} rotation={[rotX, 0, rotZ]}>
      <torusGeometry args={[radius, tube, 20, 140]} />
      <meshPhysicalMaterial
        color="#f97316"
        metalness={1}
        roughness={0.04}
        emissive="#ea580c"
        emissiveIntensity={0.5}
        clearcoat={1}
        clearcoatRoughness={0.04}
        envMapIntensity={2}
      />
    </mesh>
  )
}

// ─── Floating metallic orb ────────────────────────────────────────────────────

function FloatOrb({ position, size = 0.14 }: { position: [number, number, number]; size?: number }) {
  return (
    <Float speed={1.8 + Math.random()} floatIntensity={0.9} rotationIntensity={0.6}>
      <mesh position={position}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshPhysicalMaterial
          color="#f97316"
          metalness={1}
          roughness={0.02}
          emissive="#f59e0b"
          emissiveIntensity={0.25}
          clearcoat={1}
          clearcoatRoughness={0.02}
          envMapIntensity={3}
        />
      </mesh>
    </Float>
  )
}

// ─── Main metallic core ───────────────────────────────────────────────────────

function MetallicCore() {
  const group  = useRef<THREE.Group>(null)
  const mesh   = useRef<THREE.Mesh>(null)
  const mat    = useRef<any>(null)
  const smooth = useRef(0)

  useFrame((state, delta) => {
    if (!group.current || !mesh.current || !mat.current) return
    smooth.current = THREE.MathUtils.lerp(smooth.current, scrollStore.progress, 0.04)
    const p = smooth.current
    const t = state.clock.elapsedTime

    // scroll-driven position
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, 2.5 - p * 7.5, 0.05)
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      Math.sin(p * Math.PI) * 2 + Math.sin(t * 0.45) * 0.12,
      0.05,
    )
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, -1 - p * 3, 0.04)

    // scale pulse with scroll
    const targetScale = p < 0.5 ? 1 + p * 0.9 : 1.45 - (p - 0.5) * 2.2
    group.current.scale.setScalar(
      THREE.MathUtils.lerp(group.current.scale.x, Math.max(0.05, targetScale), 0.06),
    )

    // sphere rotation
    mesh.current.rotation.x += delta * (0.1 + p * 0.9)
    mesh.current.rotation.y += delta * (0.16 + p * 0.7)

    // distort increases with scroll
    mat.current.distort = THREE.MathUtils.lerp(mat.current.distort, 0.18 + p * 0.55, 0.04)
  })

  return (
    <group ref={group} position={[2.5, 0, -1]}>
      {/* liquid metal sphere */}
      <mesh ref={mesh}>
        <sphereGeometry args={[1.2, 128, 128]} />
        <MeshDistortMaterial
          ref={mat}
          color="#c87830"
          metalness={1}
          roughness={0.04}
          distort={0.18}
          speed={2}
          envMapIntensity={4}
        />
      </mesh>

      {/* orbital rings */}
      <OrbitalRing radius={2.0} tube={0.022} rotX={0.4}  rotZ={0}   speed={0.28} />
      <OrbitalRing radius={2.5} tube={0.016} rotX={-0.7} rotZ={0.6} speed={0.18} />
      <OrbitalRing radius={1.6} tube={0.012} rotX={1.2}  rotZ={0.3} speed={0.38} />

      {/* floating orbs */}
      <FloatOrb position={[ 1.9,  1.4, 0.4]} size={0.18} />
      <FloatOrb position={[-1.7,  1.1, 0.2]} size={0.13} />
      <FloatOrb position={[ 1.5, -1.5, 0.5]} size={0.16} />
      <FloatOrb position={[-1.4, -1.2, 0.1]} size={0.11} />

      {/* ambient sparkles */}
      <Sparkles count={90} scale={7} size={1.8} speed={0.35} color="#f97316" opacity={0.55} />
    </group>
  )
}

// ─── Ambient floating fragments ───────────────────────────────────────────────

function AmbientFragment({
  position, scale = 1, speed = 1,
}: { position: [number, number, number]; scale?: number; speed?: number }) {
  const mesh   = useRef<THREE.Mesh>(null)
  const smooth = useRef(0)

  useFrame((_, delta) => {
    if (!mesh.current) return
    smooth.current = THREE.MathUtils.lerp(smooth.current, scrollStore.progress, 0.03)
    const p = smooth.current
    mesh.current.rotation.x += delta * 0.14 * speed
    mesh.current.rotation.y += delta * 0.2  * speed
    mesh.current.position.y = position[1] - p * 5
  })

  return (
    <Float speed={speed} floatIntensity={0.5} rotationIntensity={0.2}>
      <mesh ref={mesh} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshPhysicalMaterial
          color="#f97316"
          metalness={1}
          roughness={0.06}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={3}
          transparent
          opacity={0.55}
        />
      </mesh>
    </Float>
  )
}

// ─── Dynamic lights ───────────────────────────────────────────────────────────

function DynamicLights() {
  const l1 = useRef<THREE.PointLight>(null)
  const l2 = useRef<THREE.PointLight>(null)

  useFrame((state) => {
    if (!l1.current || !l2.current) return
    const p = scrollStore.progress
    const t = state.clock.elapsedTime
    l1.current.intensity = 4 + p * 5 + Math.sin(t * 1.4) * 0.6
    l2.current.intensity = 2.5 + p * 2 + Math.sin(t * 0.9) * 0.4
    l1.current.position.x = 5 - p * 10
    l1.current.position.y = 4 + Math.sin(t * 0.5) * 2
  })

  return (
    <>
      <pointLight ref={l1} position={[5, 4, 3]}    color="#f97316" intensity={4}   />
      <pointLight ref={l2} position={[-6, -3, -3]} color="#f59e0b" intensity={2.5} />
      <pointLight           position={[0, 6, -4]}  color="#ef4444" intensity={1.2} />
      <pointLight           position={[0, -4, 2]}  color="#fb923c" intensity={1.5} />
      <ambientLight intensity={0.15} />
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
        <Environment preset="studio" background={false} />
        <DynamicLights />

        {isDark && (
          <Stars radius={90} depth={60} count={3500} factor={3} saturation={0.1} fade speed={0.4} />
        )}

        <MetallicCore />

        <AmbientFragment position={[-4.5,  2,   -3]} scale={0.7} speed={1.1} />
        <AmbientFragment position={[ 4.2, -2,   -5]} scale={0.5} speed={0.9} />
        <AmbientFragment position={[-2,   -3.5, -4]} scale={0.45} speed={1.3} />
      </Canvas>
    </div>
  )
}
