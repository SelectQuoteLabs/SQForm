import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {peerDependencies, dependencies} from './package.json';

export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'classic',
      exclude: '*.stories',
    }),
  ],
  build: {
    minify: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'doh',
      formats: ['es', 'cjs'],
      fileName: (format) => `doh.${format}.js`,
    },
    rollupOptions: {
      external: [
        ...Object.keys(peerDependencies),
        ...Object.keys(dependencies),
      ],
    },
    sourcemap: true,
  },
});