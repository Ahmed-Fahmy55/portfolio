import { createFileRoute } from '@tanstack/react-router'

import  { useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Github, Linkedin, Mail, Link as  Layers, Play } from "lucide-react";


const PROJECTS = [
  {
    id: "AsteraX",
    title: "AsteraX",
    role: "Fast-paced 2D space shooter",
    tags: ["Full Development"],
    href: "#",
    poster: "",
    video: "https://youtu.be/SjHiJ0OuiIM",
    category: "Games",
  },
  {
    id: "Zone-8 ",
    title: "Zone-8",
    role: "Top-down stealth game",
    tags: ["Full Development"],
    href: "#",
    poster: "",
    video: "https://youtu.be/5CpjykKFXpg",
    category: "Games",
  },
  {
    id: "Farm-Invaders",
    title: "Farm-Invaders",
    role: "2D top-down bullet hell ",
    tags: [ "Full Development"],
    href: "#",  
    poster: "",
    video: "https://youtu.be/Ulz9RGtLlPk",
    category: "Games",
  },
  {
    id: "Match Card",
    title: "Match Card",
    role: "3D card matching game",
    tags: ["Game Programing"],
    href: "#",
    poster: "",
    video: "https://youtu.be/0fW71K6Essg",
    category: "Games",
  },
  {
    id: "Competion Question Game",
    title: "Competion Question Game",
    role: "Tow Teams compete in answering questions",
    tags: ["Game Programing"],
    href: "#",
    poster: "",
    video: "https://youtu.be/NGKdIPN69Ac",
    category: "Games",
  },
  {
    id: "Saudi National day Game",
    title: "Saudi National day Question Game",
    role: "Simple question game to celebrate Saudi National day",
    tags: ["Game Programing"],
    href: "#",
    poster: "",
    video: "https://youtu.be/dsuoquBNkcY",
    category: "Games",
  },
  {
    id: "Golden Chemistry",
    title: "Golden Chemistry",
    role: "Chemistry learning app in VR",
    tags: ["Game Programming"],
    href: "#",
    poster: "",
    video: "https://youtu.be/tRU6C6511Kw",
    category: "VR",
  },
  {
    id: "Ozempic pen game",
    title: "Ozempic Pen",
    role: "Hack and slash VR game",
    tags: ["Game Programming"],
    href: "#",
    poster: "",
    video: "https://youtu.be/zbGZ2CTbEaQ",
    category: "VR",
  },
  {
    id: "360 VR Video Player",
    title: "360 Video Player",
    role: "Video player for 360 videos in VR",
    tags: ["Game Programing"],
    href: "#",
    poster: "",
    video: "https://youtu.be/dSqz7mr-RdU",
    category: "VR",
  },
  {
    id: "One Piece (Lv4 UH Universty Course )",
    title: "One Piece ",
    role: "Lv4 UH Universty Course Project",
    tags: ["Game Programing"],
    href: "#",
    poster: "",
    video: "https://youtu.be/4ZzcX1gLtis",
    category: "Teaching Sample",
  },
];

const TAGS = ["All", "VR", "Games", "Tools","Prototypes","Teaching Sample"] as const;

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
            Ahmed Fahmy
          </span>
        </a>
        <nav className="hidden items-center gap-2 md:flex">
          {[
            { id: "work", label: "Work" },
            { id: "about", label: "About" },
          ].map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              className="rounded-xl px-3 py-2 text-sm text-white/80 transition hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </a>
          ))}

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
          <span className="text-white/60 text-sm">Unity · C# · VR · AR . MR . 3D . 2D </span>
        </div>
        <h1 className="text-balance text-5xl font-black leading-[1.05] tracking-tight md:text-7xl">
          Crafting immersive <span className="bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-300 bg-clip-text text-transparent">XR experiences</span> and <span className="bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-300 bg-clip-text text-transparent">2D/3D Games.</span>
        </h1>
        <p className="max-w-2xl text-lg text-white/70">
          From quick prototypes to polished releases, I shape worlds that balance fun, usability, and performance.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <Button asChild className="rounded-2xl">
            <a href="#work"><Layers className="mr-2 h-4 w-4" /> View work</a>
          </Button>

          <a href="https://github.com/Ahmed-Fahmy55" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-4 py-2 text-sm text-white/80 hover:bg-white/5">
            <Github className="h-4 w-4" /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/ahmed-fahmy-4101231b4/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-4 py-2 text-sm text-white/80 hover:bg-white/5">
            <Linkedin className="h-4 w-4" /> LinkedIn
          </a>
        </div>
      </motion.div>
    </section>
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
        <h3 className="text-lg font-semibold text-indigo-400">{p.title}</h3>
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
              p.video.includes("youtube") || p.video.includes("youtu.be") ? (
                <iframe
                  className="h-full w-full object-cover"
                  src={`https://www.youtube.com/embed/${
                    p.video.includes("v=")
                      ? p.video.split("v=")[1].split("&")[0] // extract id from ?v=xxxx
                      : p.video.split("/").pop() // extract id from youtu.be/xxxx
                  }?autoplay=${hover ? 1 : 0}&mute=1&loop=1&playlist=${
                    p.video.includes("v=")
                      ? p.video.split("v=")[1].split("&")[0]
                      : p.video.split("/").pop()
                  }`}
                  title="YouTube video"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              ) : (
                <video className="h-full w-full object-cover" controls autoPlay={hover} muted loop playsInline poster={p.poster}>
    <source src={p.video} type="video/mp4" />
    Your browser does not support the video tag.
</video> 
              )
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.35),transparent_40%),radial-gradient(circle_at_70%_60%,rgba(16,185,129,0.35),transparent_40%)]" />
            )}

        </div>
        <div className="mt-3 flex items-center justify-between">
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
<div className="aspect-[2/3] overflow-hidden rounded-3xl border border-white/10">
  <img
    src="/myPhoto.jpg"   
    alt="Ahmed Fahmy"
    className="h-full w-full object-cover object-[center_20%]"
  />
</div>        </div>
        <div className="md:col-span-3">
          <h2 className="text-3xl font-bold">About</h2>
          <p className="mt-4 text-white/80">
            I’m a professional XR & Game developer. I’ve shipped XR experiences, gameplay systems, and tools used by teams. I teach 2D/3D/VR development and C# fundamentals as a TA, and I love turning complex systems into intuitive interactions.
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-white/70 sm:grid-cols-3">
            {[
              "Unity (URP/HDRP)",
              "VR / AR / MR",
              "2D/3D Game Development",
              "Physics / Animation",
              "Netcode / UGS",
              "C# / Design Patterns",
              "Optimization & Profiling",
              "Git / CI",
            ].map((s) => (
              <li key={s} className="rounded-xl border border-white/10 px-3 py-2">{s}</li>
            ))}
          </ul>
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
        </div>
      </div>
    </footer>
  );
}

export const Route = createFileRoute("/")({
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
      </main>
      <Footer />
    </div>
  )
}
