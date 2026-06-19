import Link from "next/link";

const skills = [
  "React",
  "TypeScript",
  "Next.js",
  "CSS",
  "GitHub Pages",
  "Linux",
  "UI Design",
  "Automation",
];

export default function SkillsPage() {
  return (
    <main className="site-shell scanlines-on route-shell">
      <div className="ambient-grid" aria-hidden="true" />
      <div className="noise-field" aria-hidden="true" />
      <section className="content-section route-page">
        <Link className="route-back" href="/">
          /home
        </Link>
        <p className="eyebrow">Skills</p>
        <h1 className="glitch-heading" data-text="Things I can bend">
          Things I can bend
        </h1>
        <div className="skill-cloud route-skill-cloud">
          {skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))}
        </div>
      </section>
    </main>
  );
}
