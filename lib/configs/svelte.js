'use strict';

const base = require('./base.js');

module.exports = {
  extends: ['plugin:@dvcol/presets/typescript', 'plugin:svelte/recommended', 'plugin:@dvcol/presets/prettier'],
  plugins: ['@dvcol/presets', '@typescript-eslint', 'svelte', 'prettier', 'import'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    extraFileExtensions: ['.svelte', '.svx'],
  },
  overrides: [
    {
      // To enable linting on those file without specifying extensions
      files: ['*.js', '*.ts'],
    },
    ...base.overrides,
    {
      files: ['*.svelte', '*.svx'],
      parser: 'svelte-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      rules: {
        'import/no-mutable-exports': 'off',
      },
    },
  ],
};
