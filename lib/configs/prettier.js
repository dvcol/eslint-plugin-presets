'use strict';

module.exports = {
  extends: ['plugin:prettier/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': [
      'warn',
      {
        printWidth: 150,
        singleQuote: true,
        trailingComma: 'all',
        arrowParens: 'avoid',
        bracketSpacing: true,
        bracketSameLine: true,
      },
    ],
    'arrow-body-style': 'off',
    'prefer-arrow-callback': 'off',
  },
};
