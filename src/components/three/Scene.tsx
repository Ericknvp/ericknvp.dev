'use client'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Sparkles, Stars, MeshDistortMaterial } from '@react-three/drei'
import { useTheme } from 'next-themes'
import * as THREE from 'three'
import { scrollStore } from '@/lib/scrollStore'
import { useColorPalette } from '@/providers/ColorProvider'

// ─── Metallic irregular orb ───────────────────────────────────────────────────

function MetallicOrb() {
  const group  = useRef<THREE.Group>(null)
  const mat    = useRef<any>(null)
  const smooth = useRef(0)

  useFrame((state) => {
    if (!group.current) return
    smooth.current = THREE.MathUtils.lerp(smooth.current, scrollStore.progress, 0.04)
    const p = smooth.current
    const t = state.clock.elapsedTime

    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, 2.5 - p * 7.5, 0.05)
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      Math.sin(p * Math.PI) * 2 + Math.sin(t * 1.3) * 0.18,
      0.05,
    )
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, -1 - p * 3, 0.04)

    const s = p < 0.5 ? 1 + p * 0.9 : 1.45 - (p - 0.5) * 2.2
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, Math.max(0.05, s), 0.06))

    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, -p * 0.5, 0.04)
    group.current.rotation.z = Math.sin(t * 0.8) * 0.03

    if (mat.current) mat.current.distort = 0.26 + Math.sin(t * 0.65) * 0.09 + p * 0.2
  })

  return (
    <group ref={group} position={[2.5, 0, -1]}>
      <mesh>
        <sphereGeometry args={[1.05, 128, 128]} />
        <MeshDistortMaterial
          ref={mat}
          color="#c2cdd6"
          metalness={1}
          roughness={0.04}
          distort={0.26}
          speed={1.4}
          envMapIntensity={4.5}
        />
      </mesh>
      <SparklesAccent />
    </group>
  )
}

function SparklesAccent() {
  const { palette } = useColorPalette()
  return <Sparkles count={45} scale={6} size={1.2} speed={0.25} color={palette.scene.sparkle} opacity={0.3} />
}

// ─── Ambient metallic shards ──────────────────────────────────────────────────

function AmbientFragment({ position, scale = 1, speed = 1 }: { position: [number,number,number]; scale?: number; speed?: number }) {
  const mesh   = useRef<THREE.Mesh>(null)
  const smooth = useRef(0)
  useFrame((_, delta) => {
    if (!mesh.current) return
    smooth.current = THREE.MathUtils.lerp(smooth.current, scrollStore.progress, 0.03)
    mesh.current.rotation.x += delta * 0.13 * speed
    mesh.current.rotation.y += delta * 0.19 * speed
    mesh.current.position.y = position[1] - smooth.current * 5
  })
  return (
    <mesh ref={mesh} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 1]} />
      <meshPhysicalMaterial color="#c0cad4" metalness={1} roughness={0.06} clearcoat={1} envMapIntensity={3} transparent opacity={0.4} />
    </mesh>
  )
}

// ─── Dynamic lights ───────────────────────────────────────────────────────────

function DynamicLights({ isDark }: { isDark: boolean }) {
  const { palette } = useColorPalette()
  const l1 = useRef<THREE.PointLight>(null)
  const l2 = useRef<THREE.PointLight>(null)
  useFrame((state) => {
    if (!l1.current || !l2.current) return
    const p = scrollStore.progress
    const t = state.clock.elapsedTime
    l1.current.intensity = 5 + p * 5 + Math.sin(t * 1.4) * 0.8
    l2.current.intensity = 3.5 + p * 2 + Math.sin(t * 0.9) * 0.5
    l1.current.position.x = 5 - p * 10
    l1.current.position.y = 4 + Math.sin(t * 0.5) * 2
  })
  return (
    <>
      <pointLight ref={l1} position={[5, 4, 3]}    color={palette.scene.light1} intensity={5}   />
      <pointLight ref={l2} position={[-6, -3, -3]} color={palette.scene.light2} intensity={3.5} />
      <pointLight           position={[0, 6, -4]}  color="#ffffff"               intensity={isDark ? 1.5 : 4} />
      <pointLight           position={[0, -4, 2]}  color={palette.scene.light3}  intensity={2.0} />
      <pointLight           position={[2, 2, 5]}   color="#ffffff"               intensity={isDark ? 0 : 5} />
      <ambientLight intensity={isDark ? 0.15 : 1.4} />
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
        <Environment preset={isDark ? 'studio' : 'warehouse'} background={false} blur={0.85} />
        <DynamicLights isDark={isDark} />
        {isDark && <Stars radius={90} depth={60} count={3500} factor={3} saturation={0.1} fade speed={0.4} />}
        <MetallicOrb />
        <AmbientFragment position={[-4.5,  2,   -3]} scale={0.65} speed={1.1} />
        <AmbientFragment position={[ 4.2, -2,   -5]} scale={0.5}  speed={0.9} />
        <AmbientFragment position={[-2,   -3.5, -4]} scale={0.4}  speed={1.3} />
      </Canvas>
    </div>
  )
}
