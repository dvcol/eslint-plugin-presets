'use strict';

const base = require('./base.js');

module.exports = {
  extends: ['plugin:@dvcol/presets/typescript', 'plugin:@dvcol/presets/prettier'],
  plugins: ['@dvcol/presets', 'svelte3', '@typescript-eslint', 'prettier', 'import'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  settings: {
    'svelte3/typescript': true, // load TypeScript as peer dependency
  },
  overrides: [
    {
      // To enable linting on those file without specifying extensions
      files: ['*.js', '*.ts', '*.svelte'],
    },
    ...base.overrides,
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
    },
  ],
};
