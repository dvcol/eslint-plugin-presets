'use strict';

const base = require('./base.js');

module.exports = {
  extends: [
    'plugin:solid/typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:@dvcol/presets/typescript',
    'plugin:@dvcol/presets/prettier',
  ],
  plugins: ['@dvcol/presets', 'solid', '@typescript-eslint', 'prettier', 'import', 'jsx-a11y'],
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
    extraFileExtensions: ['.jsx', '.tsx'],
  },
  globals: {
    JSX: true,
  },
  overrides: [
    {
      // To enable linting on those file without specifying extensions
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
    },
    ...base.overrides,
  ],
};
