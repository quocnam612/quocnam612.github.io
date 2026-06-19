import Link from "next/link";

export default function DesignsPage() {
  return (
    <main className="site-shell scanlines-on route-shell">
      <div className="ambient-grid" aria-hidden="true" />
      <div className="noise-field" aria-hidden="true" />
      <section className="content-section route-page designs-section">
        <div>
          <Link className="route-back" href="/">
            /home
          </Link>
          <p className="eyebrow">Designs</p>
          <h1 className="glitch-heading" data-text="Visual experiments">
            Visual experiments
          </h1>
        </div>
        <div className="terminal-window" aria-label="Design notes">
          <p>
            <span>$</span> load --gallery designs
          </p>
          <p>3D, pixel, profile, and glitch experiments live here.</p>
          <p>
            <span>$</span> status --next
          </p>
          <p>wire image/model assets from public/images and public/models</p>
          <p>
            <span>$</span> render --vibe dark-glitch
            <span className="terminal-cursor" aria-hidden="true" />
          </p>
        </div>
      </section>
    </main>
  );
}
