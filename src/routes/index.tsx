import { createFileRoute } from '@tanstack/react-router'

import  { useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Github, Linkedin, Mail, Link as LinkIcon, Layers, Play } from "lucide-react";

/**
 * Single-file React portfolio inspired by jayvanhutten.com
 * Styling: TailwindCSS + shadcn/ui, animations via Framer Motion
 * Notes:
 *  - Replace placeholder media (poster, video) under /public/assets/…
 *  - Update the PROJECTS array with your real work
 *  - This file exports a default component ready to render in any React app
 */

const PROJECTS = [
  {
    id: "vr-surgery",
    title: "VR Surgical Trainer",
    role: "Unity · XR Interaction Toolkit · Quest 2/3",
    tags: ["XR", "VR", "Unity"],
    href: "#",
    poster: "/assets/vr-surgery-poster.jpg",
    video: "/assets/vr-surgery.mp4",
    category: "XR",
  },
  {
    id: "fruit-slash",
    title: "Fruit Slash VR",
    role: "Gameplay · Physics · Haptics",
    tags: ["Game", "VR"],
    href: "#",
    poster: "/assets/fruit-slash-poster.jpg",
    video: "/assets/fruit-slash.mp4",
    category: "Games",
  },
  {
    id: "ugc-tools",
    title: "UGS Netcode Toolkit",
    role: "Scalable Host/Client Architecture",
    tags: ["Tools", "Netcode"],
    href: "#",
    poster: "/assets/ugs-toolkit-poster.jpg",
    video: "",
    category: "Tools",
  },
  {
    id: "ai-avatars",
    title: "AI Conversational Avatars",
    role: "Convai · WebGL · Three.js",
    tags: ["Web", "AI"],
    href: "#",
    poster: "/assets/ai-avatars-poster.jpg",
    video: "/assets/ai-avatars.mp4",
    category: "Web",
  },
  {
    id: "eye-tracker",
    title: "Eye Contact Evaluator",
    role: "C# · Analytics · Visualization",
    tags: ["Tools", "Analytics"],
    href: "#",
    poster: "/assets/eye-evaluator-poster.jpg",
    video: "",
    category: "Tools",
  },
];

const TAGS = ["All", "XR", "Games", "Tools", "Web"] as const;

function useParallax(value: any, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
}

function Header() {
  const { scrollYProgress } = useScroll();
  const blur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(6px)"]);
  const bg = useTransform(scrollYProgress, [0, 1], ["rgba(10,10,12,0.3)", "rgba(10,10,12,0.75)"]);

  return (
    <motion.header
      style={{ backdropFilter: blur, background: bg }}
      className="fixed inset-x-0 top-0 z-50 border-b border-white/10"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <a href="#home" className="group inline-flex items-center gap-2">
          <div className="h-7 w-7 rounded-xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-emerald-400" />
          <span className="text-sm font-semibold tracking-wide text-white/90 group-hover:text-white">
            ahmed mohammed fahmy
          </span>
        </a>
        <nav className="hidden items-center gap-2 md:flex">
          {[
            { id: "work", label: "Work" },
            { id: "about", label: "About" },
            { id: "contact", label: "Contact" },
          ].map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="rounded-xl px-3 py-2 text-sm text-white/80 transition hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </a>
          ))}
          <Button asChild variant="secondary" className="ml-2 rounded-2xl">
            <a href="#contact">Let’s talk</a>
          </Button>
        </nav>
      </div>
    </motion.header>
  );
}

function Hero() {
  const { scrollYProgress } = useScroll();
  const y = useParallax(scrollYProgress, 80);

  return (
    <section id="home" className="relative isolate flex min-h-[92vh] items-center overflow-hidden pt-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80rem_40rem_at_50%_-10%,rgba(99,102,241,0.25),rgba(10,10,12,0))]" />
      <motion.div style={{ y }} className="mx-auto flex max-w-7xl flex-col gap-8 px-4">
        <div className="inline-flex items-center gap-2">
          <Badge variant="secondary" className="rounded-full px-3 py-1">XR & Game Developer</Badge>
          <span className="text-white/60 text-sm">Unity · C# · VR · AR · WebGL</span>
        </div>
        <h1 className="text-balance text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">
          Crafting immersive <span className="bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-300 bg-clip-text text-transparent">XR experiences</span> and playful interfaces.
        </h1>
        <p className="max-w-2xl text-lg text-white/70">
          I build performant, human-centered 3D apps—from quick prototypes to shipped products. My work spans VR training, gameplay systems, and spatial UI.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild className="rounded-2xl">
            <a href="#work"><Layers className="mr-2 h-4 w-4" /> View work</a>
          </Button>
          <Button variant="outline" asChild className="rounded-2xl">
            <a href="#contact"><Mail className="mr-2 h-4 w-4" /> Contact</a>
          </Button>
          <a href="https://github.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-4 py-2 text-sm text-white/80 hover:bg-white/5">
            <Github className="h-4 w-4" /> GitHub
          </a>
          <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-4 py-2 text-sm text-white/80 hover:bg-white/5">
            <Linkedin className="h-4 w-4" /> LinkedIn
          </a>
        </div>
      </motion.div>
      <Marquee />
    </section>
  );
}

