import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef, lazy, Suspense } from 'react'
import { PROJECTS, statusLabel } from '../data/projects'
import type { Project } from '../data/projects'

const ProjectSphere = lazy(() => import('../components/ProjectSphere'))

const ICON_PLAY = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
)
const ICON_DOC = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6M9 13h6M9 17h6" />
  </svg>
)
const ICON_MAIL = (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 6L2 7" />
  </svg>
)
const ICON_ARROW = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)
const ICON_SUN = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
)
const ICON_MOON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
)

function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  // Read the value the pre-paint script in __root already applied
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')
  }, [])

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.dataset.theme = next
    try { localStorage.setItem('theme', next) } catch { /* private mode */ }
  }

  return (
    <button className="theme-btn" onClick={toggle} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}>
      {theme === 'dark' ? ICON_SUN : ICON_MOON}
    </button>
  )
}


function Nav() {
  return (
    <header>
      <div className="container nav">
        <a className="brand" href="#top">
          <span className="logo">AF</span>
          Ahmed Fahmy
        </a>
        <nav className="navlinks">
          <a href="#work">Work</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a className="btn-cv" href="Ahmed_Fahmy_Resume.pdf" download>Download CV</a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <div className="container" id="top">
      <section className="hero">
        <div className="role-line">Unity Developer · XR &amp; Game Developer</div>
        <h1>Building immersive <em>XR</em> &amp; <em>2D/3D</em> games.</h1>
        <p className="lede">
          Unity developer with 3+ years architecting scalable core systems and shipping VR training and games
          across VR, AR, desktop, and WebGL — from quick prototypes to client-deployed products.
        </p>
        <div className="cta">
          <a className="primary" href="#work">View work {ICON_ARROW}</a>
          <a className="ghost" href="Ahmed_Fahmy_Resume.pdf" download>Download CV</a>
          <a className="ghost" href="https://github.com/Ahmed-Fahmy55" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a className="ghost" href="https://www.linkedin.com/in/ahmed-fahmy-4101231b4/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
        <div className="stats">
          <div className="stat"><b>{PROJECTS.length}</b><span>Projects built</span></div>
          <div className="stat"><b>{PROJECTS.filter(p => p.status === 'deployed').length}</b><span>Client deployments</span></div>
          <div className="stat"><b>{PROJECTS.filter(p => p.filter === 'VR').length}</b><span>VR titles</span></div>
          <div className="stat"><b>3+</b><span>Years in Unity</span></div>
        </div>
        <div className="divider" />
      </section>
    </div>
  )
}

