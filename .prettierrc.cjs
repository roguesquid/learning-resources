/** @type {import("prettier").Config} */
module.exports = {
    tabWidth: 4,
    useTabs: false,
    printWidth: 120,
    singleQuote: true,
    arrowParens: 'always',
    bracketSameLine: true,
    bracketSpacing: true,
    embeddedLanguageFormatting: 'auto',
    htmlWhitespaceSensitivity: 'css',
    proseWrap: 'preserve',
    quoteProps: 'as-needed',
    semi: true,
    trailingComma: 'all',
    plugins: ['prettier-plugin-svelte', 'prettier-plugin-tailwindcss', '@ianvs/prettier-plugin-sort-imports'],
    singleAttributePerLine: false,
    tailwindAttributes: ['sectionClass'],
    importOrderParserPlugins: ['typescript', 'classProperties', 'importAttributes', 'decorators-legacy'],
    importOrderTypeScriptVersion: '5.3.3',
    importOrder: [
        '',
        '^svelte(/.*)?$',
        '',
        '<BUILTIN_MODULES>',
        '<THIRD_PARTY_MODULES>',
        '',
        '^\\$env(/.*)$',
        '^\\$app(/.*)$',
        '',
        '^\\$lib/(.*)$',
        '^\\$stores/(.*)$',
        '',
        '^\\$components/(.*)$',
        '',
        '^(\\$assets)(/.*)$',
        '',
        '^src(/.*)$',
        '^[./]',
    ],
    overrides: [
        {
            files: '*.svelte',
            options: {
                parser: 'svelte',
                htmlWhitespaceSensitivity: 'css',
                useTabs: false,
                vueIndentScriptAndStyle: true,
                svelteSortOrder: 'options-scripts-markup-styles',
                svelteStrictMode: true,
                svelteAllowShorthand: false,
                svelteIndentScriptAndStyle: true,
            },
        },
        {
            files: '*.postcss',
            options: {
                tabWidth: 2,
            },
        },
        {
            files: '*.html',
            options: {
                tabWidth: 2,
            },
        },
        {
            files: ['*.yml', '*.yaml'],
            options: {
                parser: 'yaml',
                tabWidth: 2,
            },
        },
        {
            files: '*.md',
            options: {
                tabWidth: 2,
            },
        },
        {
            files: '*.svg',
            options: {
                tabWidth: 4,
            },
        },
    ],
}