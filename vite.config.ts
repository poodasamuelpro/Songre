import { defineConfig } from 'vite';
import build from '@hono/vite-build/cloudflare-pages';

export default defineConfig(({ mode }) => ({
  plugins: [
    build({
      entry: 'src/index.tsx',
    }),
  ],
  build: {
    outDir: 'dist',
    minify: 'esbuild',
    sourcemap: mode === 'development',
    target: 'es2022',
    rollupOptions: {
      external: ['__STATIC_CONTENT_MANIFEST'],
    },
  },
  esbuild: {
    jsxFactory: 'jsx',
    jsxFragment: 'Fragment',
  },
}));
