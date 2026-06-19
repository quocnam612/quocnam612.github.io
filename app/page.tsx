"use client";

import Image from "next/image";
import {
  type CSSProperties,
  type PointerEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type Project = {
  title: string;
  tag: "Web" | "Tools" | "Systems";
  description: string;
  stack: string[];
  signal: string;
};

type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "youtube" | "linkedin";
};

const projects: Project[] = [
  {
    title: "Portfolio OS",
    tag: "Web",
    description:
      "A fast personal site with animated sections, project filters, and a deploy pipeline for GitHub Pages.",
    stack: ["Next.js", "React", "TypeScript", "Tailwind"],
    signal: "Live",
  },
  {
    title: "Study Command Center",
    tag: "Tools",
    description:
      "A dashboard concept for deadlines, links, documents, and quick notes built around keyboard-first workflows.",
    stack: ["React", "Local state", "UX"],
    signal: "Prototype",
  },
  {
    title: "Linux Lab Notes",
    tag: "Systems",
    description:
      "A collection of setup notes, fixes, and experiments for Linux tooling, graphics, and developer environments.",
    stack: ["Linux", "Shell", "Docs"],
    signal: "Growing",
  },
];

const skills = [
  "React",
  "TypeScript",
  "Next.js",
  "CSS",
  "GitHub Pages",
  "Linux",
  "UI Design",
  "Automation",
];

const filters = ["All", "Web", "Tools", "Systems"] as const;

const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/quocnam612",
    icon: "github",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@quocnam612",
    icon: "youtube",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nam-nguy%E1%BB%85n-qu%E1%BB%91c-5765a8352",
    icon: "linkedin",
  },
];

function PixelIcon({ icon }: { icon: SocialLink["icon"] }) {
  if (icon === "youtube") {
    return (
      <svg className="pixel-icon" viewBox="0 0 16 16" aria-hidden="true">
        <rect x="2" y="4" width="12" height="8" />
        <rect x="3" y="3" width="10" height="1" />
        <rect x="3" y="12" width="10" height="1" />
        <rect className="pixel-cut" x="6" y="6" width="2" height="4" />
        <rect className="pixel-cut" x="8" y="7" width="2" height="2" />
        <rect className="pixel-cut" x="10" y="8" width="1" height="1" />
      </svg>
    );
  }

  if (icon === "linkedin") {
    return (
      <svg className="pixel-icon" viewBox="0 0 16 16" aria-hidden="true">
        <rect x="2" y="6" width="3" height="8" />
        <rect x="2" y="2" width="3" height="3" />
        <rect x="7" y="6" width="3" height="8" />
        <rect x="10" y="7" width="3" height="7" />
        <rect x="9" y="5" width="3" height="2" />
        <rect x="12" y="8" width="2" height="6" />
      </svg>
    );
  }

  return (
    <span className="pixel-icon i-pixelarticons-github" aria-hidden="true" />
  );
}

function EyeIcon() {
  return (
    <svg className="view-count-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 8h2v2H4zm2-2h4v2H6zm4 2h4v2h-4zm4-2h4v2h-4zm4 2h2v2h-2zM2 10h2v4H2zm18 0h2v4h-2zM4 14h2v2H4zm2 2h4v2H6zm4-2h4v2h-4zm4 2h4v2h-4zm4-2h2v2h-2zM10 10h4v4h-4z" />
    </svg>
  );
}

function softenSignedCameraAxis(value: number, strength = 1) {
  return value * value * value * strength;
}

function softenOffsetCameraAxis(value: number, strength = 1) {
  return Math.sign(value) * Math.abs(value) ** 1.65 * strength;
}

