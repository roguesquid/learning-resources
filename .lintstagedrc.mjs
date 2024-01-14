export default {
    '*.{html,css,scss,postcss,json,svelte}': [
        'prettier --write --plugin prettier-plugin-svelte --plugin @ianvs/prettier-plugin-sort-imports',
    ],
    '*.{js,ts}': ['prettier --write', 'eslint --report-unused-disable-directives --fix'],
};
