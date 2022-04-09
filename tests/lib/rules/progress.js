const { RuleTester } = require('eslint');

const progress = require('../../../lib/rules/progress.js');

const ruleTester = new RuleTester({
  parserOptions: { ecmaVersion: 2022, sourceType: 'module' },
});

// Should not emit any reports
ruleTester.run('progress-indicator', progress, {
  valid: [
    {
      code: 'const a = "Hello World!";',
    },
  ],
  invalid: [],
});
