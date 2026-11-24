import js from '@eslint/js';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

// Project rules are enforced by tools, not remembered (see AGENTS.md).
const noFloatMoney = {
  selector:
    "CallExpression[callee.name='parseFloat'], CallExpression[callee.property.name='parseFloat']",
  message: 'Money is integer piasters. Do not use parseFloat; parse EGP strings with string logic.',
};
const noDangerousHtml = {
  selector: "JSXAttribute[name.name='dangerouslySetInnerHTML']",
  message: 'dangerouslySetInnerHTML is forbidden (NFR-SEC-01). Render text; React escapes it.',
};
const noClock = [
  {
    selector: "NewExpression[callee.name='Date'][arguments.length=0]",
    message: 'Domain functions never read the clock. Take `today` as a parameter.',
  },
  {
    selector: "CallExpression[callee.object.name='Date'][callee.property.name='now']",
    message: 'Domain functions never read the clock. Take `today` as a parameter.',
  },
];

export default tseslint.config(
  {
    ignores: [
      '**/dist/**',
      '**/coverage/**',
      '**/node_modules/**',
      '**/storybook-static/**',
      '**/playwright-report/**',
      'apps/web/public/mockServiceWorker.js',
    ],
  },

  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: { projectService: true, tsconfigRootDir: import.meta.dirname },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/consistent-type-imports': ['error', { fixStyle: 'inline-type-imports' }],
      '@typescript-eslint/no-floating-promises': 'error',
      'no-restricted-syntax': ['error', noFloatMoney],
    },
  },

  // React app
  {
    files: ['apps/web/**/*.{ts,tsx}'],
    languageOptions: { globals: globals.browser },
    plugins: { 'react-refresh': reactRefresh },
    extends: [reactHooks.configs.flat['recommended-latest'], jsxA11y.flatConfigs.recommended],
    rules: {
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'no-restricted-syntax': ['error', noFloatMoney, noDangerousHtml],
    },
  },

  // Domain purity: no framework, no other packages, no clock.
  {
    files: ['packages/domain/**/*.ts'],
    rules: {
      'no-restricted-syntax': ['error', noFloatMoney, ...noClock],
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['react', 'react-*', 'zod', '@gam3iya/*', '@/*'],
              message: 'packages/domain is pure TypeScript: no framework and no other packages.',
            },
          ],
        },
      ],
    },
  },

  // Plain JS config files are not part of a TypeScript project.
  {
    files: ['**/*.js'],
    extends: [tseslint.configs.disableTypeChecked],
    languageOptions: { globals: globals.node },
  },
);
