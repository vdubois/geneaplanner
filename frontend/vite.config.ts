import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const build = {
    chunkSizeWarningLimit: 1500,
}

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build
})
