/**
 * @fileoverview Rule to check if package.json name is valid
 * @author Contensquare
 */
"use strict";

const { dirname } = require("path");

const URL_SAFE = /^[a-z0-9-*._~]+$/;

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description:
        'Enforce that package.json has valid name field',
      category: 'Best Practices',
      recommended: true
    },
    fixable: "code",
    schema: [
      {
        type: "object",
        properties: {
          matchFolder: {
            type: "boolean",
            description: "If the package name should match the folder name.",
          },
          hasScope: {
            type: "boolean",
            description: "If a scoped is required.",
          },
          scopes: {
            type: "array",
            uniqueItems: true,
            description: "The allowed scopes.",
          },
        }
      }
    ],
  },
  create(context) {
    return {
      "Program > ObjectExpression > Property[key.value=name]"(node) {
        const options = context?.options?.[0] || {};

        const folder = dirname(context.getPhysicalFilename())?.split('/').pop();

        const nameNode = node.value;
        const packageName = nameNode.value;
        const scope = packageName.includes('/') ? packageName.split('/').shift() : undefined
        const scopedName = scope ? packageName.substr(scope.length + 1, packageName.length) : packageName;
        const name = scope ? scopedName : packageName

        // test length
        if (packageName.length > 214) {
          context.report({
            node: nameNode,
            message: `Package name has length '${ packageName?.length }' but can't be longer than 214 characters.`,
          });
        }

        // test  package name is valid
        if (!name?.length) {
          context.report({
            node: nameNode,
            message: `${ scope ? "Scoped package name" : "Package name" } '${ packageName }' cannot be empty.`,
          });
        } else {
          if (!(name).match(URL_SAFE)) {
            context.report({
              node: nameNode,
              message: `${ scope ? "Scoped package name" : "Package name" } '${ name }' must contain only URL-safe characters: alphanumeric (a-z and 0-9), dash (-), dot (.), underscore(_) or tilde(~).`,
            });
          }

          if ((name).startsWith(".")) {
            context.report({
              node: nameNode,
              message: `${ scope ? "Scoped package name" : "Package name" } '${ name }' can't start with a dot`,
            });
            return;
          }

          if ((name).startsWith("-")) {
            context.report({
              node: nameNode,
              message: `${ scope ? "Scoped package name" : "Package name" } '${ name }'  can't start with a dash`,
            });
            return;
          }
        }

        // test scope is valid
        if (scope?.length) {
          if (scope?.length > 1 && !(scope.substr(1, scope.length))?.match(URL_SAFE)) {
            context.report({
              node: nameNode,
              message: `Scope '${ scope }' must contain only URL-safe characters: alphanumeric (a-z and 0-9), dash (-), dot (.), underscore(_) or tilde(~).`,
            });
          }
          if (!scope.startsWith("@")) {
            context.report({
              node: nameNode,
              message: `Scope name '${ scope }' must start with an '@'.`,
            });
          }
          if (scope.charAt(1) === '.') {
            context.report({
              node: nameNode,
              message: `Scope '${ scope }' can't start with a dot.`,
            });
            return;
          }

          if (scope.charAt(1) === '-') {
            context.report({
              node: nameNode,
              message: `Scope '${ scope }'  can't start with a dash.`,
            });
            return;
          }
        }

        // test packageName is folder packageName
        if (options.matchFolder && ![ packageName, scopedName ].includes(folder)) {
          context.report({
            node: nameNode,
            message: `Package name '${ packageName }' should match folder name '${ folder }'.`,
          });

        }

        // test has scope
        if (options.hasScope && !scope?.length) {
          context.report({
            node: nameNode,
            message: `Package name '${ packageName }' does not have a scope.`,
          });
        }

        // test allowed scope
        if (options.scopes?.length && !options.scopes.includes(scope)) {
          context.report({
            node: nameNode,
            message: `Scope '${ scope }' is not one of the allowed scopes '${ options.scopes }'.`,
          });
        }
      },
    };
  },
};
