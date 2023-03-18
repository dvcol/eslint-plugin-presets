'use strict';

module.exports = {
  extends: [
    'plugin:solid/typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:@dvcol/presets/typescript',
    'plugin:@dvcol/presets/prettier',
  ],
  plugins: ['@dvcol/presets', 'svelte3', '@typescript-eslint', 'prettier', 'import', 'jsx-a11y'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
  },
  globals: {
    JSX: true,
  },
  settings: {
    'svelte3/typescript': true, // load TypeScript as peer dependency
  },
  overrides: [
    {
      // To enable linting on those file without specifying extensions
      files: ['*.js', '*.jsx', '*.ts', '*.tsx', '*.svelte'],
    },
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
    },
  ],
};
