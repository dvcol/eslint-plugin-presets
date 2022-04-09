'use strict';

const base = require('./base.js');

module.exports = {
  extends: ['plugin:import/typescript', 'plugin:@typescript-eslint/recommended', 'plugin:@dvcol/presets/base'],
  plugins: ['@dvcol/presets', '@typescript-eslint', 'import'],
  settings: {
    'import/resolver': {
      node: { extensions: ['.js', '.jsx', '.mjs', '.ts', '.tsx', '.d.ts'] },
    },
  },
  overrides: base.overrides,
  rules: {
    // import
    'import/no-import-module-exports': [
      'error',
      {
        exceptions: ['**/*/*.ts', '**/*/*.tsx'],
      },
    ],

    // TS
    '@typescript-eslint/semi': ['warn', 'always'],
    '@typescript-eslint/ban-ts-comment': ['error', { 'ts-ignore': 'allow-with-description' }],
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/type-annotation-spacing': ['warn', {}],
    '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports', disallowTypeAnnotations: false }],
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/consistent-indexed-object-style': 'off',
    '@typescript-eslint/prefer-ts-expect-error': 'warn',

    // Override JS
    'no-undef': 'off',
    'no-useless-constructor': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    indent: 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', ignoreRestSiblings: true }],
    'no-redeclare': 'off',
    '@typescript-eslint/no-redeclare': 'error',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error', { functions: false, classes: false, variables: true }],
    'brace-style': 'off',
    '@typescript-eslint/brace-style': ['warn', 'stroustrup', { allowSingleLine: true }],
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': ['warn', 'always-multiline'],
    'object-curly-spacing': 'off',
    '@typescript-eslint/object-curly-spacing': ['warn', 'always'],

    // off
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-namespace': 'off',
  },
};
