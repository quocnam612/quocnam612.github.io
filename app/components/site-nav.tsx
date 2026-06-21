"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SocialIcon, type SocialIconName } from "./icons";

type SocialLink = {
  label: string;
  href: string;
  icon: SocialIconName;
};

const socialLinks: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/quocnam612",
    icon: "github",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@quocnam612",
    icon: "youtube",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/nam-nguy%E1%BB%85n-qu%E1%BB%91c-5765a8352",
    icon: "linkedin",
  },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Skills", href: "/skills" },
  { label: "Designs", href: "/designs" },
];

export function SiteNav() {
  const pathname = usePathname();

  return (
    <nav className="topbar" aria-label="Main navigation">
      <div className="social-links" aria-label="Social links">
        {socialLinks.map((link) => (
          <a
            className={`social-link social-link-${link.icon}`}
            href={link.href}
            key={link.label}
            target="_blank"
            rel="noreferrer"
            aria-label={link.label}
            title={link.label}
          >
            <SocialIcon icon={link.icon} />
          </a>
        ))}
      </div>
      <div className="nav-links">
        {navLinks.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname === link.href || pathname.startsWith(`${link.href}/`);

          return (
            <Link
              aria-current={isActive ? "page" : undefined}
              className={isActive ? "active" : undefined}
              href={link.href}
              key={link.href}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
