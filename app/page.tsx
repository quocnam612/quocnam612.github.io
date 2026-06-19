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
      <svg className="pixel-icon" viewBox="0 0 1200 1200" aria-hidden="true">
        <path d="M1200 1055.438H0V144.562h1200zm-772.708-189.34l419.616-263.539l-419.616-263.54z" />
      </svg>
    );
  }

  if (icon === "linkedin") {
    return (
      <svg className="pixel-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19.959 11.719v7.379h-4.278v-6.885c0-1.73-.619-2.91-2.167-2.91c-1.182 0-1.886.796-2.195 1.565c-.113.275-.142.658-.142 1.043v7.187h-4.28s.058-11.66 0-12.869h4.28v1.824l-.028.042h.028v-.042c.568-.875 1.583-2.126 3.856-2.126c2.815 0 4.926 1.84 4.926 5.792M2.421.026C.958.026 0 .986 0 2.249c0 1.235.93 2.224 2.365 2.224h.028c1.493 0 2.42-.989 2.42-2.224C4.787.986 3.887.026 2.422.026zM.254 19.098h4.278V6.229H.254z" />
      </svg>
    );
  }

  return (
    <span className="pixel-icon i-pixelarticons-github" aria-hidden="true" />
  );
}

function EyeIcon() {
  return <span className="view-count-icon i-pixelarticons-eye" aria-hidden="true" />;
}

function softenSignedCameraAxis(value: number, strength = 1) {
  return value * value * value * strength;
}

function softenOffsetCameraAxis(value: number, strength = 1) {
  return Math.sign(value) * Math.abs(value) ** 1.65 * strength;
}

export default function Home() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [viewCount, setViewCount] = useState("0");
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
    let ignore = false;

    async function loadViewCount() {
      try {
        const response = await fetch(
          "https://quocnam612.goatcounter.com/counter/TOTAL.json",
          { cache: "no-store" },
        );

        if (!response.ok) {
          return;
        }

        const data = (await response.json()) as { count?: string };

        if (!ignore && data.count) {
          setViewCount(data.count);
        }
      } catch {
        // Keep the static fallback if GoatCounter is blocked or unavailable.
      }
    }

    loadViewCount();

    return () => {
      ignore = true;
    };
  }, []);

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
              <span className="view-count" aria-label={`${viewCount} views`}>
                <EyeIcon />
                <span>{viewCount}</span>
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
                href="mailto:24120098@student.hcmus.edu.vn"
              >
                Contact
              </a>
            </div>

            <div className="profile-meta" aria-label="Profile details">
              <p>HCMUS · Thu Duc · UTC +07:00</p>
            </div>
          </aside>
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
