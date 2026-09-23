import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');

const browser = await chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || undefined,
    args: ['--renderer-process-limit=1', '--disable-gpu'],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
await page.route('**/googletagmanager.com/**', route => route.abort());
const base = process.env.TEST_URL || 'http://localhost:8000';
const metadata = JSON.parse(fs.readFileSync('resources/seo/pages.en.json', 'utf8'));
const english = JSON.parse(fs.readFileSync('resources/js/locales/en.json', 'utf8'));
const french = new Set(Object.entries(english).filter(([key, value]) => key !== value && key.length > 14).map(([key]) => key));
const results = [];
const screenshots = path.join(os.tmpdir(), 'allocall-bilingual');
fs.mkdirSync(screenshots, { recursive: true });
try {
    for (const [route, seo] of Object.entries(metadata)) {
        const url = '/en' + (route === '/' ? '' : route);
        const response = await page.goto(base + url, { waitUntil: 'domcontentloaded' });
        assert.equal(response.status(), 200, url);
        await page.locator('main').waitFor({ timeout: 60000 });
        await page.waitForTimeout(350);
        await page.evaluate(() => document.querySelectorAll('details').forEach(el => el.open = true));
        const state = await page.evaluate(() => ({
            title: document.title, lang: document.documentElement.lang,
            h1: [...document.querySelectorAll('h1')].map(el => el.textContent),
            overflow: document.documentElement.scrollWidth > innerWidth + 1,
            links: [...document.querySelectorAll('a[href]:not([hreflang])')].map(el => el.getAttribute('href')).filter(href => /^\/(?:services|contact|devis|apropos|industries|solutions-ia)(?:[/?#]|$)/.test(href)),
            text: [...document.querySelectorAll('main p, main h1, main h2, main h3, main li, main span')].map(el => el.textContent.replace(/\s+/g, ' ').trim()),
        }));
        const untranslated = [...new Set(state.text.filter(text => french.has(text)))];
        fs.writeFileSync(path.join(screenshots, url.replaceAll('/', '_') + '.txt'), await page.locator('body').innerText());
        results.push({ url, ...state, text: undefined, untranslated });
        assert.equal(state.title, seo.title);
        assert.equal(state.lang, 'en-CA');
        assert.equal(state.links.length, 0, 'Untranslated links: ' + url);
    }
    for (const width of [1440, 768, 390, 320]) {
        await page.setViewportSize({ width, height: 900 });
        for (const route of ['/en', '/en/industries', '/en/solutions-ia', '/en/contact', '/en/devis', '/en/services/assistants-virtuels']) {
            await page.goto(base + route, { waitUntil: 'domcontentloaded' });
            await page.locator('main').waitFor();
            await page.waitForTimeout(200);
            const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
            results.push({ route, width, overflow });
            if (route === '/en' || (width === 390 && route === '/en/solutions-ia')) {
                await page.waitForTimeout(2200);
                await page.screenshot({ path: path.join(screenshots, `${width}-${route.replaceAll('/', '_')}.png`) });
            }
        }
    }
    await page.goto(base + '/industries');
    await page.getByRole('link', { name: 'English', exact: true }).click();
    await page.waitForURL('**/en/industries');
    await page.waitForFunction(() => document.documentElement.lang === 'en-CA');
    assert.equal(await page.locator('html').getAttribute('lang'), 'en-CA');
    await page.getByRole('button', { name: 'Open menu', exact: true }).click();
    await page.getByRole('link', { name: 'Contact', exact: true }).click();
    await page.waitForURL('**/en/contact');
    assert.equal(await page.locator('form input:not([type=hidden]), form textarea').count(), 4);
    await page.getByRole('link', { name: 'Fran\u00e7ais', exact: true }).click();
    await page.waitForURL('**/contact');
    await page.waitForFunction(() => document.documentElement.lang === 'fr-CA');
    assert.equal(await page.locator('html').getAttribute('lang'), 'fr-CA');
    assert.deepEqual(errors, []);
    assert.deepEqual(results.filter(result => result.overflow || result.untranslated?.length), []);
} finally {
    fs.writeFileSync(path.join(screenshots, 'results.json'), JSON.stringify({ results, errors }, null, 2));
    console.log(JSON.stringify({ results, errors, screenshots }, null, 2));
    await browser.close();
}
