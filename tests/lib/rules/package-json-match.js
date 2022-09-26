"use strict";

const rule = require("../../../lib/rules/package-json-match");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester();
const parser = require.resolve("../../../lib/parsers/json-parser.js");

const valid = (options, json, filename = 'package.json') => {
  return {
    code: JSON.stringify(json),
    filename,
    parser,
    options: [ options ],
  };
};

const invalid = (options, json, ...messages) => {
  return {
    code: JSON.stringify(json),
    filename: 'package.json',
    parser,
    options: [ options ],
    errors: messages?.map(m => ({ message: m })),
  };
};

const options = {
  required: false,
  match: {
    version: '[0-9]\.[0-9]\.[0-9]',
    scripts: {
      build: "tsc",
      lint: "eslint .",
      stylelint: "stylelint ."
    },
    author: "^@dvcol.*"
  }
}

const json = {
  name: "@dvcol/packageName",
  version: '2.3.4',
  scripts: {
    build: 'tsc .',
    dev: "tsc -w",
    lint: "eslint .",
  },
  author: "@dvcol"
}

const invalidJson = {
  ...json,
  version: '1.B.C',
  scripts: {
    build: 'webpack'
  },
  author: "@dcc"
}

ruleTester.run(`package-json-fields-match`, rule, {
  valid: [
    valid(options, json),
    valid(options, json, "/something/package.json"),
    valid(options, {}, "/something/notPackage.json"),
  ],

  invalid: [
    // field does not match
    invalid(options,
      { ...invalidJson, name: 'doesNotMatch', },
      "Field 'version' does not match value '[0-9].[0-9].[0-9]'",
      "Field 'scripts.build' does not match value 'tsc'",
      "Field 'author' does not match value '^@dvcol.*'",
    ),
    // field does not match and is required
    invalid({
        ...options,
        required: true
      },
      { ...invalidJson, name: 'doesNotMatchRequired', },
      "Field 'version' does not match value '[0-9].[0-9].[0-9]'",
      "Required field 'scripts.lint' is missing.",
      "Required field 'scripts.stylelint' is missing.",
      "Field 'scripts.build' does not match value 'tsc'",
      "Field 'author' does not match value '^@dvcol.*'",
    ),
    // field does not match and some are required
    invalid({
        ...options,
        required: {
          author: true,
          "scripts.stylelint": true
        }
      },
      { ...invalidJson, name: 'doesNotMatchSomeRequired', },
      "Field 'version' does not match value '[0-9].[0-9].[0-9]'",
      "Required field 'scripts.stylelint' is missing.",
      "Field 'scripts.build' does not match value 'tsc'",
      "Field 'author' does not match value '^@dvcol.*'",
    ),
  ],
});
