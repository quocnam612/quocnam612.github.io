import Link from "next/link";
import type { Metadata } from "next";
import { CameraShell } from "../components/camera-shell";

export const metadata: Metadata = {
  title: "About | NQN612",
  description: "About page status for Nguyen Quoc Nam's portfolio.",
};

export default function AboutPage() {
  return (
    <CameraShell className="route-shell">
      <section className="content-section route-page">
        <div className="route-header">
          <span className="route-back">/HOME/ABOUT</span>
          <Link className="route-home-button" href="/">
            Back home
          </Link>
        </div>
        <div
          className="terminal-window route-terminal"
          aria-label="About page status"
        >
          <p>
            <span className="terminal-prompt">@nqn612~$</span> open /about
          </p>
          <p>ERROR 503: profile lore module is still under construction.</p>
          <p>
            <span className="terminal-prompt">@nqn612~$</span> run maintenance --page about
          </p>
          <p>status: rearranging pixels, debugging personality, pretending this was planned.</p>
          <p>
            <span className="terminal-prompt">@nqn612~$</span> fallback --contact
          </p>
          <p>try the home page for now. the elevator music is implied.</p>
          <p className="terminal-input-line" aria-label="Terminal prompt waiting for input">
            <span className="terminal-prompt">@nqn612~$</span>
            <span className="terminal-cursor" aria-hidden="true" />
          </p>
        </div>
      </section>
    </CameraShell>
  );
}
