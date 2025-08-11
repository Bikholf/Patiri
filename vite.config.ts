import tailwindcss from '@tailwindcss/vite';
import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [
        tailwindcss(),
        paraglideVitePlugin({
            project: './project.inlang',
            outdir: './src/paraglide',
            strategy: ["cookie", "baseLocale"],
        }),
        sveltekit()
    ],
    server: {
        fs: {
            strict: false
        },
        open: false  // Deaktiviert automatisches Öffnen des Browsers
    },
    optimizeDeps: {
        exclude: ['@auth/sveltekit', '@auth/core', '@auth/drizzle-adapter']
    },
    ssr: {
        noExternal: []
    },
    define: {
        global: 'globalThis'
    }
});
