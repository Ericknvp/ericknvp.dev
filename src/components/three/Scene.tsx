'use client'
import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Sparkles, Stars, MeshDistortMaterial } from '@react-three/drei'
import { useTheme } from 'next-themes'
import * as THREE from 'three'
import { scrollStore } from '@/lib/scrollStore'

const ORANGE = '#f97316'
const WARM   = '#fff8f0'

// ─── Eye — blinks and looks around ───────────────────────────────────────────

function Eye({ x }: { x: number }) {
  const eyeGroup  = useRef<THREE.Group>(null)
  const pupil     = useRef<THREE.Mesh>(null)
  const lookTarget = useRef({ x: 0, y: 0 })
  const lookTimer  = useRef(Math.random() * 2 + 1)
  const blinkTimer = useRef(Math.random() * 3 + 2)
  const blinkAmt   = useRef(0)
  const blinking   = useRef(false)
  const blinkDir   = useRef(1)

  useFrame((_, delta) => {
    // look around
    lookTimer.current -= delta
    if (lookTimer.current <= 0) {
      lookTarget.current = {
        x: (Math.random() - 0.5) * 0.09,
        y: (Math.random() - 0.5) * 0.07,
      }
      lookTimer.current = 1.5 + Math.random() * 3.5
    }
    if (pupil.current) {
      pupil.current.position.x = THREE.MathUtils.lerp(pupil.current.position.x, lookTarget.current.x, 0.07)
      pupil.current.position.y = THREE.MathUtils.lerp(pupil.current.position.y, lookTarget.current.y, 0.07)
    }

    // blink
    blinkTimer.current -= delta
    if (blinkTimer.current <= 0 && !blinking.current) {
      blinking.current = true
      blinkDir.current = 1
      blinkAmt.current = 0
      blinkTimer.current = 2.5 + Math.random() * 5
    }
    if (blinking.current) {
      blinkAmt.current += delta * blinkDir.current * 12
      if (blinkAmt.current >= 1) { blinkAmt.current = 1; blinkDir.current = -1 }
      if (blinkAmt.current <= 0 && blinkDir.current === -1) { blinkAmt.current = 0; blinking.current = false }
    }
    if (eyeGroup.current) {
      eyeGroup.current.scale.y = THREE.MathUtils.lerp(eyeGroup.current.scale.y, 1 - blinkAmt.current * 0.95, 0.3)
    }
  })

  return (
    <group ref={eyeGroup} position={[x, 0.2, 1.03]}>
      {/* sclera */}
      <mesh>
        <circleGeometry args={[0.19, 64]} />
        <meshPhysicalMaterial color={WARM} emissive="#fff0d8" emissiveIntensity={0.2} />
      </mesh>
      {/* iris */}
      <mesh position={[0, 0, 0.002]}>
        <circleGeometry args={[0.13, 48]} />
        <meshPhysicalMaterial color="#180800" />
      </mesh>
      {/* glowing pupil */}
      <mesh ref={pupil} position={[0, 0, 0.004]}>
        <circleGeometry args={[0.068, 40]} />
        <meshPhysicalMaterial color={WARM} emissive={ORANGE} emissiveIntensity={4} />
      </mesh>
      {/* sparkle highlight */}
      <mesh position={[0.058, 0.062, 0.007]}>
        <circleGeometry args={[0.026, 16]} />
        <meshPhysicalMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={3} />
      </mesh>
      <pointLight color={ORANGE} intensity={0.7} distance={1.2} />
    </group>
  )
}

// ─── Cute orb robot ───────────────────────────────────────────────────────────

