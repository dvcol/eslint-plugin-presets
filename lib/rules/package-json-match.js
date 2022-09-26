/**
 * @fileoverview Enforce that package.json has matching fields
 */
'use strict';

const { isPackageJson, flatten, useRule } = require('../utils/package-json')

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
module.exports = {
  meta: {
    docs: {
      description:
        'Enforce that package.json has matching fields',
      category: 'Best Practices',
      url: 'https://github.com/dvcol/eslint-plugin-presets',
      recommended: true
    },
    fixable: "code",
    schema: [
      {
        type: "object",
        properties: {
          required: {
            type: [ "object", "boolean" ],
            description: "Properties that the package.json must match",
          },
          match: {
            type: "object",
            description: "Properties that the package.json must match",
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
    if (!options.match) return {}
    const match = flatten(options.match)
    const required = typeof options.match === 'object' ? flatten(options.required) : !!options.required

    const isRequired = (key) => {
      if (typeof required === 'object') return !!required[key]
      return !!required
    }

    // if not package.json
    if (!isPackageJson(context)) return {};


    return {
      "Program > ObjectExpression"(node) {
        const { nodes, report, addField, removeField } = useRule(context, node)

        Object.entries(match).forEach(([ k, v ]) => {
          if (!nodes.has(k)) {
            if (isRequired(k)) report(k, `Required field '${ k }' is missing.`, autofix ? addField(k, v) : undefined)
          } else {
            const _node = nodes.get(k)
            const value = _node.value.value
            if (value !== v && !(typeof v === 'string' && new RegExp(v).test(value))) {
              context.report({
                node: _node,
                message: `Field '${ k }' does not match value '${ v }'`,
              })
            }
          }
        })

      },
    };
  },
};
