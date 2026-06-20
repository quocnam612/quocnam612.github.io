import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CameraShell } from "../../components/camera-shell";
import { designs } from "../designs-data";

type DesignDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return designs.map((design) => ({
    slug: design.slug,
  }));
}

export async function generateMetadata({
  params,
}: DesignDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const design = designs.find((item) => item.slug === slug);

  if (!design) {
    return {
      title: "Design | NQN612",
    };
  }

  return {
    title: `${design.title} | NQN612`,
    description: design.description,
  };
}

export default async function DesignDetailPage({
  params,
}: DesignDetailPageProps) {
  const { slug } = await params;
  const design = designs.find((item) => item.slug === slug);

  if (!design) {
    notFound();
  }

  return (
    <CameraShell className="route-shell">
      <section className="content-section route-page">
        <div className="route-header">
          <span className="route-back">/HOME/DESIGNS/{design.slug}</span>
          <Link className="route-home-button" href="/">
            Back home
          </Link>
        </div>
        <div
          className="terminal-window route-terminal"
          aria-label={`${design.title} design status`}
        >
          <p>
            <span className="terminal-prompt">@nqn612~$</span> open /designs/
            {design.slug}
          </p>
          <p>ERROR 503: design detail module is still under construction.</p>
          <p>
            <span className="terminal-prompt">@nqn612~$</span> inspect --design &quot;
            {design.title}&quot;
          </p>
          <p>
            status: arranging renders, posters, process shots, and probably too
            many pixels.
          </p>
          <p>
            <span className="terminal-prompt">@nqn612~$</span> fallback --design-list
          </p>
          <p>try /designs for now. the gallery door is still being animated.</p>
          <p className="terminal-input-line" aria-label="Terminal prompt waiting for input">
            <span className="terminal-prompt">@nqn612~$</span>
            <span className="terminal-cursor" aria-hidden="true" />
          </p>
        </div>
      </section>
    </CameraShell>
  );
}
