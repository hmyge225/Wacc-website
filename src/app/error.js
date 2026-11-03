"use client";

import { useEffect } from "react";
import Link from "next/link";
import { TriangleAlert } from "lucide-react";

export default function ErrorPage({ error, retry }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="feedback-page">
      <TriangleAlert size={32} aria-hidden="true" />
      <h1>Un imprévu est survenu.</h1>
      <p>Réessayez de charger cette page dans un instant.</p>
      <div className="feedback-actions">
        <button
          type="button"
          className="button button-dark"
          onClick={() => retry()}
        >
          Réessayer
        </button>
        <Link className="button button-outline" href="/">
          Retour à l’accueil
        </Link>
      </div>
    </main>
  );
}
