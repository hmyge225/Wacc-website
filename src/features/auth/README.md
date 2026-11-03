# Authentification — emplacement réservé

Ce dossier reprend les catégories du starter React : `components`, `hooks`,
`pages`, `schemas`, `services`. Aucun système de connexion n’est implémenté.

Choisir la solution de session selon le projet. Les composants de présentation
peuvent vivre ici ; exposer leurs routes avec les fichiers `page.js` de `src/app`.
Les vérifications de session et d’autorisation doivent être faites côté serveur,
au plus près des lectures et mutations protégées, et pas seulement dans l’UI.

Ajouter un slice Redux uniquement pour un état d’interface qui en a besoin.
Ne pas utiliser Redux comme preuve d’authentification ni stocker de jeton sensible
dans le store ou dans des variables `NEXT_PUBLIC_*`.
