import { resolve } from 'node:path';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, loadEnv, type ConfigEnv } from 'vite';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';

export default defineConfig((config: ConfigEnv) => {
    const configPath: string = resolve(process.cwd(), 'config', process.env['NODE_ENV'] ?? '');
    process.env = { ...process.env, ...loadEnv(config.mode, configPath) };

    console.log(`\n✨ \x1b[32mInitializing Vite [MODE: ${config.mode}]\x1b[0m`);

    return {
        plugins: [sveltekit(), purgeCss()],
        server: {
            host: process.env['APP_HOST'] ?? '0.0.0.0',
            port: parseInt(process.env['APP_PORT'] ?? '5173'),
            strictPort: true,
        },
    };
});
