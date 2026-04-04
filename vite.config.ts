import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <-- 1. 引入 Tailwind 插件

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // <-- 2. 激活插件
  ],
  server: {
    proxy: {
      // 代理 CSDN 热榜 API，解决前端跨域问题
      '/api/csdn': {
        target: 'https://blog.csdn.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/csdn/, ''),
      },
    },
  },
})