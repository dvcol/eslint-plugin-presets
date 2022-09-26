"use strict";

const rule = require("../../../lib/rules/package-json-name");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester();
const parser = require.resolve("../../../lib/parsers/json-parser.js");

const valid = (name) => {
  return {
    code: JSON.stringify({ name }),
    parser,
  };
};

const invalid = (name, ...messages) => {
  return {
    code: JSON.stringify({ name }),
    parser,
    errors: messages?.map(m => ({ message: m })),
  };
};

ruleTester.run(`package-json-name`, rule, {
  valid: [
    valid("basicname"),
    valid("name.with.doths"),
    valid("name-with-dashes"),
    valid("123"),
    valid("1-23"),
    valid("_"),
    valid("@scope/name"),
    valid("@scope/_"),
    valid("@sco-pe/name"),
    valid("@sco.pe/name"),
    valid("@_/name"),
    valid("@123/name"),
  ],

  invalid: [
    invalid(".start-with-dot", "Package name '.start-with-dot' can't start with a dot"),
    invalid("-start-with-dash", "Package name '-start-with-dash'  can't start with a dash"),
    invalid(
      "very-long-name-with-more-than-214-characters" + Array(172).join("x"),
      "Package name has length '215' but can't be longer than 214 characters."
    ),
    invalid(
      "notValid/namewith\\§p&çiàleCharacter",
      "Scoped package name 'namewith\\§p&çiàleCharacter' must contain only URL-safe characters: alphanumeric (a-z and 0-9), dash (-), dot (.), underscore(_) or tilde(~).",
      "Scope 'notValid' must contain only URL-safe characters: alphanumeric (a-z and 0-9), dash (-), dot (.), underscore(_) or tilde(~).",
      "Scope name 'notValid' must start with an '@'.",
    ),
    invalid("@scope/.", "Scoped package name '.' can't start with a dot"),
    invalid("@scope", "Package name '@scope' must contain only URL-safe characters: alphanumeric (a-z and 0-9), dash (-), dot (.), underscore(_) or tilde(~)."),
    invalid("@/", "Scoped package name '@/' cannot be empty."),
    invalid("@scope/", "Scoped package name '@scope/' cannot be empty."),
    invalid("@.scope/name", "Scope '@.scope' can't start with a dot."),
    invalid("@-scope/name", "Scope '@-scope'  can't start with a dash."),
    invalid(
      "@scop()/name",
      "Scope '@scop()' must contain only URL-safe characters: alphanumeric (a-z and 0-9), dash (-), dot (.), underscore(_) or tilde(~)."
    ),
    invalid(
      "@scope/()",
      "Scoped package name '()' must contain only URL-safe characters: alphanumeric (a-z and 0-9), dash (-), dot (.), underscore(_) or tilde(~)."
    ),
  ],
});
