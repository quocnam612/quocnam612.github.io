import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CameraShell } from "../../components/camera-shell";
import {
  ProjectAlbum,
  type ProjectAlbumImage,
} from "../../components/project-album";
import {
  ProjectVideoFrame,
  type ProjectVideo,
} from "../../components/project-video-frame";
import { projects } from "../projects-data";

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type ProjectSystem = {
  title: string;
  description: string;
};

type ProjectCaseStudy = {
  lede: string;
  shots: readonly ProjectAlbumImage[];
  slug: string;
  sourceUrl: string;
  stack: readonly string[];
  systems: readonly ProjectSystem[];
  title: string;
  videoPlaceholder: string;
  videos: readonly ProjectVideo[];
};

const echoesAssetsPath = "/images/projects/echoes-of-the-forest";
const tourxportAssetsPath = "/images/projects/tourxport";
const clavicularAssetsPath = "/images/projects/clavicular";
const wasteAssetsPath = "/images/projects/waste-management-system";

const projectCases: Record<string, ProjectCaseStudy> = {
  "echoes-of-the-forest": {
    slug: "echoes-of-the-forest",
    title: "Echoes of the Forest",
    sourceUrl:
      "https://github.com/quocnam612/Survival-Multiplayer-Project-2.0",
    stack: ["Unity", "C#", "Photon PUN2"],
    lede:
      "My first Unity project, a survival game, inspired by Minecraft and The Forest. Started as a simple game project for a college course, but I decided to make it 3D and add multiplayer for some reasons. I put a lot of effort into it and was even gonna add procedural generation but I didn't have enough time. I learned a lot about Unity, C#, and game development from this.",
    videoPlaceholder: "No project footage archived yet.",
    videos: [
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
    ],
    shots: [
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
    ],
    systems: [
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
    ],
  },
  tourxport: {
    slug: "tourxport",
    title: "TourXport",
    sourceUrl: "https://github.com/quocnam612/TourXport",
    stack: ["Flutter", "Node.js", "Express", "FastAPI", "MongoDB"],
    lede:
      "A cross-platform travel planning app that combines a Flutter client, Node/Express services, Python AI endpoints, and crawled location data to generate smarter trip plans across web, desktop, and mobile.",
    videoPlaceholder:
      "No TourXport footage archived yet. Screenshots from the web build are loaded below.",
    videos: [],
    shots: [
      {
        src: `${tourxportAssetsPath}/landing_page.png`,
        alt: "TourXport landing page",
        caption: "Landing page",
        width: 1919,
        height: 970,
      },
      {
        src: `${tourxportAssetsPath}/dashboard.png`,
        alt: "TourXport dashboard",
        caption: "Dashboard",
        width: 1919,
        height: 935,
      },
      {
        src: `${tourxportAssetsPath}/place_detail.png`,
        alt: "TourXport place detail screen",
        caption: "Place detail",
        width: 1919,
        height: 936,
      },
      {
        src: `${tourxportAssetsPath}/survey_result.png`,
        alt: "TourXport survey result screen",
        caption: "Survey result",
        width: 1919,
        height: 933,
      },
      {
        src: `${tourxportAssetsPath}/map_screen.png`,
        alt: "TourXport map screen",
        caption: "Map screen",
        width: 1919,
        height: 934,
      },
    ],
    systems: [
      {
        title: "Trip planner",
        description:
          "Turns survey inputs, budget, schedule and travel preferences into usable itinerary flows.",
      },
      {
        title: "Flutter client",
        description:
          "Shared UI across mobile, web, Linux and Windows builds with responsive screens for maps, details and dashboards.",
      },
      {
        title: "Service stack",
        description:
          "Node/Express handles account and app data while FastAPI carries heavier AI planning logic.",
      },
      {
        title: "Crawler data",
        description:
          "Location and place information is gathered from crawlers so the app can suggest richer destinations.",
      },
    ],
  },
  clavicular: {
    slug: "clavicular",
    title: "Clavicular",
    sourceUrl: "https://github.com/nguyendinhthienloc/Clavicular",
    stack: ["Flutter", "Three.js", "Node.js", "FastAPI", "AI APIs"],
    lede:
      "A hackathon medical triage prototype where users localize pain on an interactive 3D body model, describe symptoms, then receive AI-assisted guidance and nearby clinic routing through a split frontend, gateway, and AI service stack.",
    videoPlaceholder:
      "No Clavicular footage archived yet. Technical diagrams and triage references are shown below.",
    videos: [],
    shots: [
      {
        src: `${clavicularAssetsPath}/triage_example.png`,
        alt: "Clavicular triage example",
        caption: "Triage example",
        width: 1280,
        height: 899,
      },
      {
        src: `${clavicularAssetsPath}/arch_diagram.png`,
        alt: "Clavicular architecture diagram",
        caption: "Architecture",
        width: 1957,
        height: 2436,
      },
      {
        src: `${clavicularAssetsPath}/gantt_roadmap.png`,
        alt: "Clavicular hackathon roadmap",
        caption: "Roadmap",
        width: 2560,
        height: 1208,
      },
    ],
    systems: [
      {
        title: "3D body picker",
        description:
          "Interactive anatomical model workflow for selecting pain regions and communicating body-part context.",
      },
      {
        title: "AI triage",
        description:
          "FastAPI service coordinates diagnosis prompts, references, multilingual routing and structured responses.",
      },
      {
        title: "API gateway",
        description:
          "Node/Express gateway validates requests and shields frontend traffic from direct AI provider calls.",
      },
      {
        title: "Hackathon build",
        description:
          "Built as a focused team MVP for LotusHacks, with my work centered around optimized 3D model assets.",
      },
    ],
  },
  "waste-management-system": {
    slug: "waste-management-system",
    title: "Waste Management System",
    sourceUrl:
      "https://github.com/quocnam612/CSC10003-OOP-Waste-management-and-separation-system",
    stack: ["C++23", "Crow", "CMake", "Flutter", "MongoDB"],
    lede:
      "An OOP course project for managing waste collection and separation workflows, combining a C++ backend service, MongoDB storage, AI helper setup, and a Flutter desktop client.",
    videoPlaceholder:
      "No Waste Management footage archived yet. Static app assets are shown below.",
    videos: [],
    shots: [
      {
        src: `${wasteAssetsPath}/bg_pattern.png`,
        alt: "Waste Management System app pattern asset",
        caption: "App pattern",
        width: 1920,
        height: 1080,
      },
      {
        src: `${wasteAssetsPath}/icon_512.png`,
        alt: "Waste Management System app icon",
        caption: "App icon",
        width: 512,
        height: 512,
      },
    ],
    systems: [
      {
        title: "C++ backend",
        description:
          "C++23 service built with CMake, Crow, Asio, OpenSSL and MongoDB driver dependencies.",
      },
      {
        title: "Flutter client",
        description:
          "Desktop UI layer used to interact with the system and package the app for Windows or Linux.",
      },
      {
        title: "Data storage",
        description:
          "MongoDB-backed persistence for app data and route-oriented workflows.",
      },
      {
        title: "AI helper",
        description:
          "Local Ollama/Gemma setup for a green-route helper service during development.",
      },
    ],
  },
};

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

  const caseStudy = projectCases[project.slug];

  if (caseStudy) {
    return <ProjectCasePage caseStudy={caseStudy} />;
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
            <span className="terminal-prompt">@nqn612~$</span> inspect --project
            &quot;{project.title}&quot;
          </p>
          <p>
            status: collecting screenshots, notes, links, and suspiciously
            missing context.
          </p>
          <p>
            <span className="terminal-prompt">@nqn612~$</span> fallback
            --project-list
          </p>
          <p>try /projects for now. the real case file is still loading.</p>
          <p
            className="terminal-input-line"
            aria-label="Terminal prompt waiting for input"
          >
            <span className="terminal-prompt">@nqn612~$</span>
            <span className="terminal-cursor" aria-hidden="true" />
          </p>
        </div>
      </section>
    </CameraShell>
  );
}

function ProjectCasePage({ caseStudy }: { caseStudy: ProjectCaseStudy }) {
  return (
    <CameraShell className="route-shell">
      <section className="content-section route-page project-case-page">
        <div className="route-header">
          <span className="route-back">/HOME/PROJECTS/{caseStudy.slug}</span>
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
                <h1 className="glitch-heading" data-text={caseStudy.title}>
                  {caseStudy.title}
                </h1>
                <a
                  className="case-source-button"
                  href={caseStudy.sourceUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  PROJECT SOURCE →
                </a>
              </div>
              <div className="stack-list case-stack">
                {caseStudy.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>

            <p className="case-lede">{caseStudy.lede}</p>

            <div className="case-detail-grid">
              <ProjectVideoFrame
                placeholder={caseStudy.videoPlaceholder}
                videos={caseStudy.videos}
              />
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
            <ProjectAlbum images={caseStudy.shots} />
            <div className="case-system-grid">
              {caseStudy.systems.map((system) => (
                <article
                  className="case-system-card"
                  key={system.title}
                  tabIndex={0}
                >
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
