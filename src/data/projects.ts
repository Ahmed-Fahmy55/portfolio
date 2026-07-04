export const statusLabel: Record<string, string> = { deployed: 'Deployed', beta: 'In Beta' }

export interface Project {
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

export const PROJECTS: Project[] = [
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
