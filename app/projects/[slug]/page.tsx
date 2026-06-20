import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CameraShell } from "../../components/camera-shell";
import { projects } from "../projects-data";

type ProjectDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
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

  return (
    <CameraShell className="route-shell">
      <section className="content-section route-page">
        <div className="route-header">
          <span className="route-back">/HOME/PROJECTS/{project.slug}</span>
          <Link className="route-home-button" href="/">
            Back home
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
