import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslintPlugin from 'vite-plugin-eslint';
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      cache: false,
      include: ['src/**/*.js', 'src/**/*.jsx'],
      exclude: ['node_modules', '.git', 'dist'],
    }),
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "src/sass/_fonts.scss";
          @import "src/sass/_variables.scss";
        `,
      },
    },
  },
});
