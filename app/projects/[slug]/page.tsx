import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CameraShell } from "../../components/camera-shell";
import { projects } from "../projects-data";

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const echoesAssetsPath = "/images/projects/echoes-of-the-forest";

const echoesStats = [
  ["Engine", "Unity"],
  ["Net", "Photon PUN2"],
  ["Code", "50+ C# scripts"],
  ["Build", "Windows"],
];

const echoesSystems = [
  {
    title: "Player loop",
    description:
      "Movement, zoom, respawn, stamina, hunger, health, combat, and Photon-synced animation.",
  },
  {
    title: "Inventory core",
    description:
      "Slot references, item lists, hotbar equip, stack/split/drop/delete, crafting, and cooking.",
  },
  {
    title: "Forest entities",
    description:
      "Cow AI, handmade rigs, Siren Head day patrol, night chase behavior, and interaction zones.",
  },
  {
    title: "World polish",
    description:
      "Day-night lighting, destructible environment props, LODs, cached references, and VFX lighting.",
  },
];

const echoesShots = [
  {
    src: `${echoesAssetsPath}/pic1.png`,
    alt: "Player character and survival UI",
    caption: "Survival HUD",
    width: 1387,
    height: 786,
  },
  {
    src: `${echoesAssetsPath}/pic2.png`,
    alt: "Cooking menu interface",
    caption: "Cooking menu",
    width: 1296,
    height: 875,
  },
  {
    src: `${echoesAssetsPath}/pic3.png`,
    alt: "Crafting menu interface",
    caption: "Crafting menu",
    width: 1136,
    height: 739,
  },
  {
    src: `${echoesAssetsPath}/pic7.png`,
    alt: "Siren Head entity at night",
    caption: "Night threat",
    width: 1673,
    height: 780,
  },
];

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Project | NQN612",
    };
  }

  return {
    title: `${project.title} | NQN612`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  if (project.slug === "echoes-of-the-forest") {
    return <EchoesProjectPage />;
  }

  return (
    <CameraShell className="route-shell">
      <section className="content-section route-page">
        <div className="route-header">
          <span className="route-back">/HOME/PROJECTS/{project.slug}</span>
          <Link className="route-home-button" href="/projects">
            Projects
          </Link>
        </div>
        <div
          className="terminal-window route-terminal"
          aria-label={`${project.title} project status`}
        >
          <p>
            <span className="terminal-prompt">@nqn612~$</span> open /projects/
            {project.slug}
          </p>
          <p>ERROR 503: project detail module is still under construction.</p>
          <p>
            <span className="terminal-prompt">@nqn612~$</span> inspect --project &quot;
            {project.title}&quot;
          </p>
          <p>
            status: collecting screenshots, notes, links, and suspiciously
            missing context.
          </p>
          <p>
            <span className="terminal-prompt">@nqn612~$</span> fallback --project-list
          </p>
          <p>try /projects for now. the real case file is still loading.</p>
          <p className="terminal-input-line" aria-label="Terminal prompt waiting for input">
            <span className="terminal-prompt">@nqn612~$</span>
            <span className="terminal-cursor" aria-hidden="true" />
          </p>
        </div>
      </section>
    </CameraShell>
  );
}

function EchoesProjectPage() {
  return (
    <CameraShell className="route-shell">
      <section className="content-section route-page project-case-page">
        <div className="route-header">
          <span className="route-back">/HOME/PROJECTS/echoes-of-the-forest</span>
          <div className="route-actions">
            <Link className="route-home-button" href="/projects">
              Projects
            </Link>
          </div>
        </div>

        <section className="case-hero">
          <div className="case-copy">
            <div className="case-title-row">
              <Image
                className="case-logo"
                src={`${echoesAssetsPath}/logo.png`}
                alt="Echoes of the Forest logo"
                width={130}
                height={135}
                priority
              />
              <p className="eyebrow" tabIndex={0}>
                Multiplayer survival prototype
              </p>
            </div>
            <h1 className="glitch-heading" data-text="Echoes of the Forest">
              Echoes of the Forest
            </h1>
            <p className="case-lede">
              Unity survival prototype with Photon multiplayer, a custom
              inventory/crafting loop, synced player animation, forest AI, and
              enough handmade fixes to make free assets behave.
            </p>
            <div className="stack-list case-stack">
              {["Unity", "C#", "Photon PUN2", "Blender", "Photoshop"].map(
                (item) => (
                  <span key={item}>{item}</span>
                ),
              )}
            </div>

            <div className="case-stat-grid">
              {echoesStats.map(([label, value]) => (
                <div className="case-stat" key={label}>
                  <span>{label}</span>
                  <strong>{value}</strong>
                </div>
              ))}
            </div>
          </div>
          <div className="case-hero-media">
            <video
              aria-label="Echoes of the Forest gameplay loop"
              autoPlay
              className="case-video"
              loop
              muted
              playsInline
              poster={`${echoesAssetsPath}/pic9.png`}
              preload="auto"
              src={`${echoesAssetsPath}/footage1-loop.mp4`}
            />
          </div>
        </section>

        <section className="case-section">
          <div className="case-panel-heading">
            <h2 className="glitch-mini" data-text="What I built">
              What I built
            </h2>
            <span>Unity / Photon / gameplay systems</span>
          </div>
          <div className="case-body-grid">
            <div className="case-system-grid">
              {echoesSystems.map((system) => (
                <article className="case-system-card" key={system.title}>
                  <h3>{system.title}</h3>
                  <p>{system.description}</p>
                </article>
              ))}
            </div>
            <div className="case-gallery">
              {echoesShots.map((shot) => (
                <figure className="case-shot" key={shot.src}>
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                  />
                  <figcaption>{shot.caption}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      </section>
    </CameraShell>
  );
}
