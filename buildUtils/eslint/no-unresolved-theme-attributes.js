/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

const fs = require('fs');

// This acts as a trivial cache, to not have to read the same theme file over and over again
let currentContent;
let currentFile;

const THEME_FILE_REGEXP = /(.*)(\.styles\.js)$/;

module.exports = {
  meta: {
    type: 'problem',
    schema: []
  },
  create(context) {
    return {
      MemberExpression(node) {
        // ... only look for expression where left side is a function call
        if (node.object.type !== 'CallExpression') return;

        // ... and that call is to theme()
        if (node.object.callee.name !== 'theme') return;

        // ... and only one right hand side property
        if (node.property.type !== 'Identifier') return;

        // ... only look in *.styles.js files
        //
        // while this is a more selective operation, it's also a MUCH more expensive operation,
        // so putting it last in the sequence of early exits
        if (! THEME_FILE_REGEXP.test(context.getFilename())) return;

        const themeAttribute = node.property.name;

        const themeFile = context.getFilename().replace(THEME_FILE_REGEXP, '$1.theme.js');

        if (! fs.existsSync(themeFile)) {
          context.report({
            node,
            message: `Cannot find theme file named '${themeFile}'`
          });
          return;
        }

        if (! currentContent || currentFile !== themeFile) {
          currentContent = fs.readFileSync(themeFile);
          currentFile = themeFile;
        }

        // This check is somewhat stupid, it only looks for the literal string [themeAttribute]:
        if (! new RegExp(`.*\\s'?${themeAttribute}'?:.*`).test(currentContent)) {
          context.report({
            node,
            message: `Theme attribute '${themeAttribute}' not defined in component theme`
          });
        }
      }
    };
  }
};
