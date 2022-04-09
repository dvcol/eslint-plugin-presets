'use strict';

module.exports = {
  extends: [
    'react-app',
    'react-app/jest',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@dvcol/presets/typescript',
    'plugin:@dvcol/presets/prettier',
  ],
  plugins: ['@dvcol/presets', 'react', 'react-hooks', '@typescript-eslint', 'prettier', 'import', 'jsx-a11y'],
  parserOptions: {
    project: './tsconfig.json',
  },
  settings: {
    react: {
      version: '^17.0',
    },
  },
  globals: {
    React: true,
    JSX: true,
  },
};
