# SEO ALLO CALL

Les titres, descriptions, mots-cles, images de partage et pages indexables sont
centralises dans `resources/seo/pages.json`. Ce catalogue alimente le HTML initial,
les navigations Inertia, les donnees structurees et le sitemap.

## Domaine de production

Configurer `SEO_SITE_URL=https://votre-domaine-public` sur le serveur, ou utiliser
`APP_URL` qui sert de valeur par defaut. Ne pas utiliser localhost ou une adresse
ngrok temporaire pour le domaine de production. Aucun domaine officiel n'est
impose dans le code.

Apres un changement de configuration ou du catalogue :

```sh
php artisan config:cache
php artisan route:cache
php artisan view:cache
npm run build
```

Le serveur de production doit servir le dossier `public`, utiliser les fichiers
compiles et ne pas deployer `public/hot` (reserve au serveur Vite local).
Verifier ensuite `/sitemap.xml` et `/robots.txt`, puis soumettre le sitemap dans
Google Search Console. Cela ne garantit ni l'indexation ni une position.

## Verification

```sh
php artisan test --compact tests/Feature/SeoTest.php
npx tsc --noEmit
```

Les anciens chemins `/savoir-faire` redirigent en 301 vers `/services`.
Les routes privees et les anciennes pages hors catalogue sont en noindex.
Les slugs de service ou d'industrie inconnus renvoient 404.

Les metadonnees sont rendues par Laravel meme sans JavaScript. Le contenu React
reste rendu cote client lorsque le service SSR Inertia n'est pas active.

## Ressources

Outfit est hebergee dans `public/fonts` avec sa licence OFL. Les images de
presentation sont en WebP et prechargees seulement sur la page concernee.
Les PNG originaux sont conserves. Apache peut activer le cache des images et
polices ainsi que la compression via les modules optionnels du `.htaccess`.
Pour Nginx, ces reglages doivent etre appliques dans la configuration du serveur.
