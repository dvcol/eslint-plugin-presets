'use strict';

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
