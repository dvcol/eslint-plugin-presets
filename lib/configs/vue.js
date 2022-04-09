'use strict';

module.exports = {
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@dvcol/presets/typescript',
    'plugin:@dvcol/presets/jest',
    'plugin:@dvcol/presets/prettier',
  ],
  plugins: ['@dvcol/presets', 'vuejs-accessibility'],
  rules: {
    // eslint-plugin-vue see https://eslint.vuejs.org/rules/

    // Override recommended
    'vue/max-attributes-per-line': [
      'warn',
      {
        singleline: {
          max: 5,
        },
        multiline: {
          max: 1,
        },
      },
    ],
    'vue/require-default-prop': 'off',
    'vue/no-setup-props-destructure': 'warn', // loose reactivity after transform
    'vue/component-tags-order': [
      'error',
      {
        order: ['script', 'template', 'style'],
      },
    ],

    // Optionals
    'vue/component-api-style': ['error', ['script-setup', 'composition']],
    'vue/component-name-in-template-casing': [
      'warn',
      'PascalCase',
      {
        registeredComponentsOnly: true,
        ignores: [],
      },
    ],
    'vue/require-name-property': 'warn',
    'vue/component-options-name-casing': ['warn', 'PascalCase'],
    'vue/custom-event-name-casing': [
      'warn',
      'camelCase',
      {
        ignores: [],
      },
    ],
    'vue/match-component-file-name': [
      'warn',
      {
        extensions: ['.ts', '.tsx', '.vue'],
        shouldMatchCase: true,
      },
    ],
    'vue/no-bare-strings-in-template': 'warn', // enforce internationalization in template,
    'vue/no-boolean-default': ['warn', 'default-false'],
    'vue/no-child-content': 'warn', // no child content for v-html and v-text
    'vue/no-duplicate-attr-inheritance': 'warn',
    'vue/no-empty-component-block': 'warn', // no empty script, style or template tags
    'vue/no-reserved-component-names': [
      'warn',
      {
        disallowVueBuiltInComponents: true,
      },
    ],
    'vue/no-undef-components': 'warn',
    'vue/no-undef-properties': 'warn',
    'vue/no-unused-refs': 'warn',
    'vue/prefer-separate-static-class': 'warn',
    'vue/prefer-true-attribute-shorthand': 'warn',
    'vue/require-emit-validator': 'warn', // Type validator for emit array

    // template
    'vue/eqeqeq': ['warn', 'smart'],
    'vue/object-shorthand': ['warn', 'consistent'],
    'prefer-template': 'warn',
    'vue/quote-props': ['warn', 'consistent-as-needed'],
    'vue/template-curly-spacing': ['warn', 'always'],
  },
  overrides: [
    {
      files: ['*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
      },
      rules: {
        'no-unused-vars': 'off',
        'no-undef': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
};