export default function Home() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const shellRef = useRef<HTMLElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const scrollTimerRef = useRef<number | null>(null);
  const scrollPausedRef = useRef(false);
  const latestCamera = useRef({ x: 0, y: 0 });
  const currentCamera = useRef({ x: 0, y: 0 });

  const visibleProjects = useMemo(() => {
    if (filter === "All") {
      return projects;
    }

    return projects.filter((project) => project.tag === filter);
  }, [filter]);

  function applyCamera() {
    const shell = shellRef.current;

    if (!shell) {
      frameRef.current = null;
      return;
    }

    const nextX =
      currentCamera.current.x +
      (latestCamera.current.x - currentCamera.current.x) * 0.14;
    const nextY =
      currentCamera.current.y +
      (latestCamera.current.y - currentCamera.current.y) * 0.14;
    const settled =
      Math.abs(nextX - latestCamera.current.x) < 0.002 &&
      Math.abs(nextY - latestCamera.current.y) < 0.002;

    currentCamera.current = { x: nextX, y: nextY };

    shell.style.setProperty("--camera-x", currentCamera.current.x.toFixed(5));
    shell.style.setProperty("--camera-y", currentCamera.current.y.toFixed(5));

    frameRef.current = settled ? null : requestAnimationFrame(applyCamera);
  }

  function scheduleCamera(x: number, y: number) {
    latestCamera.current = { x, y };

    if (frameRef.current === null) {
      frameRef.current = requestAnimationFrame(applyCamera);
    }
  }

  function pauseCameraForScroll() {
    scrollPausedRef.current = true;

    if (scrollTimerRef.current !== null) {
      window.clearTimeout(scrollTimerRef.current);
    }

    scrollTimerRef.current = window.setTimeout(() => {
      scrollPausedRef.current = false;
      scrollTimerRef.current = null;
    }, 220);
  }

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (scrollPausedRef.current) {
      return;
    }

    const x = softenSignedCameraAxis(
      (event.clientX / window.innerWidth - 0.5) * 2,
      1.25,
    );
    const y = softenOffsetCameraAxis(
      event.clientY / window.innerHeight - 0.12,
      0.85,
    );

    scheduleCamera(x, y);
  }

  useEffect(() => {
    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
      }

      if (scrollTimerRef.current !== null) {
        window.clearTimeout(scrollTimerRef.current);
      }
    };
  }, []);

  return (
    <main
      className="site-shell scanlines-on"
      onPointerMove={handlePointerMove}
      onPointerLeave={() => scheduleCamera(0, 0)}
      onTouchMove={pauseCameraForScroll}
      onWheel={pauseCameraForScroll}
      ref={shellRef}
    >
      <div className="ambient-grid" aria-hidden="true" />
      <div className="noise-field" aria-hidden="true" />

      <div className="camera-view">
        <nav className="topbar" aria-label="Main navigation">
          <div className="social-links" aria-label="Social links">
            {socialLinks.map((link) => (
              <a
                className={`social-link social-link-${link.icon}`}
                href={link.href}
                key={link.label}
                target="_blank"
                rel="noreferrer"
                aria-label={link.label}
                title={link.label}
              >
                <PixelIcon icon={link.icon} />
              </a>
            ))}
          </div>
          <div className="nav-links">
            <a href="/projects">Projects</a>
            <a href="/skills">Skills</a>
            <a href="/designs">Designs</a>
          </div>
        </nav>

        <section id="home" className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">signal unstable / builder online</p>
            <h1 className="glitch-title" data-text="Nguyen Quoc Nam">
              Nguyen Quoc Nam
            </h1>
            <p className="hero-text">
              Dark-mode developer portfolio with hacked-terminal motion,
              distorted signal layers, pixel art energy, and designs that lean
              into the weird.
            </p>
            <div className="hero-actions" aria-label="Primary actions">
              <a className="primary-action" href="#projects">
                View Projects
              </a>
              <span className="view-count" aria-label="612 views">
                <EyeIcon />
                <span>612</span>
              </span>
            </div>
          </div>

          <aside className="profile-panel" aria-label="Profile card">
            <div className="profile-avatar-wrap">
              <Image
                className="profile-avatar"
                src="/avatar.jpg"
                alt="Nguyen Quoc Nam avatar"
                width={256}
                height={256}
                priority
              />
              <span className="profile-status-bubble" aria-hidden="true">
                zZ
              </span>
            </div>

            <div className="profile-main">
              <h2>Nguyen Quoc Nam</h2>
              <p className="profile-handle">quocnam612 · cycle 100 ONI colony</p>
              <p className="profile-bio">procrastinating final boss</p>
              <a
                className="profile-button"
                href="mailto:nguyenquocnam612@gmail.com"
              >
                Contact
              </a>
            </div>

            <div className="profile-meta" aria-label="Profile details">
              <p>HCMUS · Thu Duc · UTC +07:00</p>
            </div>
          </aside>
        </section>

        <section id="projects" className="content-section">
          <div className="section-heading">
            <p className="eyebrow">Selected work</p>
            <h2 className="glitch-heading" data-text="Projects with signal">
              Projects with signal
            </h2>
          </div>

          <div className="segmented-control" aria-label="Filter projects">
            {filters.map((item) => (
              <button
                key={item}
                type="button"
                className={filter === item ? "active" : ""}
                onClick={() => setFilter(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="project-grid">
            {visibleProjects.map((project, index) => (
              <article
                className="project-card"
                key={project.title}
                style={{ "--card-index": index } as CSSProperties}
              >
                <div className="card-topline">
                  <span>{project.tag}</span>
                  <span>{project.signal}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="stack-list">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="content-section split-section">
          <div>
            <p className="eyebrow">Stack</p>
            <h2 className="glitch-heading" data-text="Things I can bend">
              Things I can bend into shape
            </h2>
          </div>
          <div className="skill-cloud" aria-label="Skills">
            {skills.map((skill) => (
              <span key={skill}>{skill}</span>
            ))}
          </div>
        </section>

        <section id="designs" className="content-section designs-section">
          <div>
            <p className="eyebrow">Designs</p>
            <h2 className="glitch-heading" data-text="Visual experiments">
              Visual experiments
            </h2>
          </div>
          <div className="terminal-window" aria-label="Design status log">
            <p>
              <span>$</span> load --gallery designs
            </p>
            <p>pixel profile system armed</p>
            <p>
              <span>$</span> filter --mode {filter.toLowerCase()} --theme{" "}
              discord-night
            </p>
            <p>interaction layer: full-camera / discord-night</p>
            <p>
              <span>$</span> render --vibe dark-glitch
              <span className="terminal-cursor" aria-hidden="true" />
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
