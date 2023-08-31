/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-continue */

const fs = require('fs');
const path = require('path');
const babelParser = require('@babel/parser');
const traverse = require('@babel/traverse');

const { execSync } = require('child_process');

const depcheck = require('depcheck');

function getPackages() {
  let output;

  try {
    output = execSync(`node ./node_modules/lerna/cli.js ls --json`);
  } catch (error) {
    console.info(`No local packages found.`);
    process.exit(0);
  }

  const packages = JSON.parse(output.toString());
  return packages;
}

const find = (startDir, fn) => {
  const dest = [];
  const recurse = d => {
    for (const f of fs.readdirSync(d)) {
      const fullFilename = path.join(d, f);

      if (fn(fullFilename)) {
        dest.push(fullFilename);
      }

      if (!fs.statSync(fullFilename).isDirectory()) continue;
      if (f === 'node_modules' || f === 'dist' || f === 'storybook-dist' || f === '.git') continue;

      recurse(fullFilename);
    }
  };

  recurse(startDir);
  return dest;
};

const CONFIG = {
  allowImportExportEverywhere: true,
  plugins: ['typescript', 'jsx']
};

const checkNode = node => {
  if (node.type === 'program') {
    node.body.forEach(n => checkNode(n));
  } else {
    console.log(node);
  }
};

async function checkStyles(packages) {
  // eslint-disable-next-line guard-for-in
  for (const p of packages) {
    for (const styleFile of find(p.location, f => f.endsWith('.styles.ts'))) {
      const styleAst = babelParser.parse(fs.readFileSync(styleFile).toString(), CONFIG);

      const exports = styleAst.program.body
        .filter(e => e.type === 'ExportNamedDeclaration')
        .map(e => e.declaration.declarations[0].id.name);

      const used = [];

      const dir = path.dirname(styleFile);
      for (const f of fs.readdirSync(dir)) {
        const componentFile = `${dir}/${f}`;

        if (!componentFile.endsWith('.tsx')) continue;

        const componentAst = babelParser.parse(fs.readFileSync(componentFile).toString(), CONFIG);

        const usedInThis = [];
        const importSources = [];
        traverse.default(componentAst, {
          ImportDeclaration: n => {
            importSources.push(n.node.source.value);
          },
          JSXElement: n => {
            const opening = n.node.openingElement.name;
            if (opening.type === 'JSXMemberExpression') {
              if (opening.object.name === 'S') {
                usedInThis.push(opening.property.name);
              }
            }
          }
        });

        if (importSources.includes(`./${path.basename(styleFile).replace('.ts', '')}`)) {
          usedInThis.forEach(e => used.push(e));
        }
      }

      const unused = exports.filter(e => !used.includes(e));

      if (unused.length > 0) {
        console.log(styleFile);
        console.log(unused);
        console.log('');
      }
    }
  }
}

checkStyles(getPackages());
