import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: 'jenkins-f2e-demo', // 基本 URL 路徑，根據不同模式設定不同路徑
  plugins: [react()],
});
