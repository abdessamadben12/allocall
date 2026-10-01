# Version allocall.ca

Branche : `canada-allocall-ca`.

Cette version utilise les mêmes pages, composants, photos, styles et animations que le projet d’origine. Les adaptations de texte en français québécois et en anglais canadien sont dans `resources/js/locales/canada.json`. Les textes non remplacés utilisent les traductions existantes.

- Accueil français : `/`
- Accueil anglais : `/en`
- Aucun préfixe `/ca`

Pour la production, configurer l’environnement :

```dotenv
APP_URL=https://allocall.ca
SEO_SITE_URL=https://allocall.ca
```

`config/seo.php` utilise déjà `https://allocall.ca` comme URL canonique par défaut. Une variable `SEO_SITE_URL` existante remplace cette valeur : la vérifier au déploiement.

Pour développer localement, conserver une `APP_URL` locale valide et lancer les commandes habituelles du projet (`php artisan serve` et `npm run dev`). Le domaine et le déploiement ne sont pas configurés par la création de cette branche.

## Contenu et routes

- `resources/js/locales/canada.json` : vocabulaire québécois et traduction anglaise canadienne.
- `resources/content/ecommerce.json` : service e-commerce (clavardage Shopify et Web, courriels, colis, paniers abandonnés et estimation en CAD).
- `resources/content/articles.json` : quatre articles complets dans les deux langues.
- `resources/content/faqs.json` : quinze questions et réponses, sélectionnées selon la page.
- `resources/content/paths.json` : correspondance des slugs français et anglais, utilisée par PHP et React.
- `resources/content/page-copy.json` : titres et descriptions SEO des pages commerciales.

Exemples : `/soumission`, `/en/quote`, `/services/centre-appels-ecommerce-quebec`, `/en/services/ecommerce-customer-support-canada`, `/articles`, `/questions-frequentes` et `/en/faq`.

Les anciennes adresses redirigent en 301 vers leur adresse canonique en conservant les paramètres de requête. Le sélecteur de langue conserve la page et son ancre. Le sitemap ne contient que les adresses canoniques et leurs correspondances linguistiques.

## Lisibilité pour la recherche et les assistants IA

Les articles et la page FAQ disposent d’un HTML initial visible, même sans JavaScript ou serveur SSR. Le contenu Blade et le contenu React utilisent les mêmes données. Les données structurées `BlogPosting`, `FAQPage`, `Service`, `Organization` et `BreadcrumbList` décrivent le contenu réellement proposé.

Le numéro canadien est mis en avant. L’adresse administrative existante reste au Maroc : ni le domaine `.ca` ni le numéro canadien ne justifient d’inventer une adresse ou une équipe physiquement située au Canada.

Références techniques : [Google — fonctionnalités IA et sites Web](https://developers.google.com/search/docs/appearance/ai-features), [Google — données structurées Article](https://developers.google.com/search/docs/appearance/structured-data/article), [Bing — consignes aux webmestres](https://www.bing.com/webmasters/help/bing-webmaster-guidelines-30fba23a). Ces changements facilitent l’accès et la compréhension; ils ne garantissent ni positionnement ni citation. Le balisage FAQ ne constitue pas une promesse de résultat enrichi Google.

## Promesses commerciales à confirmer

Les formulations « zéro appel manqué », « moins de 60 secondes » et « jusqu’à 60 % d’économies » ne sont pas publiées comme des garanties sans confirmation. La couverture 24/7, de nuit et de fin de semaine est présentée comme une option selon le forfait et les disponibilités. Les lieux de traitement, les intégrations Shopify/CRM et les délais de réponse sont à convenir dans l’entente.

## Vérification

```sh
php artisan test --compact tests/Feature/CanadianContentTest.php tests/Feature/SeoTest.php tests/Feature/BilingualTest.php tests/Feature/QuoteSubmissionTest.php tests/Feature/ContactSubmissionTest.php
node --test tests/frontend/public-paths.test.mjs
npx tsc --noEmit
npm run build
```
