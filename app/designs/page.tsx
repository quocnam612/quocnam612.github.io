import Link from "next/link";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { CameraShell } from "../components/camera-shell";
import { designs } from "./designs-data";

export const metadata: Metadata = {
  title: "Designs | NQN612",
  description: "Design tools and visual experiments by Nguyen Quoc Nam.",
};

export default function DesignsPage() {
  return (
    <CameraShell className="route-shell">
      <section className="content-section route-page designs-section">
        <div>
          <div className="route-header">
            <span className="route-back">/HOME/DESIGNS</span>
          </div>
          <h1 className="glitch-heading" data-text="Designs">
            Designs
          </h1>
        </div>
        <div className="project-grid route-grid route-card-grid designs-grid">
          {designs.map((design, index) => (
            <Link
              aria-label={`Open ${design.title} design detail`}
              className="project-card design-card"
              href={`/designs/${design.slug}`}
              key={design.title}
              style={{ "--card-index": index } as CSSProperties}
            >
              <div className="card-topline">
                <span>{design.type}</span>
                <span>#{index + 1}</span>
              </div>
              <h3>{design.title}</h3>
              <p>{design.description}</p>
              <div className="stack-list">
                {design.tools.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </CameraShell>
  );
}
