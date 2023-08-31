const fs = require('fs');

module.exports = function({ types: t }) {
  return {
    visitor: {
      ExportDefaultDeclaration(path, state) {
        if (/.*\.stories\.js$/.test(this.filename)) {
          const themeFilename = this.filename.replace(
            '.stories.js',
            '.theme.js'
          );
          if (fs.existsSync(themeFilename)) {
            const importPath = `./${themeFilename.replace(/\\/g, '/').replace(
              /^(.*\/)(.*).js$/,
              '$2'
            )}`;

            const id = path.scope.generateUidIdentifierBasedOnNode(
              path.node.id
            );

            // Replace export default { ... } with
            //
            //   const _ref = { ... };
            //   _ref.parameters = _ref.parameters || {};
            //   _ref.parameters.themeAddon = require('./Component.theme?theme-ast');
            //   export default _ref;


            //   const _ref = { ... };
            path.insertBefore(
              t.variableDeclaration('const', [
                t.variableDeclarator(id, path.node.declaration)
              ])
            );

            //   _ref.parameters = _ref.parameters || {};
            path.insertBefore(
              t.expressionStatement(
                t.assignmentExpression(
                  '=',
                  t.memberExpression(id, t.identifier('parameters')),
                  t.logicalExpression(
                    '||',
                    t.memberExpression(id, t.identifier('parameters')),
                    t.objectExpression([])
                  )
                )
              )
            );

            //   _ref.parameters.themeAddon = require('./Component.theme);
            path.insertBefore(
              t.expressionStatement(
                t.assignmentExpression(
                  '=',
                  t.memberExpression(
                    t.memberExpression(id, t.identifier('parameters')),
                    t.identifier('themeAddon')
                  ),
                  t.callExpression(t.identifier('require'), [
                    t.stringLiteral(`${importPath}?theme-ast`)
                  ])
                )
              )
            );

            //   export default _ref;
            path.node.declaration = id;
          }
        }
      }
    }
  };
};
