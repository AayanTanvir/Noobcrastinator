import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
    ],
    build: {
        rollupOptions: {
            input: {
                popup: resolve(__dirname, 'popup.html'),
                blockedSites: resolve(__dirname, 'blockedSites.html'),
                blockedSite: resolve(__dirname, 'blockedSite.html'),
                options: resolve(__dirname, 'options.html'),
                background: resolve(__dirname, 'src/background.js'),
            },
            output: {
                entryFileNames: '[name].js',
            },
            external: ['fsevents'],
        },
        outDir: "dist",
    },
    minify: false,
    sourcemap: true,
})
