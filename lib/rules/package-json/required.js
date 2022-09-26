/**
 * @fileoverview Enforce that package.json has required field and no banned ones
 */
'use strict';

const { isPackageJson, useRule } = require('./utils')

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
module.exports = {
  meta: {
    docs: {
      description:
        'Enforce that package.json has all properties required by NPM spec',
      category: 'Best Practices',
      recommended: true
    },
    fixable: "code",
    schema: [
      {
        type: "object",
        properties: {
          /** Required fields */
          required: {
            type: "array",
            uniqueItems: true,
            description: "List of required fields to remove.",
          },
          /** Required fields */
          banned: {
            type: "array",
            uniqueItems: true,
            description: "List of banned fields to remove.",
          },
          /** The error message */
          autofix: {
            type: "boolean",
            description: "Enabled auto-fixing",
          },
        },
        additionalProperties: false,
      },
    ]
  },

  create(context) {
    const options = context?.options?.[0] || {};
    const autofix = options.autofix

    // if no rules to enforce
    if (!options.required?.length && !options.banned?.length) return {}
    const required = options.required || []
    const banned = options.banned || []

    // if not package.json
    if (!isPackageJson(context)) return {};


    return {
      "Program > ObjectExpression"(node) {

        const { nodes, report, addField, removeField } = useRule(context, node)

        required.forEach(field => !nodes.has(field) && report(field, `Required field '${ field }' is missing.`, autofix ? addField(field) : undefined))
        banned.forEach(field => nodes.has(field) && report(field, `Field '${ field }' is banned.`, autofix ? removeField(nodes.get(field)) : undefined))
      },
    };
  },
};
