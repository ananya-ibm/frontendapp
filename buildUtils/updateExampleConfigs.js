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
const { getProviders, getOverridden, getOverrides, getEnv } = require('./lib/aliases');

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

const warning = [
  '# #############################################################################################',
  '# #############################################################################################',
  '#',
  '# WARNING - This is a generated file',
  "#           We have to generate specific Dockerfile until IBM Code Engine supports --build-arg",
  '#',
  '# #############################################################################################',
  '# #############################################################################################',
  ''
].join('\n');
const dockerfileContent = fs.readFileSync('Dockerfile').toString();

for (const pkg of getPackages()) {
  const exampleConfigs = path.join(pkg.location, 'example-config');
  if (fs.existsSync(exampleConfigs)) {
    const files = fs.readdirSync(exampleConfigs).filter(e => e.endsWith('.env.example'));
    for (const f of files) {
      const name = f.substring(0, f.length - '.env.example'.length);
      const dockerfile = path.join(exampleConfigs, name ? `Dockerfile.${name}` : `Dockerfile`);
      if (!fs.existsSync(dockerfile)) {
        fs.writeFileSync(dockerfile, `${warning}\n${dockerfileContent.replace(
          /ARG ENV_FILE=.*/g,
          `ARG ENV_FILE=${path.relative(process.cwd(), path.join(exampleConfigs, f))}`
        )}`);
      }
    }
  }
}
