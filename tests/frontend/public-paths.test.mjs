import assert from 'node:assert/strict';
import fs from 'node:fs';
import { test } from 'node:test';
import vm from 'node:vm';
import ts from 'typescript';

const root = new URL('../../', import.meta.url);
const read = (path) => fs.readFileSync(new URL(path, root), 'utf8');
const json = (path) => JSON.parse(read(path));

function load(path, dependencies) {
    const { outputText } = ts.transpileModule(read(path), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, esModuleInterop: true },
    });
    const exports = {};
    vm.runInNewContext(outputText, {
        exports,
        URL,
        require: (name) => {
            assert.ok(name in dependencies, `Unexpected dependency: ${name}`);
            return dependencies[name];
        },
    });
    return exports;
}

const paths = json('resources/content/paths.json');
const routing = load('resources/js/lib/public-paths.ts', { '../../content/paths.json': paths });
const copy = json('resources/js/locales/canada.json');
const translations = load('resources/js/lib/i18n.ts', {
    '@/locales/en.json': json('resources/js/locales/en.json'),
    '@/locales/canada.json': copy,
    '../../content/ecommerce.json': json('resources/content/ecommerce.json'),
    './public-paths': routing,
    '@inertiajs/react': {},
    react: {},
});

test('uses Canadian slugs for navigation and language switching', () => {
    for (const [input, locale, expected] of [
        ['/devis', 'fr', '/soumission'],
        ['/soumission', 'en', '/en/quote'],
        ['/en/quote?service=Shopify#form', 'fr', '/soumission?service=Shopify#form'],
        ['/services/commerce-electronique', 'en', '/en/services/ecommerce-customer-support-canada'],
        ['/en/services/ecommerce-customer-support-canada', 'fr', '/services/centre-appels-ecommerce-quebec'],
        ['/savoir-faire/assistants-virtuels', 'fr', '/services/adjoint-virtuel-quebec'],
        ['/questions-frequentes', 'en', '/en/faq'],
        ['/en', 'fr', '/'],
        ['/', 'en', '/en'],
        ['/articles/choisir-centre-appels-ecommerce-quebec#section-2', 'en', '/en/articles/choosing-ecommerce-contact-centre-canada#section-2'],
    ]) {
        assert.equal(routing.publicLanguagePath(input, locale), expected);
    }
});

test('preserves non-content links and external URLs', () => {
    for (const value of ['#faq', 'mailto:contact@allocall.ca', 'tel:+15148509092', '/images/logo-allocall.png', '/dashboard', '//external.example/services', 'https://external.example/services']) {
        assert.equal(routing.publicLanguagePath(value, 'en', 'https://allocall.ca'), value);
    }
    assert.equal(routing.publicLanguagePath('https://allocall.ca/soumission?source=home', 'en', 'https://allocall.ca'), '/en/quote?source=home');
    assert.equal(routing.publicLanguagePath('https://external.example/services', 'fr', 'invalid'), 'https://external.example/services');
});

test('has a unique reciprocal URL for every public page', () => {
    const all = Object.values(paths).flatMap((locales) => Object.values(locales));
    assert.equal(new Set(all).size, all.length);
    for (const [logical, languages] of Object.entries(paths)) {
        for (const language of ['fr', 'en']) {
            assert.equal(routing.logicalPath(languages[language]), logical);
            for (const target of ['fr', 'en']) {
                assert.equal(routing.publicLanguagePath(languages[language], target), languages[target]);
            }
        }
    }
});

test('translates Quebec terminology and the complete e-commerce service', () => {
    assert.ok(!('undefined' in copy));
    assert.equal(translations.translate('Email', 'fr'), 'Courriel');
    assert.equal(translations.translate('Service Client', 'en'), 'Customer service outsourcing');
    assert.equal(translations.translate('Demander une soumission', 'fr'), 'Soumission en CAD');
    const ecommerce = json('resources/content/ecommerce.json');
    function verify(fr, en) {
        if (typeof fr === 'string') {
            assert.equal(typeof en, 'string');
            assert.equal(translations.translate(fr, 'en'), en);
        } else {
            for (const key of Object.keys(fr)) verify(fr[key], en[key]);
        }
    }
    verify(ecommerce.fr, ecommerce.en);
});
