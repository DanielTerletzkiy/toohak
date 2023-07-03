import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        proxy: {
            "/api": "localhost:3000",
            "/socket.io": {
                target: "ws://localhost:3080",
                ws: true,
            },
        },
    }
})
