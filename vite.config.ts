import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import checker from 'vite-plugin-checker';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    checker({
      typescript: { tsconfigPath: './tsconfig.app.json' },
      eslint: { lintCommand: 'eslint .', useFlatConfig: true },
      overlay: {
        initialIsOpen: true,
        position: 'br',
      },
      enableBuild: false,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@app': path.resolve(__dirname, 'src/app'),
      '@assets': path.resolve(__dirname, 'src/app/assets'),

      '@components': path.resolve(__dirname, 'src/components'),
      '@shadcn': path.resolve(__dirname, 'src/shared/shadcn'),

      '@shared': path.resolve(__dirname, 'src/shared'),
      '@utils': path.resolve(__dirname, 'src/shared/utils'),
      '@lib': path.resolve(__dirname, 'src/shared/lib'),

      '@feature': path.resolve(__dirname, 'src/feature'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@widgets': path.resolve(__dirname, 'src/widgets'),
      '@entities': path.resolve(__dirname, 'src/entities'),
    },
  },
});