function CuteOrb() {
  const group   = useRef<THREE.Group>(null)
  const bodyMesh = useRef<THREE.Mesh>(null)
  const mat     = useRef<any>(null)
  const antBall = useRef<THREE.Mesh>(null)
  const smooth  = useRef(0)

  useFrame((state, delta) => {
    if (!group.current) return
    smooth.current = THREE.MathUtils.lerp(smooth.current, scrollStore.progress, 0.04)
    const p = smooth.current
    const t = state.clock.elapsedTime

    // scroll movement
    group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, 2.5 - p * 7.5, 0.05)
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      Math.sin(p * Math.PI) * 2 + Math.sin(t * 1.3) * 0.18,
      0.05,
    )
    group.current.position.z = THREE.MathUtils.lerp(group.current.position.z, -1 - p * 3, 0.04)

    const s = p < 0.5 ? 1 + p * 0.9 : 1.45 - (p - 0.5) * 2.2
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, Math.max(0.05, s), 0.06))

    // happy wobble
    group.current.rotation.z = Math.sin(t * 1.1) * 0.045
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, -p * 0.5, 0.04)

    // breathing
    const breathe = 1 + Math.sin(t * 1.5) * 0.013
    if (bodyMesh.current) bodyMesh.current.scale.setScalar(breathe)

    // distort pulse
    if (mat.current) mat.current.distort = 0.04 + Math.sin(t * 0.9) * 0.018 + p * 0.22

    // antenna pulse
    if (antBall.current) {
      ;(antBall.current.material as THREE.MeshStandardMaterial).emissiveIntensity =
        1.6 + Math.sin(t * 4) * 0.9
    }
  })

  return (
    <group ref={group} position={[2.5, 0, -1]}>

      {/* ── BODY ─────────────────────────────── */}
      <mesh ref={bodyMesh}>
        <sphereGeometry args={[1.05, 128, 128]} />
        <MeshDistortMaterial
          ref={mat}
          color="#c87830"
          metalness={1}
          roughness={0.04}
          distort={0.04}
          speed={1.6}
          envMapIntensity={4}
        />
      </mesh>

      {/* ── CHEEKS (subtle blush) ─────────────── */}
      {[-0.52, 0.52].map((x) => (
        <mesh key={x} position={[x, 0.0, 0.9]}>
          <circleGeometry args={[0.15, 32]} />
          <meshPhysicalMaterial color="#f97316" emissive="#f97316" emissiveIntensity={0.3} transparent opacity={0.2} />
        </mesh>
      ))}

      {/* ── EYES ─────────────────────────────── */}
      <Eye x={-0.28} />
      <Eye x={ 0.28} />

      {/* ── SMALL MOUTH LINE ─────────────────── */}
      <mesh position={[0, -0.14, 1.035]} rotation={[0, 0, Math.PI]}>
        <torusGeometry args={[0.09, 0.013, 8, 28, Math.PI * 0.65]} />
        <meshPhysicalMaterial color={ORANGE} emissive={ORANGE} emissiveIntensity={0.6} />
      </mesh>

      {/* ── ANTENNA ──────────────────────────── */}
      <mesh position={[0, 1.16, 0]}>
        <cylinderGeometry args={[0.016, 0.016, 0.44, 10]} />
        <meshPhysicalMaterial color={ORANGE} metalness={1} roughness={0.05} emissive={ORANGE} emissiveIntensity={0.35} envMapIntensity={3} />
      </mesh>
      <mesh ref={antBall} position={[0, 1.42, 0]}>
        <sphereGeometry args={[0.068, 24, 24]} />
        <meshPhysicalMaterial color={WARM} emissive={ORANGE} emissiveIntensity={2} metalness={0.4} roughness={0.1} />
      </mesh>

      {/* ── ROUND EARS ───────────────────────── */}
      {([-1, 1] as const).map((side) => (
        <mesh key={side} position={[side * 1.04, 0.06, 0]}>
          <sphereGeometry args={[0.17, 28, 28]} />
          <meshPhysicalMaterial color="#c87830" metalness={1} roughness={0.04} clearcoat={1} envMapIntensity={4} />
        </mesh>
      ))}

      {/* ── THRUSTERS ────────────────────────── */}
      {([-0.35, 0.35] as const).map((x) => (
        <group key={x} position={[x, -1.0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.075, 0.055, 0.22, 14]} />
            <meshPhysicalMaterial color="#0c0c0e" metalness={0.92} roughness={0.08} clearcoat={1} envMapIntensity={2} />
          </mesh>
          <mesh position={[0, -0.13, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <circleGeometry args={[0.06, 24]} />
            <meshPhysicalMaterial color={WARM} emissive={ORANGE} emissiveIntensity={3.5} />
          </mesh>
          <pointLight color={ORANGE} intensity={1.8} distance={1.6} decay={2} />
        </group>
      ))}

      <Sparkles count={55} scale={6} size={1.2} speed={0.25} color={ORANGE} opacity={0.38} />
    </group>
  )
}

// ─── Ambient fragments ────────────────────────────────────────────────────────

function AmbientFragment({ position, scale = 1, speed = 1 }: { position: [number,number,number]; scale?: number; speed?: number }) {
  const mesh = useRef<THREE.Mesh>(null)
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
      <meshPhysicalMaterial color="#c87830" metalness={1} roughness={0.06} clearcoat={1} envMapIntensity={3} transparent opacity={0.38} />
    </mesh>
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
      <ambientLight intensity={0.12} />
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
        {isDark && <Stars radius={90} depth={60} count={3500} factor={3} saturation={0.1} fade speed={0.4} />}
        <CuteOrb />
        <AmbientFragment position={[-4.5,  2,   -3]} scale={0.65} speed={1.1} />
        <AmbientFragment position={[ 4.2, -2,   -5]} scale={0.5}  speed={0.9} />
        <AmbientFragment position={[-2,   -3.5, -4]} scale={0.4}  speed={1.3} />
      </Canvas>
    </div>
  )
}
