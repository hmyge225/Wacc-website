import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function SiteShell({ children }) {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">
        Aller au contenu
      </a>
      <header className="site-header">
        <Link
          className="brand"
          href="/"
          aria-label="Next Feature Starter — accueil"
        >
          <span className="brand-mark" aria-hidden="true">
            n/
          </span>
          <span>
            next<span className="brand-light"> / feature starter</span>
          </span>
        </Link>
        <a
          className="text-link"
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Documentation <ArrowUpRight size={16} aria-hidden="true" />
        </a>
      </header>
      {children}
      <footer className="site-footer">
        <span>Une structure familière. Les possibilités de Next.js.</span>
        <a
          className="text-link"
          href="https://react.dev/learn"
          target="_blank"
          rel="noopener noreferrer"
        >
          React & Next.js <ArrowUpRight size={14} aria-hidden="true" />
        </a>
      </footer>
    </div>
  );
}
