import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

// Component tests (jsdom, Testing Library) are added in WP 4.1.
export default defineConfig({
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: {
    include: ['src/**/*.test.{ts,tsx}'],
    coverage: { provider: 'v8', include: ['src/**/*.{ts,tsx}'] },
  },
});
