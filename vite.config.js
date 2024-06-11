import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://47.128.243.240',
        changeOrigin: true,
        secure: false, // Mengabaikan kesalahan sertifikat self-signed
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
