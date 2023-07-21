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
      env: {
        jest: true,
        'jest/globals': true,
      },
      plugins: ['jest'],
      extends: ['plugin:jest/recommended'],
      rules: {
        // jest
        'jest/no-conditional-expect': 'error',
        'jest/no-identical-title': 'error',
        'jest/no-interpolation-in-snapshots': 'error',
        'jest/no-jasmine-globals': 'error',
        'jest/no-mocks-import': 'error',
        'jest/prefer-comparison-matcher': 'warn',
        'jest/prefer-equality-matcher': 'warn',
        'jest/prefer-expect-resolves': 'warn',
        'jest/prefer-spy-on': 'warn',
        'jest/prefer-strict-equal': 'warn',
        'jest/prefer-to-be': 'warn',
        'jest/prefer-to-contain': 'warn',
        'jest/prefer-to-have-length': 'warn',
        'jest/require-hook': ['warn', { allowedFunctionCalls: ['enableAutoDestroy'] }],
        'jest/require-top-level-describe': 'warn',
        'jest/valid-describe-callback': 'warn',
        'jest/valid-expect': 'warn',
        'jest/valid-expect-in-promise': 'warn',
        'jest/valid-title': ['error', { ignoreTypeOfDescribeName: true }],
      },
    },
  ],
};
