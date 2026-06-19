"use client";

import { useMemo, useState } from "react";

type Project = {
  title: string;
  tag: "Web" | "Tools" | "Systems";
  description: string;
  stack: string[];
  signal: string;
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
const accents = [
  { name: "Cyan", value: "#22d3ee" },
  { name: "Lime", value: "#a3e635" },
  { name: "Rose", value: "#fb7185" },
];

export default function Home() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [accent, setAccent] = useState(accents[0]);
  const [scanlines, setScanlines] = useState(true);
  const [boost, setBoost] = useState(false);

  const visibleProjects = useMemo(() => {
    if (filter === "All") {
      return projects;
    }

    return projects.filter((project) => project.tag === filter);
  }, [filter]);

  return (
    <main
      className={`site-shell ${scanlines ? "scanlines-on" : ""} ${
        boost ? "boost-on" : ""
      }`}
      style={{ "--accent": accent.value } as React.CSSProperties}
    >
      <div className="ambient-grid" aria-hidden="true" />
      <div className="noise-field" aria-hidden="true" />

      <nav className="topbar" aria-label="Main navigation">
        <a
          href="#home"
          className="brand-mark glitch-mini"
          data-text="NQN"
          aria-label="Go to hero"
        >
          NQN
        </a>
        <div className="nav-links">
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#lab">Lab</a>
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
            distorted signal layers, and controls you can actually mess with.
          </p>
          <div className="hero-actions" aria-label="Primary actions">
            <a className="primary-action" href="#projects">
              View Projects
            </a>
            <a className="secondary-action" href="mailto:nguyenquocnam612@gmail.com">
              Contact
            </a>
          </div>
        </div>

        <div className="signal-panel" aria-label="Interactive site controls">
          <div className="panel-header">
            <span className="glitch-mini" data-text="control.deck">
              control.deck
            </span>
            <span className="pulse-dot" aria-hidden="true" />
          </div>

          <div className="corrupt-readout" aria-hidden="true">
            <span>0xNQN</span>
            <span>packet_loss: 03%</span>
            <span>visual_noise: armed</span>
          </div>

          <div className="meter-grid" aria-hidden="true">
            {Array.from({ length: 36 }, (_, index) => (
              <span
                key={index}
                style={{ animationDelay: `${(index % 9) * 90}ms` }}
              />
            ))}
          </div>

          <div className="control-group" aria-label="Accent color">
            <p>Accent</p>
            <div className="swatches">
              {accents.map((item) => (
                <button
                  key={item.name}
                  className={accent.name === item.name ? "active" : ""}
                  type="button"
                  onClick={() => setAccent(item)}
                  style={{ "--swatch": item.value } as React.CSSProperties}
                  aria-label={`Use ${item.name} accent`}
                  title={`Use ${item.name} accent`}
                />
              ))}
            </div>
          </div>

          <div className="toggle-row">
            <label>
              <input
                type="checkbox"
                checked={scanlines}
                onChange={(event) => setScanlines(event.target.checked)}
              />
              Scanlines
            </label>
            <label>
              <input
                type="checkbox"
                checked={boost}
                onChange={(event) => setBoost(event.target.checked)}
              />
              Distort
            </label>
          </div>
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
              style={{ "--card-index": index } as React.CSSProperties}
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

      <section id="lab" className="content-section lab-section">
        <div>
          <p className="eyebrow">Playground</p>
          <h2 className="glitch-heading" data-text="Current console output">
            Current console output
          </h2>
        </div>
        <div className="terminal-window" aria-label="Portfolio status log">
          <p>
            <span>$</span> pnpm build
          </p>
          <p>compiled static portfolio for github pages</p>
          <p>
            <span>$</span> filter --mode {filter.toLowerCase()} --accent{" "}
            {accent.name.toLowerCase()}
          </p>
          <p>
            interaction layer: {scanlines ? "scanlines" : "clean"} /{" "}
            {boost ? "distorted" : "steady"}
          </p>
          <p>
            <span>$</span> render --vibe dark-glitch
            <span className="terminal-cursor" aria-hidden="true" />
          </p>
        </div>
      </section>
    </main>
  );
}
