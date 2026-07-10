import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],

    esbuild: {
        jsx: 'automatic',
    },

    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    react: ['react', 'react-dom'],
                    inertia: ['@inertiajs/react'],
                    ui: ['lucide-react', 'framer-motion'],
                },
            },
        },
    },

    resolve: {
        alias: {
            '@image': fileURLToPath(new URL('./resources/js/image', import.meta.url)),
        },
    },

    server: {
        host: '0.0.0.0',
        port: 5173,
        strictPort: true,

        allowedHosts: [
            'overpay-sagging-robust.ngrok-free.dev',
        ],

        cors: {
            origin: [
              'https://overpay-sagging-robust.ngrok-free.devv/',
                'http://localhost:8000',
                'http://127.0.0.1:8000',
                "http://localhost:5173"
            ],
            credentials: true,
        },

        hmr: {
            host: 'https://overpay-sagging-robust.ngrok-free.devv/',
            protocol: 'wss',
            clientPort: 443,
        },
        // hmr: {
        //     host: 'localhost',
        //     protocol: 'http',
        //     clientPort: 5173,
        // },
    },
});
