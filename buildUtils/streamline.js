/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-continue, no-await-in-loop */

const fs = require('fs');
const path = require('path');
const upath = require('upath');
const { resolve } = require('path');
const { readdir } = require('fs').promises;
const { execSync } = require('child_process');
const rimraf = require('rimraf');

/*
  Typically run using something like

  node buildUtils/streamline.js @exo/frontend-apps-commerce @exo/frontend-theme-default "packages/common/*"
  
  i.e. the arguments is a list of modules and/or paths that should be kept - everything else will
  be removed
*/

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

function cleanFolder(base) {
  for (const folder of fs.readdirSync(base)) {
    const fPath = path.join(base, folder);

    for (const sf of fs.readdirSync(fPath)) {
      const sfPath = path.join(fPath, sf);
      if (fs.statSync(sfPath).isDirectory() && fs.readdirSync(sfPath).length === 0) {
        fs.rmdirSync(sfPath);
      }
    }

    if (fs.readdirSync(fPath).length === 0) {
      fs.rmdirSync(fPath);
    }
  }
}

const packages = getPackages();

const dependencies = {};

const entryPoints = process.argv.slice(2).flatMap(e => {
  if (e.startsWith('@')) return e;
  return packages
    .filter(p => p.location.match(new RegExp(`.*${e.replace('*', '.*')}.*`)))
    .map(p => p.name);
});
entryPoints.forEach(e => {
  dependencies[e] = 'ENTRY_POINT';
});

const packageLookup = Object.fromEntries(packages.map(p => [p.name, p]));

const visited = [];
const queue = [...entryPoints];

while (queue.length > 0) {
  const e = queue.pop();
  visited.push(e);

  if (packageLookup[e]) {
    const pkg = JSON.parse(
      fs.readFileSync(path.join(packageLookup[e].location, 'package.json')).toString()
    );
    [...Object.keys(pkg.dependencies ?? {}), ...Object.keys(pkg.devDependencies ?? {})]
      .filter(a => !visited.includes(a))
      .forEach(a => {
        queue.push(a);
        dependencies[a] = e;
      });
  }
}

for (const p of packages) {
  if (!visited.includes(p.name)) {
    console.log(`Deleting ${p.location}`);
    rimraf.sync(p.location);
  } else {
    console.log(`Keeping ${p.location} - used by ${dependencies[p.name]}`);
  }
}

// Check for empty folders
cleanFolder('packages/features');
cleanFolder('packages/apps');
cleanFolder('packages/themes');
cleanFolder('packages/components');
