import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);


const base = './';

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