function Marquee() {
  // Simple CSS marquee line
  const words = [
    "Unity", "C#", "VR", "AR", "URP", "XR Interaction Toolkit", "Netcode", "UGS", "Framer Motion", "Three.js", "WebGL", "Convai", "Vuforia", "MRTK", "Oculus Quest",
  ];
  return (
    <div className="pointer-events-none absolute bottom-0 left-0 right-0 -mb-6 overflow-hidden">
      <div className="animate-[marquee_24s_linear_infinite] whitespace-nowrap border-y border-white/10 py-3 text-white/60 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        {Array(2)
          .fill(0)
          .map((_, i) => (
            <span key={i} className="mr-8">
              {words.map((w, idx) => (
                <span key={`${i}-${idx}`} className="mx-4 text-sm tracking-widest">
                  • {w}
                </span>
              ))}
            </span>
          ))}
      </div>
      <style>{`
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
      `}</style>
    </div>
  );
}

function ProjectCard({ p }: { p: (typeof PROJECTS)[number] }) {
  const [hover, setHover] = useState(false);
  const hasVideo = Boolean(p.video);

  return (
    <Card
      className="group relative overflow-hidden rounded-3xl border-white/10 bg-white/5 backdrop-blur hover:border-white/20"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <CardHeader className="z-10 flex flex-row items-center justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold">{p.title}</h3>
          <p className="text-sm text-white/70">{p.role}</p>
        </div>
        <div className="flex flex-wrap gap-1">
          {p.tags.map((t) => (
            <Badge key={t} variant="outline" className="rounded-full border-white/20 text-xs text-white/70">
              {t}
            </Badge>
          ))}
        </div>
      </CardHeader>
      <CardContent className="relative">
        <div className="aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10 bg-black/60">
          {hasVideo ? (
            <video
              className="h-full w-full object-cover"
              src={p.video}
              poster={p.poster}
              muted
              playsInline
              loop
              preload="metadata"
              autoPlay={hover}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.35),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(16,185,129,0.35),transparent_40%)]" />
          )}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <a href={p.href} className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white">
            <LinkIcon className="h-4 w-4" /> Case study
          </a>
          {hasVideo && (
            <span className="inline-flex items-center gap-1 text-xs text-white/60"><Play className="h-3.5 w-3.5" /> hover to play</span>
          )}
        </div>
      </CardContent>
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden>
        <div className="absolute -inset-16 bg-[conic-gradient(from_120deg_at_50%_50%,rgba(99,102,241,0.15),rgba(236,72,153,0.15),rgba(16,185,129,0.15),rgba(99,102,241,0.15))] blur-3xl" />
      </div>
    </Card>
  );
}

function Work() {
  const [active, setActive] = useState<(typeof TAGS)[number]>("All");
  const filtered = useMemo(
    () => (active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active)),
    [active]
  );

  return (
    <section id="work" className="relative mx-auto max-w-7xl px-4 py-20">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-3xl font-bold">Selected Work</h2>
        <div className="flex flex-wrap gap-2">
          {TAGS.map((t) => (
            <button
              key={t}
              onClick={() => setActive(t)}
              className={`rounded-2xl border px-3 py-1 text-sm transition ${
                active === t
                  ? "border-white/30 bg-white/10"
                  : "border-white/10 bg-transparent hover:bg-white/5"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {filtered.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <ProjectCard p={p} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-4 py-20">
      <div className="grid items-start gap-8 md:grid-cols-5">
        <div className="md:col-span-2">
          <div className="aspect-square overflow-hidden rounded-3xl border border-white/10 bg-[radial-gradient(60%_60%_at_50%_40%,rgba(236,72,153,0.25),transparent)]" />
        </div>
        <div className="md:col-span-3">
          <h2 className="text-3xl font-bold">About</h2>
          <p className="mt-4 text-white/80">
            I’m a professional XR & game developer focused on Unity, performance, and player experience. I’ve shipped VR training, gameplay systems, and tools used by teams. I teach 2D/3D/VR development and C# fundamentals as a TA, and I love turning complex systems into intuitive interactions.
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-white/70 sm:grid-cols-3">
            {[
              "Unity (URP/HDRP)",
              "XR Interaction Toolkit",
              "Netcode / UGS",
              "C# / Design Patterns",
              "Optimization & Profiling",
              "Three.js / WebGL",
              "Vuforia / MRTK",
              "Git / CI",
              "Teaching & Docs",
            ].map((s) => (
              <li key={s} className="rounded-xl border border-white/10 px-3 py-2">{s}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-4 py-20">
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 backdrop-blur">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-3xl font-bold">Let’s build something immersive</h2>
            <p className="mt-2 max-w-xl text-white/70">
              Tell me about your project, timeline, and goals. I’ll get back to you with ideas and a clear next step.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-2xl">
              <a href="mailto:ahmed@example.com"><Mail className="mr-2 h-4 w-4" /> Email me</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-2xl">
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer"><Linkedin className="mr-2 h-4 w-4" /> LinkedIn</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-4 pb-12 pt-6 text-sm text-white/60">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <p>© {new Date().getFullYear()} Ahmed M. Fahmy. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="#home" className="hover:text-white">Top</a>
          <a href="#work" className="hover:text-white">Work</a>
          <a href="#about" className="hover:text-white">About</a>
          <a href="#contact" className="hover:text-white">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="min-h-screen bg-[rgb(10,10,12)] text-white">
      <Header />
      <main>
        <Hero />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
