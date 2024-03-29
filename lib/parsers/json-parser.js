const espree = require("espree");
const dashAst = require("dash-ast");

module.exports = {
  parseForESLint(code, options) {
    const { filePath } = options;

    const ast = espree.parse(`(\n${code}\n)`, {
      tokens: false,
      comment: true,
      loc: true,
      range: true,
    });

    dashAst(ast, function (node) {
      // Move two characters left (parent and line break)
      node.start = Math.max(node.start - 2, 0);
      node.end = Math.max(node.end - 2, 0);
      node.range = [node.start, node.end];

      // Move one line up
      if (!node.loc.start.fixed) {
        node.loc.start.line = Math.max(node.loc.start.line - 1, 1);
        node.loc.start.fixed = true;
      }
      if (!node.loc.end.fixed) {
        node.loc.end.line = Math.max(node.loc.end.line - 1, 1);
        node.loc.end.fixed = true;
      }
    });
    // Remove the last two characters (line break and paren)
    ast.end = ast.end - 2;
    ast.range = [ast.start, ast.end];
    ast.body[0] = ast.body[0].expression;
    ast.loc = ast.body[0].loc;
    ast.tokens = [];

    return {
      ast,
    };
  },
};
