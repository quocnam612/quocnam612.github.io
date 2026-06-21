"use client";

import Image from "next/image";
import Link from "next/link";
import {
  type CSSProperties,
  useEffect,
  useState,
} from "react";
import {
  DesignToolIcon,
  EyeIcon,
  type DesignToolIconName,
} from "./components/icons";
import { SiteFooter } from "./components/site-footer";
import { SiteNav } from "./components/site-nav";
import { useCameraMotion } from "./components/use-camera-motion";
import { projects } from "./projects/projects-data";

const featuredProjects = projects.slice(0, 6);

const skills = [
  "React",
  "TypeScript",
  "Next.js",
  "Tailwind",
  "Flutter",
  "Dart",
  "Node.js",
  "Express",
  "Python",
  "FastAPI",
  "Docker",
  "C++23",
  "Crow",
  "CMake",
  "Unity",
  "C#",
  "MongoDB",
  "Puppeteer",
];

const designTools: Array<{
  name: string;
  icon: DesignToolIconName;
  description: string;
}> = [
  {
    name: "Blender",
    icon: "blender",
    description:
      "Completed the famous Blender donut tutorial, made cartoon-style models, and can modify free 3D assets to fit my needs.",
  },
  {
    name: "Photoshop",
    icon: "photoshop",
    description:
      "Used for poster design, asset cleanup for other design tools, and classic photo edits when a project needs it.",
  },
  {
    name: "AfterEffect",
    icon: "aftereffect",
    description:
      "Made presentation intros, even sold some, and I usually handle video edits for projects that need motion work. Some are on YouTube.",
  },
  {
    name: "Figma",
    icon: "figma",
    description:
      "Used to design UI/UX flows, app concepts, and web layouts before turning ideas into actual builds.",
  },
];

export default function Home() {
  const [viewCount, setViewCount] = useState("0");
  const {
    handlePointerLeave,
    handlePointerMove,
    pauseCameraForScroll,
    shellRef,
  } = useCameraMotion();

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

  return (
    <main
      className="site-shell scanlines-on"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onTouchMove={pauseCameraForScroll}
      onWheel={pauseCameraForScroll}
      ref={shellRef}
    >
      <div className="ambient-grid" aria-hidden="true" />
      <div className="noise-field" aria-hidden="true" />

      <div className="camera-view">
        <SiteNav />

        <section id="home" className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow" tabIndex={0}>
              chmod +x portfolio.sh
            </p>
            <h1 className="glitch-title" data-text="./portfolio" tabIndex={0}>
              ./portfolio
            </h1>
            <p className="hero-text">
              I&apos;m a sophomore CS student at Ho Chi Minh city University of
              Science working across frontend, backend, interface design,
              editing and light DevOps. I&apos;ve built games, bots, apps, and
              websites. I enjoy customizing things, experimenting with new
              tools, and turning rough ideas into polished projects.
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
            <div
              className="profile-avatar-wrap"
              tabIndex={0}
              aria-label="Nguyen Quoc Nam avatar"
            >
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
              <div className="profile-actions" aria-label="Profile actions">
                <a className="profile-button profile-button-cv" href="/cv.pdf">
                  See my CV
                </a>
                <a
                  className="profile-button profile-button-mail"
                  href="mailto:24120098@student.hcmus.edu.vn"
                  aria-label="Email Nguyen Quoc Nam"
                  title="Email"
                >
                  <span
                    className="profile-mail-icon i-pixelarticons-mail"
                    aria-hidden="true"
                  />
                  <span aria-hidden="true">&gt;</span>
                </a>
              </div>
            </div>

            <div className="profile-meta" aria-label="Profile details">
              <p>HCMUS · Thu Duc · UTC +07:00</p>
            </div>
          </aside>
        </section>

        <section id="skills" className="content-section split-section">
          <div>
            <p className="eyebrow" tabIndex={0}>
              Stack
            </p>
            <h2
              className="glitch-heading"
              data-text="Things I can bend"
              tabIndex={0}
            >
              Things I can bend into shape
            </h2>
          </div>
          <div className="skill-cloud" aria-label="Skills">
            {skills.map((skill) => (
              <span key={skill} tabIndex={0}>
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section id="projects" className="content-section projects-section">
          <div className="section-heading">
            <div>
              <p className="eyebrow" tabIndex={0}>
                Selected work
              </p>
              <h2
                className="glitch-heading section-title"
                data-text="Stuff I've made"
                tabIndex={0}
              >
                Stuff I&apos;ve made
              </h2>
            </div>
            <Link className="section-link-button" href="/projects">
              See all
            </Link>
          </div>

          <div className="project-grid">
            {featuredProjects.map((project, index) => (
              <Link
                aria-label={`Open ${project.title} project detail`}
                className="project-card"
                href={`/projects/${project.slug}`}
                key={project.title}
                style={{ "--card-index": index } as CSSProperties}
              >
                <div className="card-topline">
                  <span>{project.type}</span>
                  <span>#{index + 1}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="stack-list">
                  {project.stack.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section id="designs" className="content-section designs-section">
          <div>
            <p className="eyebrow" tabIndex={0}>
              Designs
            </p>
            <h2
              className="glitch-heading"
              data-text="Visual experiments"
              tabIndex={0}
            >
              Visual experiments
            </h2>
            <Link className="section-link-button designs-link-button" href="/designs">
              See designs
            </Link>
            <div className="design-tool-list" aria-label="Design apps">
              {designTools.map((tool) => (
                <button type="button" key={tool.name}>
                  <span className="design-tool-label">
                    <DesignToolIcon icon={tool.icon} />
                    {tool.name}
                  </span>
                  <span className="design-tool-description">
                    {tool.description}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </main>
  );
}
