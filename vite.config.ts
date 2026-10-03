import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    server: {
        watch: {
            // Static font binaries do not need HMR and can be locked by
            // Windows font preview, antivirus, or indexing services.
            ignored: ['**/public/assets/fonts/**'],
        },
    },
})
