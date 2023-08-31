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

const find = (startDir, fn) => {
  const dest = [];
  const recurse = (d) => {
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

const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const camelCased = (s) => s.replace(/-([a-z])/g, function (g) { return g[1].toUpperCase(); });

console.log('#######################################################################');
console.log("Theme override refs (spread operator in .theme.js)")
console.log('');

for (const theme of find(path.join(process.cwd(), 'packages'), f => f.endsWith('.theme.js'))) {
  const data = fs.readFileSync(theme).toString();
  const ref = data
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.startsWith('...props.theme'));

  if (ref.length === 0) {
    console.log(`${path.relative(process.cwd(), theme)} has NO override ref`);    
  } else if (ref.length > 1) {
    console.log(`${path.relative(process.cwd(), theme)} has MULTIPLE override ref`);    
  } else {
    const s = ref[0]
      .substring('...props.theme?.'.length)
      .split('?.');

      if (s.length !== 2) {
      console.log(`${path.relative(process.cwd(), theme)} has INCORRECT override ref`);    

    } else if (theme.includes('features')) {
      const [group, obj] = s;
      if (! theme.match(`.*/${camelCased(group)}/.+/${capitalize(obj)}/${capitalize(obj)}.theme.js`)) {
        console.log(`${path.relative(process.cwd(), theme)} has INCORRECT override ref`);    
        console.log(`  got ${group}?.${obj}`);
      }

    } else {
      const [group, obj] = s;
      if (! theme.endsWith(`${camelCased(group)}/src/${capitalize(obj)}/${capitalize(obj)}.theme.js`)) {
        console.log(`${path.relative(process.cwd(), theme)} has INCORRECT override ref`);    
        console.log(`  got ${group}?.${obj}`);
      }
    }
  }
}


console.log('');
console.log('');
console.log('#######################################################################');
console.log("Used theme vars")
console.log('');
const vars = new Set();
for (const file of find(process.cwd(), f => f.endsWith('.js') && fs.statSync(f).isFile())) {
  const data = fs.readFileSync(file).toString();
  (data.match(/(?<!\.\.\.\(?)props.theme.([a-zA-Z0-9.]+)/g) || [])
    .forEach(a => {
      vars.add(a);
    });
}
for (const v of Array.from(vars).sort()) {
  console.log(v);
}
