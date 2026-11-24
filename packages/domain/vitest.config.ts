import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      // Gate arrives in WP 2.4 (domain hardening). Uncomment then:
      // thresholds: { lines: 90, functions: 90, branches: 90, statements: 90 },
    },
  },
});
