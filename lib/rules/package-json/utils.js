const flatten = (obj, parent, res = {}, separator = '.') => {
  if (typeof obj !== 'object') return obj;
  let propName;
  for (const key in obj) {
    propName = parent ? `${ parent }${ separator }${ key }` : key;
    if (typeof obj[key] == 'object') {
      flatten(obj[key], propName, res);
    } else {
      res[propName] = obj[key];
    }
  }
  return res;
}

const parseNode = (nodeArray, map = new Map(), parent, separator = '.') => {
  nodeArray.forEach((node) => {
    const key = parent ? `${ parent }${ separator }${ node.key.value }` : node.key.value
    if ('properties' in node.value) {
      map.set(key, node)
      parseNode(node.value.properties, map, key)
    } else {
      map.set(key, node)
    }
  })
  return map;
}

const findClosestParent = (field, map) => {
  let _field = field
  while (_field.includes('.')) {
    _field = _field.substr(0, _field.lastIndexOf('.'))
    if (map.has(_field)) return { field: _field, node: map.get(_field) }
  }
  return { field: _field, node: map.get(_field) };
}

const isPackageJson = (context) => {
  const filename = context.getPhysicalFilename();
  return filename.endsWith('/package.json') || filename === 'package.json';
}

const defaultLoc = (node) => ({
  start: node.loc.start,
  end: {
    line: node.loc.start.line,
    column: node.loc.start.column + 1,
  },
})

const useRule = (context, node) => {
  const loc = defaultLoc(node)
  const nodes = parseNode(node.properties)
  return {
    nodes,
    report: (field, message, fix) => context.report({
      loc: findClosestParent(field, nodes).node?.loc ?? loc,
      message,
      node,
      fix,
    }),
    addField:
      (field, value = '// TODO - implement this field.') => fixer => {
        let _field = field
        let _node = node
        if (field.includes('.')) {
          const parent = findClosestParent(field, nodes)
          if (parent.node) {
            // remove found parent from string path
            _field = field.substr(field.lastIndexOf(parent.field) + parent.field.length + 1, field.length)
            _node = parent.node
          }
        }

        const line = _node.loc.start.line
        const column = _node.loc.end.column
        return fixer.insertTextAfterRange([
          context.getSourceCode().getIndexFromLoc({ line, column }),
          context.getSourceCode().getIndexFromLoc({ line: line + 1, column: column + 1 })
        ], `"${ _field }": "${ value }",\n${ ' '.repeat(column + 1) }`)
      },
    removeField:
      _node => fixer => fixer.removeRange([
        context.getSourceCode().getIndexFromLoc({ line: _node.loc.start.line, column: 0 }),
        context.getSourceCode().getIndexFromLoc({ line: _node.loc.end.line + 1, column: 0 })
      ])
  }
}

module.exports = {flatten, parseNode, findClosestParent, isPackageJson, useRule}
