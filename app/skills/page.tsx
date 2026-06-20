import Link from "next/link";
import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { CameraShell } from "../components/camera-shell";

const skillGroups = [
  {
    title: "Frontend & apps",
    signal: "interfaces / client builds",
    description:
      "Building responsive interfaces, portfolio pages, dashboards, and app screens from rough ideas into usable flows.",
    stack: ["React", "Next.js", "Tailwind CSS", "HTML", "CSS", "Flutter", "Dart"],
  },
  {
    title: "Backend & data",
    signal: "apis / storage / services",
    description:
      "Creating service layers, APIs, and data-backed features for websites, apps and course projects.",
    stack: ["Node.js", "Express", "FastAPI", "Crow", "MongoDB", "Firebase", "NoSQL", "Cloudinary", "REST APIs", "Oauth2"],
  },
  {
    title: "Systems & workflow",
    signal: "coursework / dev environment",
    description:
      "Comfortable with lower-level coursework, Linux customization, version control, and deployment workflows.",
    stack: ["C/C++", "C++23", "Docker", "Git", "Linux", "Bash", "GitHub Pages", "Render", "Vercel", "Netlify"],
  },
  {
    title: "Game & automation",
    signal: "experiments / tools",
    description:
      "Making games, bots, automation scripts, and small tools that solve personal or project-specific problems.",
    stack: ["Unity", "C#", "Puppeteer", "Browser automation", "Bots"],
  },
  {
    title: "Design & editing",
    signal: "visuals / motion",
    description:
      "Designing UI concepts, posters, presentation slides, and casual photo/video edits for projects and friends.",
    stack: ["Figma", "Photoshop", "After Effects", "Blender", "Canva", "UI/UX"],
  },
  {
    title: "Course foundation",
    signal: "foundation / theory",
    description:
      "Core Computer Science subjects that shape how I reason about implementation, tradeoffs, and problem solving.",
    stack: ["DSA", "OOP", "Computer Networks", "Databases", "Computer Architecture"],
  },
];

export const metadata: Metadata = {
  title: "Skills | NQN612",
  description: "Technical stack and tools used by Nguyen Quoc Nam.",
};

export default function SkillsPage() {
  return (
    <CameraShell className="route-shell">
      <section className="content-section route-page">
        <div className="route-header">
          <span className="route-back">/HOME/SKILLS</span>
          <Link className="route-home-button" href="/">
            Back home
          </Link>
        </div>
        <h1 className="glitch-heading" data-text="Skills">
          Skills
        </h1>
        <div className="skills-grid route-grid">
          {skillGroups.map((group, index) => (
            <article
              className="project-card skill-card"
              key={group.title}
              style={{ "--card-index": index } as CSSProperties}
            >
              <div className="card-topline">
                <span>{group.signal}</span>
                <span>0{index + 1}</span>
              </div>
              <h3>{group.title}</h3>
              <p>{group.description}</p>
              <div className="stack-list">
                {group.stack.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </CameraShell>
  );
}
