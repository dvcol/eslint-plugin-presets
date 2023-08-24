'use strict';

module.exports = {
  overrides: [
    {
      files: ['*.spec.*', '*.test.*', '*.mock.*'],
      rules: {
        // Basic rules
        'no-console': 'off',
      },
    },
    {
      files: ['**/__tests__/**/*', '**/*.{spec,test}.*'],
      plugins: ['vitest'],
      extends: ['plugin:vitest/all'],
      rules: {
        'consistent-test-filename': 'off',
      },
    },
  ],
};
