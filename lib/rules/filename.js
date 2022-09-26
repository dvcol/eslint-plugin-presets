/**
 * @fileoverview Rule to check if filename follow the given regex pattern
 */

"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/* eslint-disable @typescript-eslint/no-var-requires */
const { basename, extname, dirname } = require("path");

/**
 *  JSON schema format description of a rule's options which will be used by ESLint to validate configuration options and prevent invalid or unexpected inputs before they are passed to the rule in context.options
 * @type {[{additionalProperties: boolean, type: string, properties: {regex: {type: string}, extensions: {uniqueItems: boolean, type: string}, message: {type: string}}}]}
 */
const schema = [
  {
    type: "object",
    properties: {
      /** The regex the filename must match */
      patterns: {
        type: "array",
        uniqueItems: true,
        description: "The regular expressions the filename must match.",
      },
      /** The matching mode */
      mode: {
        enum: ["filename", "folder", "path"],
        description:
          "The part of the filename to match : filename (default), folder, or path.",
      },
      /** The error message */
      message: {
        type: "string",
        description: "An optional error message to append to linting errors.",
      },
      /** The files extension checked */
      extensions: {
        type: "array",
        items: {
          type: "string",
        },
        uniqueItems: true,
        description:
          "The extensions on which the rule applies (default to all if empty).",
      },
      /** Ignored patterns */
      ignores: {
        type: "array",
        items: {
          type: "string",
        },
        uniqueItems: true,
        description:
          "The patterns to ignore. If a file match any  of this patterns, the file passes linting.",
      },
    },
    additionalProperties: false,
  },
];

/**
 * Create function to handle the rule logic
 * @param {import('eslint').Rule.RuleContext} context linting context
 * @return {{}}
 */
const create = (context) => {
  const options = context?.options?.[0] || {};
  const mode = options?.mode ?? "filename";

  // If no regex provided, skip
  if (!options?.patterns?.length) return {};

  const filename = context.getPhysicalFilename();

  // If linting input or text skip
  if (filename === "<input>" || filename === "<text>") return {};

  // Transform ignores to regex
  let ignores = [];
  if (options?.ignores?.length) {
    ignores = options?.ignores.map((regex) => {
      if (regex instanceof RegExp) return regex;
      return new RegExp(regex, "u");
    });
  }

  // Transform patterns to regex
  const patterns = options?.patterns.map((regex) => {
    if (regex instanceof RegExp) return regex;
    return new RegExp(regex, "u");
  });

  let message = `Filename does not match '{{mode}}' regex '{{match}}'.`;
  if (options.message) {
    message = `${message} ${options.message}`;
  }

  const extensions = options.extensions || [];

  return {
    Program() {
      const ext = extname(filename);
      const name = basename(filename);
      const path = dirname(filename);

      let value = name;
      if (mode === "folder") {
        value = path;
      } else if (mode === "path") {
        value = filename;
      }

      // If extensions provided and not in list skip
      if (extensions?.length && !extensions.includes(ext)) return;

      // If match ignore
      if (ignores.some((regex) => regex.test(value))) return;

      // If match regex, return
      const match = patterns.find((regex) => !regex.test(value));
      if (!match) return;

      // Else raise lint error
      return context.report({
        loc: { column: 0, line: 1 },
        message,
        data: { mode, match },
      });
    },
  };
};

/**
 * meta (object) contains metadata for the rule
 * @type {{docs: {description: string, category: string, url: string}, type: string}}
 */
const meta = {
  type: "layout",
  docs: {
    description: "disallow filenames not following the given regex pattern",
    category: "Layout & Formatting",
    url: 'https://github.com/dvcol/eslint-plugin-presets',
  },
  schema,
};

/**
 * Rule definition following https://eslint.org/docs/developer-guide/working-with-rules
 * @type {import('eslint').Rule.RuleModule}
 */
module.exports = { meta, create };
