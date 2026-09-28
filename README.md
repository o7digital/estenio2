# Estenio 2 — Redesign premium

Redesign Astro du site Estenio 2, fondé sur les contenus espagnols et les médias présents sur [Estenio 1](https://estenio.vercel.app/). Estenio 1 n’est pas modifié.

## Développement

```sh
npm install
npm run dev
npm run build
npm run preview
```

## Correspondance Estenio 1 → Estenio 2

| Source | Destination dans le redesign |
| --- | --- |
| Hero, titre exact et paragraphe institutionnel | `Hero.astro`, avec l’architecture bleue comme illustration conceptuelle |
| `Servicios`, quatre cartes, descriptions, images et pages d’origine | `ServiceShowcase.astro`, sélecteur accessible |
| `SERVICIOS DE PENSIÓN`, offres Empresarial et Personal | `PensionOffers.astro` |
| `NOSOTROS`, trois paragraphes, logo et photographie | `About.astro` |
| `NUESTROS CLIENTES`, dix logos | `Clients.astro`, grille sans recadrage |
| `ENCUENTRA LA SOLUCIÓN`, coordonnées, réseaux et formulaire | `Contact.astro` et `Footer.astro` |
| Logo et navigation officielle | `Header.astro`, avec liens vers les pages d’origine |

Les textes métier sont centralisés dans `src/content/estenio.ts`. Les images reprises de la source sont dans `public/assets/original/`. Le formulaire reste explicitement une prévisualisation : il valide les champs localement et n’envoie ni ne stocke aucune donnée.

La page conserve `noindex,nofollow` pendant la phase de preview.

## Olivia AI v2

Le chat en espagnol appelle `/api/olivia`, une fonction Vercel qui authentifie
les requêtes vers le moteur Python sur le VPS 1. Configurer côté serveur
`OLIVIA_V2_URL=https://olivia.o7digitalgroup.com/v2` et `OLIVIA_INTERNAL_TOKEN`.
Le navigateur ne reçoit jamais ce secret. L'instance Railway est conservée.

Le profil Estenio et les informations métier de `lib/olivia-context.js` sont fixés
par le serveur. Le moteur utilise le mode `estenio2-demo` pour répondre aux suivis
avec l'historique des 12 derniers tours, conservé dans la session du navigateur.
« Nueva conversación » remet cet historique à zéro. La démonstration ne collecte
pas de leads et ne confirme aucun envoi ; elle propose l'email officiel pour
contacter un spécialiste. Une panne affiche une erreur et garde la question pour
réessayer, sans réponse IA simulée.

## Validation

Le build Astro et le contrôle TypeScript doivent passer avant livraison. La vérification navigateur couvre 390, 768 et 1440 px : absence de débordement horizontal, chargement des images, navigation mobile, sélection clavier des services et validation locale du formulaire.

```sh
npm test
npm run check
npm run build
```
