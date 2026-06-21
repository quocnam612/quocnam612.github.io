import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CameraShell } from "../../components/camera-shell";
import { ProjectAlbum } from "../../components/project-album";
import { ProjectVideoFrame } from "../../components/project-video-frame";
import { projects } from "../projects-data";

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const echoesAssetsPath = "/images/projects/echoes-of-the-forest";
const echoesSourceUrl =
  "https://github.com/quocnam612/Survival-Multiplayer-Project-2.0";

const echoesSystems = [
  {
    title: "Player loop",
    description:
      "Movement, zoom, head tilt, respawn, stamina, hunger, health, combat, layered animations and Photon-synced networking.",
  },
  {
    title: "Inventory core",
    description:
      "Slot references, recipes, ingredient management, item sway/bob, hotbar equip/use, stack/split/drop/delete item, crafting, cooking and character view.",
  },
  {
    title: "Forest entities",
    description:
      "Cow AI, monster behavior, rigging, animations, and interaction zones.",
  },
  {
    title: "World polish",
    description:
      "Day-night lighting, destructible environment props, LODs, cached references, and VFX lighting.",
  },
];

const echoesShots = [
  {
    src: `${echoesAssetsPath}/pic9.png`,
    alt: "Echoes of the Forest start screen",
    caption: "Start screen",
    width: 1269,
    height: 716,
  },
  {
    src: `${echoesAssetsPath}/pic1.png`,
    alt: "Player character and survival UI",
    caption: "Survival HUD",
    width: 1387,
    height: 786,
  },
  {
    src: `${echoesAssetsPath}/pic4.png`,
    alt: "Cow entity in forest environment",
    caption: "Cow entity",
    width: 1389,
    height: 774,
  },
  {
    src: `${echoesAssetsPath}/pic5.png`,
    alt: "Forest area with cow entity",
    caption: "Forest route",
    width: 1685,
    height: 774,
  },
  {
    src: `${echoesAssetsPath}/pic6.png`,
    alt: "Forest gameplay with survival entities",
    caption: "Exploration",
    width: 1682,
    height: 772,
  },
  {
    src: `${echoesAssetsPath}/pic7.png`,
    alt: "Siren Head entity at night",
    caption: "Night threat",
    width: 1673,
    height: 780,
  },
  {
    src: `${echoesAssetsPath}/pic8.png`,
    alt: "Forest base and infrastructure",
    caption: "Forest base",
    width: 1662,
    height: 795,
  },
];

const echoesVideos = [
  {
    label: "Echoes of the Forest footage 1",
    poster: `${echoesAssetsPath}/pic9.png`,
    src: `${echoesAssetsPath}/footage2.mp4`,
  },
  {
    label: "Echoes of the Forest footage 2",
    poster: `${echoesAssetsPath}/pic1.png`,
    src: `${echoesAssetsPath}/footage1-loop.mp4`,
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
              See more projects
            </Link>
          </div>
        </div>

        <section className="case-hero">
          <div className="case-copy">
            <div className="case-title-block">
              <div className="case-title-row">
                <h1 className="glitch-heading" data-text="Echoes of the Forest">
                  Echoes of the Forest
                </h1>
                <a
                  className="case-source-button"
                  href={echoesSourceUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  PROJECT SOURCE →
                </a>
              </div>
              <div className="stack-list case-stack">
                {["Unity", "C#", "Photon PUN2"].map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>

            <p className="case-lede">
              My first Unity project, a survival game, inspired by Minecraft and The Forest. Started as a simple game project for a college course, but I decided to make it 3D and add multiplayer for some reasons. I put a lot of effort into it and was even gonna add procedural generation but I didn&apos;t have enough time. I learned a lot about Unity, C#, and game development from this.
            </p>

            <div className="case-detail-grid">
              <ProjectVideoFrame videos={echoesVideos} />
            </div>
          </div>
        </section>

        <section className="case-section">
          <div className="case-panel-heading">
            <h2 className="glitch-mini" data-text="What I built" tabIndex={0}>
              What I built
            </h2>
            <span>Project / Footage / Screenshots</span>
          </div>
          <div className="case-body-grid">
            <ProjectAlbum images={echoesShots} />
            <div className="case-system-grid">
              {echoesSystems.map((system) => (
                <article className="case-system-card" key={system.title} tabIndex={0}>
                  <h3>{system.title}</h3>
                  <p>{system.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      </section>
    </CameraShell>
  );
}
