# French and English

Public pages use French at their existing URLs and English under `/en`.
The header language switch stays on the same page and keeps query parameters.
The page URL determines the language; no browser setting or cookie overrides it.
Internal navigation uses `components/localized-link.tsx` and imperative navigation
uses `useLocale().href()`. Contact submissions post to the selected language route.

## Content

French is the source text in existing components and data files. English messages
live in `resources/js/locales/en.json`, keyed by French text with whitespace
normalised. Render public copy with `useLocale().t(text)`. Keep identifiers, slugs,
stored form values and user-entered text untranslated. Add an English entry whenever
new public copy is added. Missing translations fall back to French.

The SEO catalogs are `resources/seo/pages.json` and `pages.en.json`. English metadata
inherits images and page types from the French catalog. Both versions have canonical
URLs, reciprocal hreflang links, localized structured data and sitemap entries.
Set `SEO_SITE_URL` to the production domain when deploying; do not commit `.env`.

Account/admin pages and legacy configurator pages are not part of the bilingual
public catalog. Both contact and quote forms submit to the server. Recipients are
configured with `CONTACT_MAIL_TO` and `CONTACT_MAIL_TO_SECONDARY`; one email is
addressed to both recipients. Quote budgets are included in the message and files
are stored privately and attached to the notification. Delivery failures retain
the database record and show a translated error instead of a success message.

## Verification

```sh
node scripts/test-localization.mjs
php artisan test --compact tests/Feature/BilingualTest.php tests/Feature/SeoTest.php tests/Feature/ContactSubmissionTest.php tests/Feature/QuoteSubmissionTest.php
node node_modules/typescript/bin/tsc --noEmit
npm run build
```

`scripts/check-bilingual.mjs` checks all English public pages, metadata, localized
links, the language switch and responsive layouts in Chromium. It requires
Playwright; optional `PLAYWRIGHT_MODULE`, `CHROMIUM_PATH` and `TEST_URL` environment
variables select an existing installation and running application. Screenshots and
results are written to the system temporary directory under `allocall-bilingual`.

`scripts/check-public-forms.mjs` uses the same browser settings to exercise quote
and contact submissions. It intercepts POST requests, so it never sends real mail.
Server tests use `Mail::fake()` and an isolated test database. These checks verify
recipient selection and application behavior, not delivery to live inboxes.
