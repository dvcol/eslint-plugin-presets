"use strict";

const rule = require("../../../lib/rules/package-json/required");
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
  required: [ 'name', 'script', 'script.dev' ],
  banned: [ 'forbidden', 'script.forbidden' ]
}

const json = {
  name: "@dvcol/packageName",
  script: {
    build: 'tsc .',
    dev: "tsc -w"
  }
}

ruleTester.run(`package-json-fields-required`, rule, {
  valid: [
    valid(options, json),
    valid(options, json, "/something/package.json"),
    valid(options, {}, "/something/notPackage.json"),
  ],

  invalid: [
    // missing required
    invalid({ required: [ 'missing', 'nested.missing' ] }, json, "Required field 'missing' is missing.", "Required field 'nested.missing' is missing."),
    // has banned
    invalid(options, {
      ...json,
      forbidden: "something",
      script: { ...json.script, forbidden: "else" }
    }, "Field 'script.forbidden' is banned.", "Field 'forbidden' is banned."),
    // missing required and has banned
    invalid(options, {
      ...json,
      script: { build: "tsc" },
      forbidden: "something"
    }, "Required field 'script.dev' is missing.", "Field 'forbidden' is banned.",),
  ],
});
