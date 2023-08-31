/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

const fs = require('fs');
const path = require('path');

const findRepoRoot = () => {
  let p = process.cwd();
  while (true) {
    const dir = fs.readdirSync(p);
    if (dir.includes('packages') && dir.includes('lerna.json')) {
      return p;
    }
    p = path.resolve(p, '..');
  }
};

const repoRoot = findRepoRoot();

const toSassVar = (obj: Record<string, any>) => {
  let buffer = '';

  const indent = (d) => {
    let dest = '';
    for (let i = 0; i < d; i++) {
      dest += '  ';
    }
    return dest;
  }

  const recurse = (e: any, d: number) => {
    buffer += indent(d) + '(\n';
    Object.entries(e).forEach(([k, v], idx, arr) => {
      if (typeof v === 'object') {
        buffer += `${indent(d + 1)}${k}:`; 
        recurse(v, d + 1);
        buffer += `${idx < arr.length - 1 ? ',' : ''}\n`
      } else {
        if (k === 'font-family') {
          buffer += `${indent(d + 1)}${k}: "${v}"${idx < arr.length - 1 ? ',' : ''}\n`
        } else {
          buffer += `${indent(d + 1)}${k}: ${v}${idx < arr.length - 1 ? ',' : ''}\n`
        }
      }
    })
    buffer += indent(d) + ')';
  }

  recurse(obj, 0);
  return buffer;
}

export const builder = ({ theme, name, output }) => {
  const varDef = toSassVar(theme);
  //console.log(varDef);
  return {
    mode: 'production',
    entry: [path.join(repoRoot, 'packages/themes/base-carbon-theme/carbon-base.scss')],
    output: {
      path: path.join(path.resolve(process.cwd()), output || 'src')
    },
    module: {
      rules: [
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: name || 'carbon.css'
              }
            },
            {
              loader: 'extract-loader'
            },
            {
              loader: 'css-loader?-url'
            },
            {
              loader: 'sass-loader',
              options: {
                additionalData: `$exoTheme: ${varDef};`
              }
            }
          ]
        }
      ]
    }
  }
}