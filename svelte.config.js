import path, { resolve } from 'node:path';
import { fileURLToPath } from 'url';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import autoprefixer from 'autoprefixer';
import postcssNested from 'postcss-nested';
import tailwindcss from 'tailwindcss';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('@sveltejs/kit').Config} */
const config = {
    preprocess: [
        vitePreprocess({
            postcss: {
                plugins: [postcssNested(), tailwindcss(path.resolve(__dirname, 'tailwind.config.cjs')), autoprefixer()],
            },
        }),
    ],
    kit: {
        adapter: adapter(),
        env: {
            dir: resolve('.', 'config'),
            publicPrefix: 'APP_',
        },
        alias: {
            $components: 'src/lib/components',
            $stores: 'src/lib/stores',
        },
    },
    vitePlugin: {
        inspector: true,
    },
};

export default config;
