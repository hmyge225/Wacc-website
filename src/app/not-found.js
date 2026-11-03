import Link from "next/link";
import { SiteShell } from "@/shared/components/layout/SiteShell";

export default function NotFound() {
  return (
    <SiteShell>
      <main id="main" className="feedback-page">
        <span className="section-number">ERREUR 404</span>
        <h1>Cette page reste à créer.</h1>
        <p>L’adresse demandée ne correspond à aucune page.</p>
        <Link className="button button-dark" href="/">
          Retour à l’accueil
        </Link>
      </main>
    </SiteShell>
  );
}
