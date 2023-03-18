'use strict';

module.exports = {
  extends: [
    'plugin:solid/typescript',
    'plugin:jsx-a11y/recommended',
    'plugin:@dvcol/presets/typescript',
    'plugin:@dvcol/presets/prettier',
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
};
