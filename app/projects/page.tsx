import Link from "next/link";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { CameraShell } from "../components/camera-shell";
import { projects } from "./projects-data";

export const metadata: Metadata = {
  title: "Projects | NQN612",
  description: "Project archive for Nguyen Quoc Nam's portfolio.",
};

export default function ProjectsPage() {
  return (
    <CameraShell className="route-shell">
      <section className="content-section route-page">
        <div className="route-header">
          <span className="route-back">/HOME/PROJECTS</span>
        </div>
        <h1 className="glitch-heading" data-text="Projects">
          Projects
        </h1>
        <div className="project-grid route-grid route-card-grid">
          {projects.map((project, index) => (
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
    </CameraShell>
  );
}
