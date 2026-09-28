# Estenio — Premium Blue

Portage Astro/React de la maquette bleue approuvée d’Estenio. La composition, les textes espagnols, l’image architecturale locale et les interactions de la référence sont conservés.

## Démarrage

Depuis la racine du projet :

```sh
npm install
npm run dev
```

La prévisualisation locale est disponible sur l’URL indiquée par Astro, généralement `http://localhost:4321`.

## Commandes

```sh
npm run build      # génère dist/
npm run preview    # sert le build localement
npm run astro ...  # lance la CLI Astro
```

Versions utilisées lors du portage : Node `v24.14.0`, npm `11.9.0`, Astro `7.3.5`, `@astrojs/react` `7.0.0`, React `19.3.0`.

## Organisation

- `src/pages/index.astro` assemble la page statique.
- `src/components/` contient les sections Astro : Header, Hero, TrustStrip, FirmIntro, Expertise, Heritage, Audience, Method, Contact et Footer.
- `src/components/react/` contient uniquement les sélecteurs interactifs de spécialités et de profils.
- `src/styles/global.css` contient les variables, la direction visuelle et les règles responsive.
- `public/assets/architecture.webp` est le visuel local du hero et de la section héritage.

## Limites prévues

- Le formulaire est volontairement une démonstration : il valide nativement les champs puis affiche un message local. Aucune requête d’envoi ou sauvegarde n’est déclenchée.
- La page reste en `noindex,nofollow` et aucun domaine canonique, sitemap ou intégration CRM n’est configuré.
- Le mot-symbole `estenio` est provisoire, conformément au brief ; aucun logo officiel n’a été inventé.
- Aucun déploiement de production n’est configuré ou effectué.

## Validation effectuée

Le build Astro passe. La prévisualisation de production a été vérifiée à 1440, 1024, 768 et 390 px : pas de débordement horizontal, ancres présentes, image locale chargée, menu mobile fonctionnel, navigation clavier des onglets fonctionnelle, trois profils fonctionnels et formulaire sans envoi réseau.
