'use strict';

module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:eslint-plugin/recommended',
    'plugin:node/recommended',
    'plugin:prettier/recommended',
  ],
  env: {
    node: true,
    es2022: true,
  },
  parserOptions: {
    sourceType: 'module',
  },
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'warn',
      {
        printWidth: 120,
        singleQuote: true,
        trailingComma: 'all',
        arrowParens: 'avoid',
      },
    ],
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
  },
  overrides: [
    {
      files: ['tests/**/*.js'],
      env: { mocha: true },
    },
  ],
};