function ProjectCard({ p, idx, onOpen }: { p: Project; idx: number; onOpen: (i: number) => void }) {
  const statusBadge = p.status ? (
    <span className={`badge-status status-${p.status}`}>
      <span className="dot-s" />{statusLabel[p.status]}
    </span>
  ) : null

  return (
    <article className="card" data-filter={p.filter}>
      <div className="media" onClick={() => onOpen(idx)}>
        <div
          className="poster"
          style={
            p.poster
              ? { backgroundImage: `url(${p.poster})`, backgroundSize: 'cover', backgroundPosition: 'center' }
              : p.video
                ? { backgroundImage: `url(https://img.youtube.com/vi/${p.video}/maxresdefault.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }
                : { background: p.grad }
          }
        >
          {!p.poster && !p.video && <span className="mark">{p.mark}</span>}
        </div>
        <div className="scrim" />
        <span className="badge-cat">{p.tag}</span>
        {statusBadge}
        {(p.video || p.localVideo) && (
          <button className="play" aria-label={`Open ${p.title} case study`}>
            {ICON_PLAY}
          </button>
        )}
      </div>
      <div className="body">
        <span className="role-pill">{p.role}</span>
        <h3 className="title">{p.title}</h3>
        <p className="desc">{p.desc}</p>
        <div className="chips">
          {p.chips.map(c => <span key={c} className="chip">{c}</span>)}
        </div>
        <div className="foot">
          <a className="lnk primary" href="#" onClick={e => { e.preventDefault(); onOpen(idx) }}>
            {ICON_DOC}View case study
          </a>
        </div>
      </div>
    </article>
  )
}

function Work({ onOpen }: { onOpen: (i: number) => void }) {
  const [active, setActive] = useState('all')
  const [view, setView] = useState<'orbit' | 'grid'>('grid')
  const [canvasReady, setCanvasReady] = useState(false)
  const filters = ['all', 'VR', 'Games', 'Teaching']
  const filtered = PROJECTS.map((p, i) => ({ p, i })).filter(({ p }) => active === 'all' || p.filter === active)

  // 3D orbit by default on desktop; grid on touch devices where drag fights scroll.
  // Also gates the WebGL canvas to the client — this app is server-rendered.
  useEffect(() => {
    setCanvasReady(true)
    if (!window.matchMedia('(pointer: coarse)').matches) setView('orbit')
  }, [])

  return (
    <div className="container">
      <section id="work">
        <p className="sec-eyebrow">Selected Work</p>
        <h2 className="sec-title">Projects, built and shipped.</h2>
        <div className="filters">
          {filters.map(f => (
            <button
              key={f}
              className={active === f ? 'active' : ''}
              onClick={() => setActive(f)}
            >
              {f === 'all' ? 'All' : f}
            </button>
          ))}
          <span className="filters-spacer" />
          <button className={view === 'orbit' ? 'active' : ''} onClick={() => setView('orbit')}>3D Orbit</button>
          <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')}>Grid</button>
        </div>
        {view === 'orbit' && canvasReady ? (
          <Suspense fallback={<div className="stage stage-loading">Loading scene…</div>}>
            <ProjectSphere projects={filtered} onOpen={onOpen} />
          </Suspense>
        ) : (
          <div className="grid">
            {filtered.map(({ p, i }) => (
              <ProjectCard key={p.mark} p={p} idx={i} onOpen={onOpen} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

function About() {
  return (
    <div className="container">
      <section id="about">
        <div className="about-wrap">
          <div className="about">
            <p className="sec-eyebrow">About</p>
            <h2 className="sec-title">XR &amp; game developer focused on systems and performance.</h2>
            <p>
              I specialize in creating immersive VR, AR, and MR experiences and 2D/3D games. I've shipped VR
              training simulations for healthcare and education and built a wide portfolio of games, with a focus
              on architecting reusable core systems and resolving performance bottlenecks through profiling. I'm
              comfortable collaborating asynchronously with distributed art, design, and engineering teams.
            </p>
          </div>
          <div className="skills">
            <h4>Toolbox</h4>
            <div className="skill-row"><b>Engine</b><span>Unity (URP/HDRP), Shader Graph, Animation, Audio</span></div>
            <div className="skill-row"><b>XR</b><span>OpenXR, XR Interaction Toolkit, Meta XR SDK</span></div>
            <div className="skill-row"><b>Networking</b><span>Netcode for GameObjects, Photon Fusion</span></div>
            <div className="skill-row"><b>Systems</b><span>Addressables / AssetBundles, Unity Gaming Services</span></div>
            <div className="skill-row"><b>Optimization</b><span>CPU/GPU profiling, memory management</span></div>
            <div className="skill-row"><b>Languages</b><span>C#, SQL, MySQL</span></div>
            <div className="skill-row"><b>Process</b><span>Git, CI, Agile / Scrum / Kanban</span></div>
          </div>
        </div>
      </section>
    </div>
  )
}

function Contact() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) el.classList.add('in') }),
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div className="container">
      <section id="contact">
        <div className="contact reveal" ref={ref}>
          <h3>Let's build something immersive.</h3>
          <p>Open to remote XR and game-development roles. The fastest way to reach me is email — or grab my CV below.</p>
          <div className="contact-actions">
            <a className="ca-mail" href="mailto:ahmedfahmydev55@gmail.com">
              {ICON_MAIL}ahmedfahmydev55@gmail.com
            </a>
            <a className="ca-ghost" href="Ahmed_Fahmy_Resume.pdf" download>Download CV</a>
            <a className="ca-ghost" href="https://www.linkedin.com/in/ahmed-fahmy-4101231b4/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="ca-ghost" href="https://github.com/Ahmed-Fahmy55" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </section>
    </div>
  )
}

function Modal({ idx, onClose }: { idx: number | null; onClose: () => void }) {
  const [playingVideo, setPlayingVideo] = useState(false)

  useEffect(() => {
    setPlayingVideo(false)
  }, [idx])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = idx !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [idx])

  if (idx === null) return null
  const p = PROJECTS[idx]
  const statusBadge = p.status ? (
    <span className={`badge-status status-${p.status}`}>
      <span className="dot-s" />{statusLabel[p.status]}
    </span>
  ) : null

  return (
    <div className="modal open" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="sheet">
        <div
          className="sheet-media"
          style={
            p.poster
              ? { backgroundImage: `url(${p.poster})`, backgroundSize: 'cover', backgroundPosition: 'center' }
              : p.video
                ? { backgroundImage: `url(https://img.youtube.com/vi/${p.video}/maxresdefault.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center' }
                : { background: p.grad }
          }
        >
          {playingVideo && (p.video || p.localVideo) ? (
            <>
              {p.localVideo ? (
                <video
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  src={p.localVideo}
                  poster={p.poster ?? undefined}
                  controls
                  autoPlay
                />
              ) : (
                <iframe
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
                  src={`https://www.youtube.com/embed/${p.video}?autoplay=1&rel=0`}
                  title="Demo"
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                />
              )}
              <button className="sheet-close" onClick={onClose} aria-label="Close">&times;</button>
            </>
          ) : (
            <>
              {!p.poster && !p.video && <span className="mark">{p.mark}</span>}
              <div className="sheet-badges">
                <span className="badge-cat">{p.tag}</span>
                {statusBadge}
              </div>
              <button className="sheet-close" onClick={onClose} aria-label="Close">&times;</button>
              {(p.video || p.localVideo)
                ? <button className="sheet-play" onClick={() => setPlayingVideo(true)} aria-label="Play demo">{ICON_PLAY}</button>
                : <span className="sheet-soon">Demo video coming soon</span>
              }
            </>
          )}
        </div>
        <div className="sheet-body">
          <h3>{p.title}</h3>
          <div className="sheet-sub">{p.role}</div>
          <div className="qa">
            <div>
              <div className="q">My Role</div>
              <div className="a">{p.role}</div>
            </div>
            <div>
              <div className="q">Tech Stack</div>
              <div className="a">
                {p.chips.map(c => <span key={c} className="chip">{c}</span>)}
              </div>
            </div>
            <div>
              <div className="q">The Challenge</div>
              <div className="a muted">{p.challenge}</div>
            </div>
            <div>
              <div className="q">Outcome</div>
              <div className="a muted">{p.outcome}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [openCase, setOpenCase] = useState<number | null>(null)

  return (
    <>
      <Nav />
      <Hero />
      <Work onOpen={setOpenCase} />
      <About />
      <Contact />
      <footer>© 2026 Ahmed M. Fahmy — Unity · XR · Game Development</footer>
      <Modal idx={openCase} onClose={() => setOpenCase(null)} />
    </>
  )
}
