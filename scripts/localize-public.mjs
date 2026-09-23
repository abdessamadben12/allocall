import fs from 'node:fs';
import ts from 'typescript';

const components = ['About', 'Contact', 'Footer', 'Hero', 'app', 'featchuresection', 'global-presence', 'industries', 'marketing-content-page', 'metiers', 'MyQuotes', 'navbar', 'QuoteRequest', 'services', 'whatsapp-button'];
const pages = ['welcome', 'contact', 'propos', 'devis', 'services/index', 'services/show', 'industries/index', 'industries/show', 'solutions-ia'];
const files = [...components.map(name => `resources/js/components/pages/${name}.tsx`), ...pages.map(name => `resources/js/pages/${name}.tsx`)];
const dataFiles = ['services', 'industry-details', 'industry-overview', 'ai-solutions', 'industry-pages', 'site'].map(name => `resources/js/data/${name}.ts`);
const textFields = new Set(['title', 'subtitle', 'description', 'summary', 'name', 'label', 'people', 'sites', 'note', 'linkLabel', 'seoTitle', 'seoDescription', 'eyebrow', 'intro', 'body', 'items', 'materials', 'details', 'caption', 'flow', 'steps', 'ctaBody', 'ctaTitle', 'imageAlt', 'text', 'cta', 'secondaryCta', 'conclusion', 'address', 'whatsappMessage', 'alt']);
const identifiers = new Set(['item', 'paragraph', 'step', 'title', 'description', 'label', 'caption', 'material', 'detail', 'benefit', 'point']);
const textAttributes = new Set(['title', 'alt', 'placeholder', 'aria-label', 'description']);
const collected = new Map();
const normalize = value => value.replace(/\s+/g, ' ').trim();
function collect(value, file) {
    const key = normalize(value);
    if (key && /[a-zA-Z\u00c0-\u017f]/.test(key) && !/^https?:|^mailto:|^tel:|^\//.test(key)) {
        if (!collected.has(key)) collected.set(key, new Set());
        collected.get(key).add(file);
    }
}
function jsxText(text) {
    const output = ts.transpileModule(`const x = <span>${text}</span>;`, { compilerOptions: { jsx: ts.JsxEmit.React } }).outputText;
    const ast = ts.createSourceFile('text.js', output, ts.ScriptTarget.Latest, true);
    let result = '';
    const visit = node => {
        if (ts.isCallExpression(node) && node.arguments[2] && ts.isStringLiteral(node.arguments[2])) result = node.arguments[2].text;
        ts.forEachChild(node, visit);
    };
    visit(ast);
    return result;
}
function componentFor(node) {
    for (let current = node.parent; current; current = current.parent) {
        if (ts.isFunctionDeclaration(current) && current.name && /^[A-Z]/.test(current.name.text)) return current;
        if (ts.isArrowFunction(current) && ts.isVariableDeclaration(current.parent) && /^[A-Z]/.test(current.parent.name.getText())) return current;
    }
}
for (const file of [...files, ...dataFiles]) {
    const source = fs.readFileSync(file, 'utf8');
    const ast = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, file.endsWith('tsx') ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
    const edits = [], hooks = new Set();
    const edit = (node, value) => {
        const component = componentFor(node);
        if (!component) return;
        hooks.add(component);
        edits.push({ start: node.getStart(ast), end: node.end, value });
    };
    const literal = value => JSON.stringify(value);
    const visit = node => {
        if (ts.isPropertyAssignment(node) && textFields.has(node.name.getText(ast).replace(/['"]/g, ''))) {
            const strings = child => {
                if (ts.isStringLiteral(child) || ts.isNoSubstitutionTemplateLiteral(child)) collect(child.text, file);
                else ts.forEachChild(child, strings);
            };
            strings(node.initializer);
        }
        if (ts.isJsxText(node)) {
            const value = jsxText(node.getText(ast));
            if (normalize(value)) {
                collect(value, file);
                edit(node, `{t(${literal(value)})}`);
            }
            return;
        }
        if (ts.isJsxAttribute(node) && textAttributes.has(node.name.getText(ast)) && node.initializer) {
            const value = node.initializer;
            if (ts.isStringLiteral(value) && normalize(value.text)) {
                const decoded = jsxText(value.text);
                collect(decoded, file);
                edit(value, `{t(${literal(decoded)})}`);
            } else if (ts.isJsxExpression(value) && value.expression) {
                const expression = value.expression;
                if (ts.isTemplateExpression(expression)) {
                    let key = expression.head.text;
                    expression.templateSpans.forEach((span, index) => { key += `{${index}}` + span.literal.text; });
                    collect(key, file);
                    edit(expression, `t(${literal(key)}, [${expression.templateSpans.map(span => span.expression.getText(ast)).join(', ')}])`);
                } else if (ts.isPropertyAccessExpression(expression) || ts.isIdentifier(expression)) {
                    edit(expression, `t(${expression.getText(ast)})`);
                } else {
                    const strings = child => {
                        if (ts.isStringLiteral(child) && normalize(child.text)) { collect(child.text, file); edit(child, `t(${literal(child.text)})`); }
                        else ts.forEachChild(child, strings);
                    };
                    strings(expression);
                }
            }
            return;
        }
        if (ts.isJsxExpression(node) && node.expression && !ts.isJsxAttribute(node.parent)) {
            const expression = node.expression;
            if ((ts.isPropertyAccessExpression(expression) && textFields.has(expression.name.text) && !/^(quote|submittedQuote|data|errors|submissionStatus)\./.test(expression.getText(ast))) ||
                (ts.isIdentifier(expression) && identifiers.has(expression.text))) {
                edit(expression, `t(${expression.getText(ast)})`);
                return;
            }
            if (ts.isStringLiteral(expression) && normalize(expression.text)) {
                collect(expression.text, file);
                edit(expression, `t(${literal(expression.text)})`);
                return;
            }
            if (ts.isConditionalExpression(expression)) {
                for (const part of [expression.whenTrue, expression.whenFalse]) {
                    if (ts.isStringLiteral(part) && normalize(part.text)) { collect(part.text, file); edit(part, `t(${literal(part.text)})`); }
                }
                return;
            }
        }
        ts.forEachChild(node, visit);
    };
    visit(ast);
    if (process.argv.includes('--write') && files.includes(file)) {
        for (const hook of hooks) {
            if (ts.isBlock(hook.body)) edits.push({ start: hook.body.getStart(ast) + 1, end: hook.body.getStart(ast) + 1, value: '\nconst { t } = useLocale();\n' });
            else {
                edits.push({ start: hook.body.getStart(ast), end: hook.body.getStart(ast), value: '{ const { t } = useLocale(); return ' });
                edits.push({ start: hook.body.end, end: hook.body.end, value: '; }' });
            }
        }
        let result = source;
        for (const change of edits.sort((a, b) => b.start - a.start)) result = result.slice(0, change.start) + change.value + result.slice(change.end);
        if (hooks.size) result = "import { useLocale } from '@/lib/i18n';\n" + result;
        // Internal links must keep the selected language on SPA navigation.
        result = result.replace(/import\s*\{([^}]*\bLink\b[^}]*)\}\s*from\s*['"]@inertiajs\/react['"];?/g, (_, names) => {
            const rest = names.split(',').map(name => name.trim()).filter(name => name && name !== 'Link');
            return "import { Link } from '@/components/localized-link';\n" + (rest.length ? `import { ${rest.join(', ')} } from '@inertiajs/react';` : '');
        });
        fs.writeFileSync(file, result);
    }
}
const records = [...collected].map(([source, origins], id) => ({ id, source, files: [...origins] }));
fs.writeFileSync('resources/js/locales/sources.json', JSON.stringify(records, null, 2) + '\n');
console.log(`Extracted ${records.length} messages`);
