import { Suspense } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Boxes,
  FolderCode,
  Layers,
  Terminal,
} from "lucide-react";
import { SiteShell } from "@/shared/components/layout/SiteShell";
import { LoadingState } from "@/shared/components/feedback/LoadingState";
import { StarterDemo } from "../components/StarterDemo";

const folders = [
  {
    name: "app/",
    icon: Layers,
    label: "Les points d’entrée",
    text: "Routes, layouts, providers et store. Next.js garde la main sur la navigation.",
  },
  {
    name: "features/",
    icon: FolderCode,
    label: "Votre logique métier",
    text: "Chaque fonctionnalité rassemble ses composants, hooks, pages, schémas et services.",
  },
  {
    name: "shared/",
    icon: Boxes,
    label: "Ce qui se partage",
    text: "Composants UI, styles, utilitaires et client HTTP. Une base commune à vos fonctionnalités.",
  },
];

export function HomePage() {
  return (
    <SiteShell>
      <main id="main">
        <section className="hero" aria-labelledby="welcome-title">
          <div className="hero-copy">
            <span className="eyebrow">
              <span className="status-dot" /> Votre point de départ
            </span>
            <h1 id="welcome-title">
              Le prochain projet
              <br />
              commence <span>ici.</span>
            </h1>
            <p className="hero-description">
              Une base claire, organisée par fonctionnalités.
              <br className="desktop-break" /> Vos outils React, avec les
              conventions de Next.js.
            </p>
            <a className="button button-dark" href="#structure">
              Explorer la structure <ArrowDown size={16} aria-hidden="true" />
            </a>
          </div>
          <div className="terminal-card">
            <div className="terminal-header">
              <Terminal size={15} aria-hidden="true" />
              <span>Prêt à démarrer</span>
              <span className="terminal-label">npm</span>
            </div>
            <div className="terminal-body">
              <p className="terminal-comment"># Installer les dépendances</p>
              <pre>
                <code>
                  <span aria-hidden="true">$ </span>npm install
                </code>
              </pre>
              <p className="terminal-comment"># Lancer votre projet</p>
              <pre>
                <code>
                  <span aria-hidden="true">$ </span>npm run dev
                </code>
              </pre>
            </div>
            <div className="terminal-footer">
              <span className="status-dot" /> localhost:3000{" "}
              <span>et c’est parti.</span>
            </div>
          </div>
        </section>
        <div className="stack-strip" aria-label="Outils inclus">
          <span className="stack-label">Dans la boîte</span>
          {[
            "Next.js",
            "Redux Toolkit",
            "React Query",
            "Axios",
            "Tailwind CSS",
            "Motion",
          ].map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>
        <section
          className="section"
          id="structure"
          aria-labelledby="structure-title"
        >
          <div className="section-heading">
            <div>
              <span className="section-number">01 / ORGANISATION</span>
              <h2 id="structure-title">Chaque chose à sa place.</h2>
            </div>
            <span className="section-aside">
              Une architecture qui suit votre projet.
            </span>
          </div>
          <div className="folder-grid">
            {folders.map(({ name, icon: Icon, label, text }) => (
              <article className="folder-card" key={name}>
                <div className="folder-title">
                  <Icon size={20} strokeWidth={1.6} aria-hidden="true" />
                  <code>{name}</code>
                </div>
                <h3>{label}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <p className="structure-note">
            <code>tests/</code> accueille vos tests unitaires et d’intégration.
            Commencez dans <code>src/app/page.js</code>, puis développez vos
            fonctionnalités.
          </p>
        </section>
        <section className="section demo-section" aria-labelledby="demo-title">
          <div className="section-heading">
            <div>
              <span className="section-number">02 / PREMIÈRE INTERACTION</span>
              <h2 id="demo-title">À vous de jouer.</h2>
            </div>
            <span className="demo-badge">Exemple supprimable</span>
          </div>
          <p className="section-description">
            Un compteur partagé avec Redux et une notification pour vérifier que
            tout fonctionne.
          </p>
          <Suspense
            fallback={<LoadingState label="Chargement de la démonstration…" />}
          >
            <StarterDemo />
          </Suspense>
        </section>
        <aside className="next-step">
          <div>
            <span className="section-number">LA SUITE</span>
            <p>Une idée, une fonctionnalité, un premier commit.</p>
          </div>
          <a
            className="text-link"
            href="https://nextjs.org/docs/app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Découvrir l’App Router <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </aside>
      </main>
    </SiteShell>
  );
}
