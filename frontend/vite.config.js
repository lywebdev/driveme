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
                    @import "src/app/styles/_fonts.scss";
                    @import "src/app/styles/_variables.scss";
                    @import "src/app/styles/_mixins.scss";
                `,
            },
        },
    },
    resolve: {
        alias: {
            '@components': '/src/components',
            '@pages': '/src/pages',
            '@layouts': '/src/components/layouts',
            '@errors': '/src/components/Errors',
            '@config': '/src/config',
            '@store': '/src/store',
            '@data': '/src/data',
            '@helpers': '/src/helpers',
            '@images': '/src/app/assets/images',
            '@public': '/public',
        }
    }
});
