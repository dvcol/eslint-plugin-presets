"use strict";

const RuleTester = require("eslint").RuleTester;

const rule = require("../../../lib/rules/filename");

const ruleTester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
});

function doTest(filename, options = [], error = false) {
  const mode = options[0]?.mode ?? "filename";
  const regex =
    options[0]?.patterns[0] instanceof RegExp
      ? options[0]?.patterns[0]
      : `/${options[0]?.patterns[0]}/u`;
  const message = options[0]?.message ? ` ${options[0]?.message}` : "";
  return {
    code: "foo()",
    filename,
    options,
    errors: error && [
      {
        message:
          `Filename does not match '${mode}' regex '${regex}'.` + message,
      },
    ],
  };
}

ruleTester.run("filename-match-regex", rule, {
  valid: [
    // filename match
    doTest("src/foo/PublicComponent.vue", [
      {
        patterns: ["^Public.*$"],
      },
    ]),
    // filename match only for extension
    doTest("src/foo/PublicComponent.vue", [
      {
        patterns: ["^Public.*$"],
        extensions: [".vue"],
      },
    ]),
    // filename match only for .vue extension with custom message
    doTest("src/foo/PublicComponent.vue", [
      {
        patterns: ["^Public.*$"],
        message: "error message",
        extensions: [".vue"],
      },
    ]),
    // filename does not match but ignore extensions other than .ts
    doTest("src/foo/NotPublicComponent.vue", [
      {
        patterns: ["^Public.*$"],
        message: "error message",
        extensions: [".ts"],
      },
    ]),
    // filename does not match but ignore pattern
    doTest("src/foo/NotPublicComponent.vue", [
      {
        patterns: ["^Public.*$"],
        message: "error message",
        ignores: ["^.*.vue"],
      },
    ]),
    // filepath match
    doTest("src/foo/PublicComponent.vue", [
      {
        patterns: [/^src\/foo.*$/u],
        mode: "folder",
      },
    ]),
    // full path match
    doTest("src/foo/PublicComponent.vue", [
      {
        patterns: [/^src\/foo\/\w+\.vue$/u],
        mode: "path",
      },
    ]),
  ],
  invalid: [
    // pattern doesn't match
    doTest(
      "src/foo/NotPublicComponent.vue",
      [
        {
          patterns: ["^Public.*$"],
        },
      ],
      true
    ),
    // pattern doesn't match with custom error
    doTest(
      "src/foo/NotPublicComponent.vue",
      [
        {
          patterns: ["^Public.*$"],
          message: "My custom error message",
          extensions: [".vue"],
          ignores: [],
        },
      ],
      true
    ),
    // filepath doesn't match
    doTest(
      "src/bar/PublicComponent.vue",
      [
        {
          patterns: [/^src\/foo.*$/u],
          mode: "folder",
        },
      ],
      true
    ),
    // full path doesn't match
    doTest(
      "src/foo/PublicComponent.ts",
      [
        {
          patterns: [/^src\/foo\/\w+\.vue$/u],
          mode: "path",
        },
      ],
      true
    ),
  ],
});
