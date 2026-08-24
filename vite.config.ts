import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  const strapiTarget = process.env.VITE_STRAPI_API_URL || 'http://localhost:1337';

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
      // Same-origin proxy so the browser can reach Strapi without CORS issues.
      proxy: {
        '/api': {
          target: strapiTarget,
          changeOrigin: true,
        },
        '/uploads': {
          target: strapiTarget,
          changeOrigin: true,
        },
      },
    },
  };
});
