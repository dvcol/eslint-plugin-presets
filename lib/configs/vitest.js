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
      rules: {
        'vitest/no-skip-test': 'warn',
        'vitest/lower-case-title': 'warn',
        'vitest/assertion-type': 'warn',
        'vitest/no-idential-title': 'error',
        'vitest/no-conditional-in-test': 'warn',
        'vitest/max-nested-describe': 'error',
      },
    },
  ],
};
