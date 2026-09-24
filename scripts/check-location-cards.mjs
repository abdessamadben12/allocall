import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, args: ['--renderer-process-limit=1', '--disable-gpu'] });
const base = process.env.TEST_URL || 'http://localhost:8000';
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
await page.route(/google|doubleclick/, route => route.abort());
const folder = path.join(os.tmpdir(), 'allocall-locations');
fs.mkdirSync(folder, { recursive: true });
try {
    for (const width of [1440, 768, 390, 320]) {
        await page.setViewportSize({ width, height: 1000 });
        await page.goto(base + '/');
        await page.getByRole('link', { name: 'English', exact: true }).waitFor();
        const images = page.locator('a[hreflang] img');
        assert.equal(await images.count(), 2);
        await images.first().evaluate(image => image.decode());
        await images.last().evaluate(image => image.decode());
        assert.equal(await images.evaluateAll(images => images.every(image => image.naturalWidth > 0)), true);
        await page.locator('header').scrollIntoViewIfNeeded();
        await page.locator('header').screenshot({ path: path.join(folder, `header-${width}.png`) });

        for (const country of ['canada', 'maroc', 'france']) {
            const pin = page.locator('#location-' + country);
            await pin.scrollIntoViewIfNeeded();
            await page.waitForTimeout(2300);
            await pin.click();
            const card = page.locator('#location-contact-card');
            await card.waitFor();
            await page.waitForTimeout(300);
            const box = await card.boundingBox();
            assert.ok(box.x >= 0 && box.x + box.width <= width + 1, `${country} overflows at ${width}`);
            if (country === 'canada') {
                assert.match(await card.innerText(), /8815 Av\. du Parc/);
                assert.equal(await card.locator('a[href^="tel:"]').getAttribute('href'), 'tel:+15146602337');
            } else if (country === 'maroc') {
                assert.match(await card.innerText(), /Casablanca/);
                assert.equal(await card.locator('a[href^="tel:"]').getAttribute('href'), 'tel:+212522484425');
            } else {
                assert.match(await card.innerText(), /Partenaires/);
                assert.equal(await card.locator('address, a').count(), 0);
            }
            await page.screenshot({ path: path.join(folder, `${country}-${width}.png`) });
            await page.keyboard.press('Escape');
            assert.equal(await card.count(), 0);
            assert.equal(await pin.getAttribute('aria-expanded'), 'false');
        }
        await page.locator('#location-canada').click();
        await page.locator('#location-contact-card').waitFor();
        await page.locator('footer').click({ position: { x: 10, y: 10 } });
        assert.equal(await page.locator('#location-contact-card').count(), 0);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false);
    }
    await page.getByRole('link', { name: 'English', exact: true }).click();
    await page.waitForURL('**/en');
    await page.waitForFunction(() => document.documentElement.lang === 'en-CA');
    await page.locator('#location-france').scrollIntoViewIfNeeded();
    await page.waitForTimeout(2400);
    await page.locator('#location-france').click();
    assert.match(await page.locator('#location-contact-card').innerText(), /Partners/);
    await page.getByRole('button', { name: 'Close location details', exact: true }).click();
    assert.equal(await page.locator('#location-contact-card').count(), 0);
    await page.getByRole('link', { name: 'Fran\u00e7ais', exact: true }).click();
    await page.waitForURL(base + '/');
    assert.deepEqual(errors, []);
    console.log('Flags and language navigation, location details, clickable numbers, France partner-only, dismissal and 320/390/768/1440 layouts passed. Screenshots: ' + folder);
} finally {
    await browser.close();
}
