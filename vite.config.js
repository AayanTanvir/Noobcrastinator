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
            },
        },
        outDir: "dist",
    },
    minify: false,
    sourcemap: true,
})
