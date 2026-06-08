import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'

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

const statusLabel: Record<string, string> = { deployed: 'Deployed', beta: 'In Beta' }

interface Project {
  mark: string
  cat: string
  tag: string
  filter: string
  role: string
  status: string | null
  title: string
  grad: string
  desc: string
  chips: string[]
  video: string | null       // YouTube video ID
  localVideo: string | null  // path to local video in /public
  poster: string | null      // path to local poster image in /public
  repo: string | null
  challenge: string
  outcome: string
}

const PROJECTS: Project[] = [
  {
    mark: 'BLS', cat: 'VR', tag: 'VR · Medical', filter: 'VR', role: 'Lead Programmer', status: 'deployed',
    title: 'BLS VR Training', grad: 'linear-gradient(135deg,#1f3864,#2e5aac)',
    desc: 'Basic Life Support medical-training simulation in VR. Built the interaction framework and training-flow sequencing in Unity, designed for reuse across titles. Shipped and deployed to clients at Merse.',
    chips: ['Unity', 'OpenXR', 'Meta XR SDK', 'XR Interaction Toolkit'], video: null, localVideo: '/BLS.mp4', poster: '/BLS_Poster.png', repo: '#',
    challenge: 'Make clinical steps feel intuitive in VR while keeping the training flow strict enough to assess correctly — and build it as a reusable framework, not a one-off.',
    outcome: 'Shipped and deployed to real clients at Merse; the interaction and sequencing systems were reused to cut development time on later titles.',
  },
  {
    mark: 'PLT', cat: 'Games', tag: 'Platform · Mini Games', filter: 'Games', role: 'Lead Programmer', status: 'beta',
    title: 'Configurable Mini-Game Platform', grad: 'linear-gradient(135deg,#2e5aac,#5a3db0)',
    desc: 'Client-facing platform to pick mini-games and fully customize theme, content, and data. Architecting the modular core and a data-driven config layer so each deployment is reskinnable without code changes. In beta at Bltzo.',
    chips: ['Unity', 'C#', 'Addressables/Asset Bundles', 'Netcode for GameObjects'], video: null, localVideo: null, poster: null, repo: null,
    challenge: 'Let non-technical clients fully reskin theme, content, and data without touching code, which required a strict, data-driven architecture and clean separation of content from logic.',
    outcome: 'Currently in beta at Bltzo; each client deployment is now a configuration rather than a rebuild.',
  },
  {
    mark: 'PHY', cat: 'VR', tag: 'VR · Education', filter: 'VR', role: 'Gameplay Programming', status: 'deployed',
    title: 'Physics Lab VR', grad: 'linear-gradient(135deg,#155e63,#1f8a5b)',
    desc: 'Immersive VR physics-learning app where students run experiments hands-on. Built the simulation and interaction systems, tuned for stable performance on standalone headsets. Shipped to clients at Bright Vision.',
    chips: ['Unity', 'OpenXR','Interaction Toolkit', 'Physics', 'C#'], video: 'us8AuH3yriI', localVideo: null, poster: null, repo: '#',
    challenge: 'Simulate physics experiments interactively while holding a stable frame rate on standalone headsets with limited GPU budget.',
    outcome: 'Shipped and deployed to clients at Bright Vision.',
  },
  {
    mark: 'GC', cat: 'VR', tag: 'VR · Education', filter: 'VR', role: 'Gameplay Programming', status: null,
    title: 'Golden Chemistry', grad: 'linear-gradient(135deg,#9a6a12,#c77b1a)',
    desc: 'VR chemistry-learning app — my graduation project at ITI. Designed interactive lab experiences that make abstract chemistry tangible in 3D space.',
    chips: ['Unity', 'OpenXR','Interaction Toolkit', 'C#'], video: 'tRU6C6511Kw', localVideo: null, poster: null, repo: '#',
    challenge: 'Turn abstract chemistry concepts into tangible, manipulable 3D interactions that teach effectively.',
    outcome: 'Completed as my graduation project at ITI.',
  },
  {
    mark: 'OZ', cat: 'VR', tag: 'VR · Game', filter: 'VR', role: 'Lead Programmer', status: 'deployed',
    title: 'Ozempic Pen', grad: 'linear-gradient(135deg,#1f4a3a,#2e8a6b)',
    desc: 'Hack-and-slash VR game built in Unity. Developed combat mechanics and player interactions for an engaging VR action experience.',
    chips: ['Unity', 'VR', 'C#', 'Meta XR SDK'], video: 'zbGZ2CTbEaQ', localVideo: null, poster: null, repo: '#',
    challenge: 'Design satisfying melee combat that feels physical and responsive within VR constraints.',
    outcome: 'Shipped as a complete VR game experience.',
  },
  {
    mark: 'KC', cat: 'Games', tag: '3D · Co-op', filter: 'Games', role: 'Solo Developer', status: null,
    title: 'Kitchen Chaos', grad: 'linear-gradient(135deg,#7a3b1f,#b5541f)',
    desc: 'Cooperative 3D kitchen game where players race to prep and plate orders together. Built the full gameplay loop, state-driven cooking stations, and multiplayer sync.',
    chips: ['Unity', 'Netcode for GameObjects', 'C#'], video: '3_pYFQyDzGw', localVideo: null, poster: null, repo: '#',
    challenge: 'Coordinate state across cooking stations and keep cooperative play in sync across clients.',
    outcome: 'A focused, completed study in clean architecture and networked gameplay.',
  },
  {
    mark: 'AX', cat: 'Games', tag: '2D · Arcade', filter: 'Games', role: 'Solo Developer', status: null,
    title: 'AsteraX', grad: 'linear-gradient(135deg,#1b2a4a,#345083)',
    desc: 'Fast-paced 2D space shooter. Full development across gameplay, game feel, and progression.',
    chips: ['Unity', '2D', 'C#'], video: 'SjHiJ0OuiIM', localVideo: null, poster: null, repo: '#',
    challenge: 'Tune game feel — responsive controls, juice, and difficulty pacing — in a classic arcade loop.',
    outcome: 'Built end-to-end as a solo project.',
  },
  {
    mark: 'Z8', cat: 'Games', tag: 'Top-down · Stealth', filter: 'Games', role: 'Solo Developer', status: null,
    title: 'Zone-8', grad: 'linear-gradient(135deg,#23303f,#3d5a6b)',
    desc: 'Top-down stealth game with enemy detection and patrol AI. Full development — systems, levels, and mechanics.',
    chips: ['Unity', 'AI', 'C#'], video: '5CpjykKFXpg', localVideo: null, poster: null, repo: '#',
    challenge: 'Build believable enemy detection and patrol AI that makes stealth feel fair and readable.',
    outcome: 'A complete top-down stealth game built solo.',
  },
  {
    mark: 'MG', cat: 'Games', tag: '2D · Puzzle', filter: 'Games', role: 'Solo Developer', status: null,
    title: 'Memory Glitch', grad: 'linear-gradient(135deg,#3a1f5a,#6a3db0)',
    desc: 'Sci-fi glitchy card-matching game. Full development with custom shader-driven visual effects.',
    chips: ['Unity', 'Shader Graph', 'C#'], video: '0-K8m4zf0vY', localVideo: null, poster: null, repo: '#',
    challenge: 'Drive the sci-fi glitch aesthetic with custom shaders without hurting card readability.',
    outcome: 'Full development including the shader-driven visual effects.',
  },
  {
    mark: 'TW', cat: 'Games', tag: '3D · Competitive', filter: 'Games', role: 'Solo Developer', status: null,
    title: 'Tank War', grad: 'linear-gradient(135deg,#3f4a23,#6b7a3d)',
    desc: 'Competitive 3D tank battle. Built the full gameplay, controls, and combat systems.',
    chips: ['Unity', '3D', 'C#', 'Netcode for GameObjects'], video: 'dLxWG47LB00', localVideo: null, poster: null, repo: '#',
    challenge: 'Balance competitive 3D combat and controls so matches feel fair and fun.',
    outcome: 'Full gameplay and combat systems built solo.',
  },
  {
    mark: 'FI', cat: 'Games', tag: '2D · Bullet Hell', filter: 'Games', role: 'Solo Developer', status: null,
    title: 'Farm-Invaders', grad: 'linear-gradient(135deg,#5a3d1f,#a06a2e)',
    desc: '2D top-down bullet hell. Full development — wave spawning, attack patterns, and scoring.',
    chips: ['Unity', '2D', 'C#'], video: 'Ulz9RGtLlPk', localVideo: null, poster: null, repo: '#',
    challenge: 'Design wave spawning and bullet patterns that scale smoothly in difficulty.',
    outcome: 'A complete 2D bullet-hell loop with scoring.',
  },
  {
    mark: 'CQ', cat: 'Teaching', tag: 'Quiz · Customizable', filter: 'Teaching', role: 'Lead Programmer', status: null,
    title: 'Competition Question Game', grad: 'linear-gradient(135deg,#1f5d4c,#2e8a73)',
    desc: 'Two teams compete to answer questions in a customizable quiz game built as a teaching sample.',
    chips: ['Unity', 'C#'], video: 'NGKdIPN69Ac', localVideo: null, poster: null, repo: '#',
    challenge: 'Make the quiz fully customizable so questions and content can be swapped per session.',
    outcome: 'Built as a reusable teaching sample.',
  },
  {
    mark: 'OP', cat: 'Teaching', tag: 'Course Project', filter: 'Teaching', role: 'Lead Programmer', status: null,
    title: 'One Piece', grad: 'linear-gradient(135deg,#2a3550,#46618f)',
    desc: 'A Level 4 University of Hertfordshire course project demonstrating core Unity gameplay concepts.',
    chips: ['Unity', 'C#'], video: '4ZzcX1gLtis', localVideo: null, poster: null, repo: '#',
    challenge: 'Demonstrate core Unity gameplay concepts clearly for a Level 4 course.',
    outcome: 'Completed for a University of Hertfordshire course.',
  },
]

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
  const filters = ['all', 'VR', 'Games', 'Teaching']
  const filtered = PROJECTS.map((p, i) => ({ p, i })).filter(({ p }) => active === 'all' || p.filter === active)

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
        </div>
        <div className="grid">
          {filtered.map(({ p, i }) => (
            <ProjectCard key={p.mark} p={p} idx={i} onOpen={onOpen} />
          ))}
        </div>
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
