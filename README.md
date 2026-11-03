# Next Feature Starter

Un starter **Next.js App Router en JavaScript**, organisé par fonctionnalités comme
[React Feature Starter](https://github.com/hmyge225/react-feature-starter).
Les routes et les layouts restent des composants serveur par défaut ; les providers
et les interactions utilisent des composants client.

## Démarrer

Prérequis : **Node.js 24.15+ recommandé** (`nvm use` avec `.nvmrc`), npm.
Node.js 22.22.2+ et 26+ sont également compatibles avec les outils de test installés.
Next.js et React gardent leurs versions
fixées dans `package.json` ; `package-lock.json` fixe les dépendances installées.

```bash
npm ci
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000). Aucune variable d’environnement,
API externe ou base de données n’est nécessaire pour voir l’accueil et utiliser la
démonstration. Pour une première installation sans lockfile, utiliser `npm install`.

| Commande             | Usage                                   |
| -------------------- | --------------------------------------- |
| `npm run dev`        | Développement avec Next.js et Turbopack |
| `npm run lint`       | ESLint et règles Next.js                |
| `npm test`           | Tests en une passe                      |
| `npm run test:watch` | Tests en mode interactif                |
| `npm run build`      | Build de production                     |
| `npm start`          | Serveur de production après le build    |

## Organisation

```text
src/
├── app/
│   ├── layout.js             # Document, métadonnées, styles et providers
│   ├── page.js               # Entrée de la route /
│   ├── loading.js            # Chargement de segment
│   ├── error.js              # Erreur et nouvelle tentative avec retry()
│   ├── not-found.js           # Page introuvable
│   ├── providers/            # Redux, React Query, Motion et notifications
│   └── store/                # Fabrique de store et reducer racine
├── features/
│   ├── home/                 # Exemple indépendant et supprimable
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── homeSlice.js
│   │   └── index.js
│   └── auth/                 # Emplacement réservé, aucune connexion implémentée
│       ├── components/
│       ├── hooks/
│       ├── pages/
│       ├── schemas/
│       └── services/
├── shared/
│   ├── components/
│   │   ├── feedback/         # Chargement et notifications
│   │   ├── layout/           # Structure visuelle commune
│   │   └── ui/               # Futurs boutons, champs, etc.
│   ├── hooks/                # Hooks partagés, dont ceux de Redux
│   ├── services/             # Instance Axios publique
│   ├── styles/               # Styles globaux et import Tailwind
│   └── utils/
└── tests/
    ├── setup.js
    ├── unit/
    └── integration/
```

Les dossiers réservés sont suivis avec `.gitkeep`. Les assets statiques vont dans
`public/`. L’alias `@/` pointe sur `src/`, dans Next.js comme dans Vitest.

### Ajouter une fonctionnalité et sa route

1. Créer `src/features/products/` et les catégories nécessaires à la fonctionnalité.
2. Placer son écran serveur dans `pages/ProductsPage.jsx` et ses interactions dans
   `components/`. Exposer l’écran depuis un `index.js` réservé aux exports serveur.
3. Créer `src/app/products/page.js` pour définir l’URL `/products` :

```jsx
import { ProductsPage } from "@/features/products";

export default function Page() {
  return <ProductsPage />;
}
```

Un dossier `pages` **dans une fonctionnalité** rassemble les écrans métier : il ne
crée aucune route. Ne pas créer `src/pages`, `App.jsx`, `main.jsx` ou un routeur
React Router. Utiliser `next/link` pour les liens internes et `next/navigation`
pour la navigation impérative et les paramètres. Les métadonnées s’exportent depuis
les pages/layouts serveur.

Ajouter `"use client"` uniquement aux points d’entrée qui utilisent des hooks,
des événements, des API navigateur ou des bibliothèques qui nécessitent ce contexte.
Les pages serveur sont passées comme `children` à `AppProviders` : elles restent
rendues sur le serveur. Éviter les fichiers d’exports qui mélangent services privés
serveur et modules client ; importer les interactions depuis leur module dédié.

## État et données

| Besoin                                           | Outil                                         |
| ------------------------------------------------ | --------------------------------------------- |
| État local d’un composant                        | `useState` / `useReducer`                     |
| État d’interface partagé côté client             | Redux Toolkit                                 |
| Lecture initiale ou données privées côté serveur | Composants serveur et `fetch` natif           |
| Cache de données API côté navigateur             | React Query                                   |
| Transport HTTP côté navigateur                   | Axios                                         |
| Mutation côté serveur                            | Server Action avec validation et autorisation |

### Redux Toolkit

`makeStore(preloadedState)` crée un store indépendant. `AppProviders` conserve une
instance par montage ; aucun store global n’est partagé entre requêtes serveur.
Le seul état fourni est le compteur de démonstration, initialisé à zéro des deux
côtés pour éviter un décalage d’hydratation. Aucun état n’est persisté au rechargement.

Ajouter les slices dans leurs fonctionnalités, puis les déclarer dans
`src/app/store/rootReducer.js`. Les composants client utilisent `useAppDispatch`
et `useAppSelector` depuis `@/shared/hooks/redux`. Les composants serveur ne lisent
pas le store. Ne pas recopier les réponses API dans Redux si React Query les gère.

### Axios et React Query

`api`, exporté depuis `@/shared/services/api`, utilise :

- `NEXT_PUBLIC_API_URL`, ou `/api` si la variable est absente ou vide ;
- un délai maximal de **10 secondes** ;
- aucun token, intercepteur d’authentification ou appel au montage.

Le starter ne fournit **aucun endpoint `/api`**. Brancher une API externe ou ajouter
ses propres Route Handlers dans `app/api` avant de créer des appels.

Exemple pour un composant client, à ajouter seulement lorsqu’une API existe :

```jsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/services/api";

export function ProductList() {
  const {
    data = [],
    isPending,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async ({ signal }) => {
      const { data } = await api.get("/products", { signal });
      return data;
    },
  });

  if (isPending) return <p>Chargement…</p>;
  if (isError) return <p>Impossible de charger les produits.</p>;
  return (
    <ul>
      {data.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
```

React Query conserve les résultats pendant **60 secondes de fraîcheur** par défaut.
Chaque rendu serveur reçoit un nouveau client Query ; le navigateur réutilise une
instance stable. `makeQueryClient()` est disponible pour les besoins d’isolation.

### Rendu serveur et cache Next.js

Préférer `fetch` natif dans les composants et services serveur, et un accès direct
aux données plutôt qu’un appel HTTP vers ses propres Route Handlers. Marquer les
services privés avec `import 'server-only'` et laisser les secrets côté serveur.

`cacheComponents` et `partialPrefetching` sont activés. Dans cette version, un appel
`fetch` n’est pas automatiquement mis en cache. Choisir explicitement une lecture
mise en cache avec `"use cache"` et `cacheLife`, ou une lecture fraîche rendue sous
une frontière `Suspense`. Les paramètres et les données de requête doivent suivre
les conventions de la documentation Next.js installée.

Le cache serveur Next.js et le cache navigateur React Query sont **indépendants**.
`queryClient.invalidateQueries()` ne réinvalide pas le cache serveur. Après une
mutation, actualiser les caches concernés : les clés Query côté client et, si les
données serveur sont mises en cache, leurs tags ou chemins côté serveur. Les
Server Actions doivent toujours vérifier l’identité et les autorisations.

Pour précharger des données serveur dans React Query, ajouter une `HydrationBoundary`
à la fonctionnalité concernée. Avec `cacheComponents`, suivre le guide local
`node_modules/next/dist/docs/01-app/02-guides/client-side-data-fetching/tanstack-query.md` :
un simple `dehydrate()` peut lire l’heure pendant le pré-rendu et nécessite le
traitement décrit dans ce guide. Aucune hydratation de données API n’est nécessaire
pour l’accueil fourni.

## Styles, animations et notifications

Les styles globaux et `@import "tailwindcss"` vivent dans
`src/shared/styles/globals.css`, importé une seule fois par le layout racine.
Le loader Tailwind de Turbopack est configuré dans `next.config.mjs`. Utiliser des
classes Tailwind ou des CSS Modules pour les prochains composants.

Les polices Geist sont gérées par `next/font`. Leur premier build nécessite un
accès au fournisseur de polices. Lucide fournit les icônes. Les composants Motion
utilisent `motion/react` depuis des composants client ; le provider respecte la
préférence de réduction des animations. Les styles CSS la respectent également.

Un seul `Toaster` est monté par `AppProviders`, sous `Suspense`. Déclencher les
notifications depuis les interactions client avec `toast.success()` ou `toast.error()`.
La démonstration possède aussi sa frontière `Suspense` pour rester compatible avec
le pré-rendu de Cache Components.

## Variables d’environnement

La configuration est facultative. Pour la personnaliser :

```bash
cp .env.example .env.local
```

Définir `NEXT_PUBLIC_API_URL=https://api.votre-domaine.com` pour les appels navigateur.
Les fichiers `.env*` réels restent ignorés ; seuls les deux exemples sont suivis.
Next.js lit ces fichiers à la racine du projet, pas dans `src`.

Pour la production, copier `.env.production.example` vers `.env.production.local`
ou définir les variables chez l’hébergeur **avant** `npm run build`.
`NEXT_PUBLIC_*` est public et figé au build : aucun secret dans ces variables.
Les variables sans ce préfixe restent réservées au serveur. Axios côté navigateur
ne doit pas importer une configuration contenant des secrets.

## Tests et vérifications

Vitest utilise jsdom, Testing Library et l’alias `@/`. Le fichier
`query-client.server.test.js` utilise un environnement Node pour vérifier
l’isolation réelle sans `window`.

Les tests couvrent le store et les caches isolés, les interactions sous les vrais
providers, la notification, la configuration Axios sans réseau et les écrans de
feedback. Les composants serveur asynchrones se vérifient dans un navigateur ou
avec des tests de bout en bout ; Vitest ne reproduit pas le runtime RSC de Next.js.

Avant de réutiliser ou livrer le starter :

```bash
npm run lint
npm test
npm run build
npm start
```

Vérifier `/`, une URL inconnue, le compteur, les notifications, l’affichage mobile
et l’absence d’erreurs d’hydratation dans la console navigateur.

## Retirer la démonstration

1. Remplacer `src/app/page.js` par la première page du projet.
2. Remplacer le reducer `home` par vos slices dans le reducer racine, puis supprimer
   `src/features/home`. Sans slice, un reducer neutre valide est
   `export const rootReducer = (state = {}) => state;`.
3. Supprimer ou adapter les tests `store.test.js` et `starter.test.jsx`, qui importent
   l’exemple. Conserver les tests d’infrastructure utiles à votre projet.
4. Retirer les styles de l’accueil et personnaliser les métadonnées, l’icône et les
   composants de layout. Les providers, le client HTTP et l’arborescence restent utilisables.

`features/auth` est un emplacement réservé : choisir une solution d’authentification
selon le projet. Aucune fausse session ni route supposément protégée n’est fournie.
