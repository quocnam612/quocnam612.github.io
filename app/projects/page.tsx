import Link from "next/link";
import type { CSSProperties } from "react";

const projects = [
  {
    title: "Portfolio OS",
    description:
      "Static Next.js portfolio with GitHub Pages deployment, dark glitch visuals, and interactive project filtering.",
    stack: ["Next.js", "React", "TypeScript", "GitHub Pages"],
  },
  {
    title: "Study Command Center",
    description:
      "Dashboard concept for deadlines, quick links, notes, and keyboard-first school workflows.",
    stack: ["React", "UX", "Local state"],
  },
  {
    title: "Linux Lab Notes",
    description:
      "Personal notes and experiments for Linux setups, graphics fixes, tooling, and developer environments.",
    stack: ["Linux", "Shell", "Docs"],
  },
];

export default function ProjectsPage() {
  return (
    <main className="site-shell scanlines-on route-shell">
      <div className="ambient-grid" aria-hidden="true" />
      <div className="noise-field" aria-hidden="true" />
      <section className="content-section route-page">
        <Link className="route-back" href="/">
          /home
        </Link>
        <p className="eyebrow">Projects</p>
        <h1 className="glitch-heading" data-text="Projects with signal">
          Projects with signal
        </h1>
        <div className="project-grid route-grid">
          {projects.map((project, index) => (
            <article
              className="project-card"
              key={project.title}
              style={{ "--card-index": index } as CSSProperties}
            >
              <div className="card-topline">
                <span>Project</span>
                <span>#{index + 1}</span>
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
    </main>
  );
}
