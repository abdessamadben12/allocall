import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined, args: ['--renderer-process-limit=1', '--disable-gpu'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 1050 }, reducedMotion: 'reduce' });
const base = process.env.TEST_URL || 'http://localhost:8000';
const errors = [];
const requests = [];
page.on('pageerror', error => errors.push(error.message));
await page.route('**/googletagmanager.com/**', route => route.abort());
let outcome = 'success';

// Intercept every submission: browser checks must never send real customer emails.
await page.route('**/*', async route => {
    const request = route.request();
    if (request.method() !== 'POST') return route.fallback();
    const url = new URL(request.url());
    if (url.origin !== new URL(base).origin) return route.abort();
    assert.match(url.pathname, /^\/(?:en\/)?(?:devis|contact)$/);
    requests.push({ path: url.pathname, body: request.postDataBuffer().toString() });
    const response = await page.request.get(request.url(), { headers: { 'X-Inertia': 'true', 'X-Requested-With': 'XMLHttpRequest', 'X-Inertia-Version': request.headers()['x-inertia-version'] || '' } });
    const data = await response.json();
    data.props.errors = outcome === 'validation' ? { email: 'Please enter a valid email address.' } : {};
    data.props.submissionStatus = outcome === 'success' ? { success: 'Your message has been sent successfully!' } : outcome === 'failure' ? { error: 'Your message was saved, but the email could not be sent.' } : {};
    await new Promise(resolve => setTimeout(resolve, 400));
    return route.fulfill({ status: 200, headers: { 'Content-Type': 'application/json', 'X-Inertia': 'true' }, body: JSON.stringify(data) });
});

async function fillQuote() {
    await page.locator('#quote-name-input').fill('Browser Test');
    await page.locator('#quote-email-input').fill('browser@example.com');
    await page.locator('#quote-phone-input').fill('5145550100');
    await page.locator('#quote-desc-input').fill('Please help with our customer calls and appointments.');
    await page.locator('#quote-budget-input').fill('2500 CAD');
}
try {
    await page.goto(base + '/en/devis?service=Virtual%20assistant');
    await page.locator('#quote-desc-input').waitFor();
    assert.equal(await page.locator('#quote-desc-input').inputValue(), 'Virtual assistant');
    await fillQuote();
    await page.locator('#quote-file-input').setInputFiles({ name: 'brief.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4\nBrowser test document') });
    await page.locator('#quote-submit-btn').click();
    await page.waitForFunction(() => document.querySelector('#quote-submit-btn').disabled);
    await page.getByRole('status').filter({ hasText: 'Your message has been sent successfully!' }).waitFor();
    assert.equal(await page.locator('#quote-name-input').inputValue(), '');
    assert.equal(await page.locator('#quote-desc-input').inputValue(), '');
    assert.equal(await page.locator('#quote-file-input').evaluate(input => input.files.length), 0);
    assert.equal(requests.length, 1);
    assert.equal(requests[0].path, '/en/devis');
    for (const expected of ['name="full_name"', 'Browser Test', 'name="request_type"', 'quote', '2500 CAD', 'brief.pdf']) assert.ok(requests[0].body.includes(expected), expected);
    assert.equal(await page.evaluate(() => localStorage.getItem('allocall_quotes')), null);

    outcome = 'failure';
    await fillQuote();
    await page.locator('#quote-submit-btn').click();
    await page.getByRole('alert').filter({ hasText: 'Your message was saved' }).waitFor();
    assert.equal(await page.locator('#quote-name-input').inputValue(), 'Browser Test');
    assert.equal(await page.getByRole('status').filter({ hasText: 'successfully' }).count(), 0);

    outcome = 'validation';
    await page.locator('#quote-submit-btn').click();
    await page.getByRole('alert').filter({ hasText: 'Please enter a valid email' }).waitFor();
    assert.equal(await page.locator('#quote-email-input').getAttribute('aria-invalid'), 'true');
    assert.equal(await page.locator('#quote-name-input').inputValue(), 'Browser Test');

    outcome = 'success';
    await page.goto(base + '/en/contact');
    await page.locator('[name=full_name]').fill('Contact Test');
    await page.locator('[name=email]').fill('contact-test@example.com');
    await page.locator('[name=phone]').fill('5145550101');
    await page.locator('[name=message]').fill('Please contact me about your services.');
    await page.locator('form button[type=submit]').click();
    await page.getByRole('status').filter({ hasText: 'Your message has been sent successfully!' }).waitFor();
    assert.equal(await page.locator('[name=full_name]').inputValue(), '');
    assert.equal(requests.at(-1).path, '/en/contact');

    await page.goto(base + '/devis');
    await page.locator('#quote-name-input').waitFor();
    for (const width of [1440, 390, 320]) {
        await page.setViewportSize({ width, height: 1050 });
        await page.locator('#quote-request-card').scrollIntoViewIfNeeded();
        await page.waitForTimeout(1500);
        assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1), false);
        const folder = path.join(os.tmpdir(), 'allocall-bilingual');
        fs.mkdirSync(folder, { recursive: true });
        await page.screenshot({ path: path.join(folder, `quote-form-${width}.png`) });
    }
    assert.deepEqual(errors, []);
    console.log('Quote and contact browser checks passed: localized POST, attachment, success/reset, failure preservation, validation, responsive layout. No real emails sent.');
} finally {
    await browser.close();
}
