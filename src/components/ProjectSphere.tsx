import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Billboard, Html, OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'
import type { ComponentRef } from 'react'
import type { Project } from '../data/projects'
import { statusLabel } from '../data/projects'

const CARD_W = 1.45
const CARD_H = CARD_W * 9 / 16
const SPHERE_R = 2.7

// Evenly distribute n points on a sphere (fibonacci lattice)
function spherePositions(n: number, radius: number): [number, number, number][] {
  if (n === 1) return [[0, 0, radius]]
  const golden = Math.PI * (3 - Math.sqrt(5))
  return Array.from({ length: n }, (_, i) => {
    const y = 1 - (i / (n - 1)) * 2
    const r = Math.sqrt(Math.max(0, 1 - y * y))
    const theta = golden * i
    return [Math.cos(theta) * r * radius, y * radius * 0.92, Math.sin(theta) * r * radius]
  })
}

// Gradient + mark fallback texture, drawn once per project
function makeGradientTexture(p: Project): THREE.CanvasTexture {
  const canvas = document.createElement('canvas')
  canvas.width = 512
  canvas.height = 288
  const ctx = canvas.getContext('2d')!
  const colors = p.grad.match(/#[0-9a-fA-F]{3,8}/g) ?? ['#1f3864', '#2e5aac']
  const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
  colors.forEach((c, i) => grad.addColorStop(colors.length === 1 ? 0 : i / (colors.length - 1), c))
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = 'rgba(255,255,255,.16)'
  ctx.font = '800 92px "Bricolage Grotesque", sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(p.mark, canvas.width / 2, canvas.height / 2)
  const tex = new THREE.CanvasTexture(canvas)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

// Poster/YouTube thumbnail texture with the gradient as instant fallback
function useCardTexture(p: Project): THREE.Texture {
  const fallback = useMemo(() => makeGradientTexture(p), [p])
  const [tex, setTex] = useState<THREE.Texture>(fallback)

  useEffect(() => {
    setTex(fallback)
    const url = p.poster ?? (p.video ? `https://i.ytimg.com/vi/${p.video}/hqdefault.jpg` : null)
    if (!url) return
    let disposed = false
    let loaded: THREE.Texture | null = null
    const loader = new THREE.TextureLoader()
    loader.setCrossOrigin('anonymous')
    loader.load(
      url,
      t => {
        if (disposed) { t.dispose(); return }
        t.colorSpace = THREE.SRGBColorSpace
        if (!p.poster && p.video) {
          // hqdefault is 4:3 with letterbox bars — crop the centred 16:9 region
          t.repeat.set(1, 0.75)
          t.offset.set(0, 0.125)
        }
        loaded = t
        setTex(t)
      },
      undefined,
      () => { /* keep gradient fallback */ },
    )
    return () => {
      disposed = true
      loaded?.dispose()
    }
  }, [p, fallback])

  useEffect(() => () => fallback.dispose(), [fallback])
  return tex
}

interface CardProps {
  p: Project
  position: [number, number, number]
  hovered: boolean
  onHover: (over: boolean) => void
  onOpen: () => void
}

function SphereCard({ p, position, hovered, onHover, onOpen }: CardProps) {
  const group = useRef<THREE.Group>(null)
  const target = useRef(new THREE.Vector3(...position))
  const scaleTarget = useRef(new THREE.Vector3(1, 1, 1))
  const tex = useCardTexture(p)

  useEffect(() => { target.current.set(...position) }, [position])

  useFrame((_, dt) => {
    const g = group.current
    if (!g) return
    const k = 1 - Math.pow(0.002, dt)
    g.position.lerp(target.current, k)
    scaleTarget.current.setScalar(hovered ? 1.22 : 1)
    g.scale.lerp(scaleTarget.current, k)
  })

  return (
    <group ref={group} position={position}>
      <Billboard>
        {/* frame that lights up on hover */}
        <mesh position={[0, 0, -0.012]} renderOrder={hovered ? 2 : 0}>
          <planeGeometry args={[CARD_W + 0.07, CARD_H + 0.07]} />
          <meshBasicMaterial color={hovered ? '#3D6FD0' : '#243a63'} toneMapped={false} />
        </mesh>
        <mesh
          renderOrder={hovered ? 3 : 1}
          onClick={e => { e.stopPropagation(); onOpen() }}
          onPointerOver={e => { e.stopPropagation(); onHover(true) }}
          onPointerOut={() => onHover(false)}
        >
          <planeGeometry args={[CARD_W, CARD_H]} />
          <meshBasicMaterial map={tex} toneMapped={false} />
        </mesh>
        {hovered && (
          <Html center position={[0, -CARD_H / 2 - 0.34, 0]} style={{ pointerEvents: 'none' }} zIndexRange={[60, 40]}>
            <div className="orb-label">
              <b>{p.title}</b>
              <span>{p.tag}{p.status ? ` · ${statusLabel[p.status]}` : ''}</span>
              <em>Click to view case study</em>
            </div>
          </Html>
        )}
      </Billboard>
    </group>
  )
}

function Scene({ projects, onOpen }: { projects: { p: Project; i: number }[]; onOpen: (i: number) => void }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null)
  const controls = useRef<ComponentRef<typeof OrbitControls>>(null)
  const gl = useThree(s => s.gl)
  const positions = useMemo(() => spherePositions(projects.length, SPHERE_R), [projects.length])

  useEffect(() => {
    gl.domElement.style.cursor = hoveredIdx !== null ? 'pointer' : 'grab'
  }, [hoveredIdx, gl])

  useFrame(() => {
    if (controls.current) controls.current.autoRotate = hoveredIdx === null
  })

  return (
    <>
      <OrbitControls
        ref={controls}
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.9}
        rotateSpeed={0.55}
        dampingFactor={0.08}
      />
      <Stars radius={30} depth={22} count={900} factor={2.2} saturation={0} fade speed={0.6} />
      {/* wireframe core as a visual anchor */}
      <mesh>
        <icosahedronGeometry args={[1.05, 1]} />
        <meshBasicMaterial wireframe color="#3D6FD0" transparent opacity={0.22} toneMapped={false} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.55, 0]} />
        <meshBasicMaterial wireframe color="#7ea4e8" transparent opacity={0.35} toneMapped={false} />
      </mesh>
      {projects.map(({ p, i }, idx) => (
        <SphereCard
          key={p.mark}
          p={p}
          position={positions[idx]}
          hovered={hoveredIdx === i}
          onHover={over => setHoveredIdx(cur => (over ? i : cur === i ? null : cur))}
          onOpen={() => onOpen(i)}
        />
      ))}
    </>
  )
}

export default function ProjectSphere({ projects, onOpen }: { projects: { p: Project; i: number }[]; onOpen: (i: number) => void }) {
  return (
    <div className="stage">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 7], fov: 42 }} gl={{ antialias: true, alpha: true }}>
        <Scene projects={projects} onOpen={onOpen} />
      </Canvas>
      <div className="stage-hint">drag to orbit · hover a project · click to open</div>
    </div>
  )
}
