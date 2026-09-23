import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

// Exercise the pure URL and message helpers without mounting Inertia or React.
const source = fs.readFileSync('resources/js/lib/i18n.ts', 'utf8');
const ast = ts.createSourceFile('i18n.ts', source, ts.ScriptTarget.Latest, true);
const functions = ast.statements.filter(node => ts.isFunctionDeclaration(node) && ['translate', 'languagePath'].includes(node.name?.text));
const js = ts.transpileModule(functions.map(node => node.getText(ast)).join('\n'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const messages = JSON.parse(fs.readFileSync('resources/js/locales/en.json', 'utf8'));
const context = { exports: {}, messages, URL };
vm.runInNewContext(js, context);
const { translate, languagePath } = context.exports;

for (const [input, locale, expected] of [
    ['/', 'en', '/en'], ['/en', 'fr', '/'],
    ['/services', 'en', '/en/services'], ['/en/services', 'en', '/en/services'],
    ['/en/services', 'fr', '/services'],
    ['/industries#sante', 'en', '/en/industries#sante'],
    ['/en/industries#sante', 'fr', '/industries#sante'],
    ['/devis?service=Virtual%20assistant', 'en', '/en/devis?service=Virtual%20assistant'],
    ['/en?utm_source=test', 'fr', '/?utm_source=test'],
    ['/?utm_source=test', 'en', '/en?utm_source=test'],
    ['#services', 'en', '#services'],
    ['tel:+15145550100', 'en', 'tel:+15145550100'],
    ['mailto:contact@example.com', 'en', 'mailto:contact@example.com'],
    ['https://outside.example/contact', 'en', 'https://outside.example/contact'],
    ['//outside.example/contact', 'en', '//outside.example/contact'],
    ['https://allocall.example/contact', 'en', '/en/contact'],
    ['/dashboard', 'en', '/dashboard'], ['/images/maps.svg', 'en', '/images/maps.svg'],
]) {
    assert.equal(languagePath(input, locale, 'https://allocall.example'), expected);
}
assert.equal(translate('Nom complet', 'fr'), 'Nom complet');
assert.equal(translate('Nom complet', 'en'), 'Full name');
assert.equal(translate(' Afficher {0} ', 'en', ['Canada']), ' Show Canada ');
assert.equal(translate('Unknown content', 'en'), 'Unknown content');
assert.equal(translate('Nom\n  complet', 'en'), 'Full name');

console.log('Localization helpers: 23 assertions passed.');
