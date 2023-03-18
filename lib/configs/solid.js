'use strict';

module.exports = {
  extends: [
    'plugin:jsx-a11y/recommended',
    'plugin:@dvcol/presets/typescript',
    'plugin:@dvcol/presets/prettier',
    'plugin:solid/typescript',
  ],
  plugins: ['@dvcol/presets', 'solid', '@typescript-eslint', 'prettier', 'import', 'jsx-a11y'],
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
  overrides: [
    {
      // To enable linting on those file without specifying extensions
      files: ['*.js', '*.jsx', '*.ts', '*.tsx'],
    },
  ],
};
