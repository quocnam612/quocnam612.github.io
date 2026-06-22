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

const tourxportShotHeights = [
  897, 897, 897, 897, 897, 898, 897, 897, 899, 899, 896, 898, 897, 896, 898,
  897, 897, 894, 896, 898, 897, 898, 897, 900, 900, 900,
] as const;

const tourxportShots: ProjectAlbumImage[] = tourxportShotHeights.map(
  (height, index) => ({
    src: `${tourxportAssetsPath}/pic${index + 1}.webp`,
    alt: `TourXport screenshot ${index + 1}`,
    caption: `Screen ${index + 1}`,
    width: 1600,
    height,
  }),
);

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
        poster: `${echoesAssetsPath}/pic9.webp`,
        src: `${echoesAssetsPath}/footage2-optimized.mp4`,
      },
      {
        label: "Echoes of the Forest footage 2",
        poster: `${echoesAssetsPath}/pic1.webp`,
        src: `${echoesAssetsPath}/footage1-loop-optimized.mp4`,
      },
    ],
    shots: [
      {
        src: `${echoesAssetsPath}/pic9.webp`,
        alt: "Echoes of the Forest start screen",
        caption: "Start screen",
        width: 1269,
        height: 716,
      },
      {
        src: `${echoesAssetsPath}/pic1.webp`,
        alt: "Player character and survival UI",
        caption: "Survival HUD",
        width: 1387,
        height: 786,
      },
      {
        src: `${echoesAssetsPath}/pic4.webp`,
        alt: "Cow entity in forest environment",
        caption: "Cow entity",
        width: 1389,
        height: 774,
      },
      {
        src: `${echoesAssetsPath}/pic5.webp`,
        alt: "Forest area with cow entity",
        caption: "Forest route",
        width: 1600,
        height: 735,
      },
      {
        src: `${echoesAssetsPath}/pic6.webp`,
        alt: "Forest gameplay with survival entities",
        caption: "Exploration",
        width: 1600,
        height: 734,
      },
      {
        src: `${echoesAssetsPath}/pic7.webp`,
        alt: "Siren Head entity at night",
        caption: "Night threat",
        width: 1600,
        height: 746,
      },
      {
        src: `${echoesAssetsPath}/pic8.webp`,
        alt: "Forest base and infrastructure",
        caption: "Forest base",
        width: 1600,
        height: 765,
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
      "A travel planning app that turns user preferences and constraints into AI-generated itineraries. I made most of the backend, some frontend and handled data collection and deployment. The project uses a lot of external APIs and services, all of the dataset was collected through web scraping and API integrations. It's also my first time working with Oauth2 and deploying a full stack app to the cloud, so it was a great learning experience.",
    videoPlaceholder:
      "No TourXport footage archived yet. Screenshots from the web build are loaded below.",
    videos: [
      {
        label: "TourXport walkthrough 1",
        poster: `${tourxportAssetsPath}/pic1.webp`,
        src: `${tourxportAssetsPath}/video1.mp4`,
      },
      {
        label: "TourXport walkthrough 2",
        poster: `${tourxportAssetsPath}/pic13.webp`,
        src: `${tourxportAssetsPath}/video2.mp4`,
      },
    ],
    shots: tourxportShots,
    systems: [
      {
        title: "Backend",
        description:
          "Built the main backend: authentication, OAuth flows, external API integration, frontend connection points, AI-backend bridge, core logic and design MongoDB schemas.",
      },
      {
        title: "Data pipeline",
        description:
          "Scraped, cleaned and reformatted 20k+ locations with their images so the app has a rich dataset to work with.",
      },
      {
        title: "Devops",
        description:
          "Set up the project environment, deployment flow, cloud services, production configuration and release builds across supported platforms.",
      },
      {
        title: "Frontend",
        description:
          "UI/UX for login/register, account tab and saved tab, filtering and search, and the tour browser experience.",
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
        src: `${clavicularAssetsPath}/triage_example.webp`,
        alt: "Clavicular triage example",
        caption: "Triage example",
        width: 1280,
        height: 899,
      },
      {
        src: `${clavicularAssetsPath}/arch_diagram.webp`,
        alt: "Clavicular architecture diagram",
        caption: "Architecture",
        width: 723,
        height: 900,
      },
      {
        src: `${clavicularAssetsPath}/gantt_roadmap.webp`,
        alt: "Clavicular hackathon roadmap",
        caption: "Roadmap",
        width: 1600,
        height: 755,
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
        src: `${wasteAssetsPath}/bg_pattern.webp`,
        alt: "Waste Management System app pattern asset",
        caption: "App pattern",
        width: 1600,
        height: 900,
      },
      {
        src: `${wasteAssetsPath}/icon_512.webp`,
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
