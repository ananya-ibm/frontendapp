/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');
const { execSync } = require('child_process');

function getAppDir() {
  const aliases = {};
  const apps = {};
  [
    ...fs.readdirSync('packages/apps').map(a => `packages/apps/${a}`),
    ...(fs.existsSync('client-packages/apps') ? fs.readdirSync('client-packages/apps').map(a => `client-packages/apps/${a}`) : [])
  ].forEach(d => {
    const f = path.join(d, 'package.json');
    if (fs.existsSync(f)) {
      const p = JSON.parse(fs.readFileSync(f).toString());
      if (path.basename(d) === 'base' || path.basename(d) === 'commmerce-base' || (p?.exo?.type && p?.exo?.type !== 'app')) return;
      apps[path.basename(d)] = d;
      aliases[path.basename(d)] = p?.exo?.alias ?? [];
      p?.exo?.alias?.forEach(a => { apps[a] = d; });
    }
  });

  if (process.argv.length <= 2 || !apps[process.argv[2]]) {
    console.log('Usage: npm run command app [env-file]');
    console.log(`Error: app argument missing or invalid, valid values are: ${Object.keys(apps)
      .filter(k => !!aliases[k])
      .map(k => aliases[k].length === 0 ? k : `${k} (or ${aliases[k].join(', ')})`)
      .join(', ')}`
    );
    process.exit(1);
  }

  return apps[process.argv[2]];
}

function getEnv(e = {}) {
  return {
    ...(process.argv.length === 4
      ? dotenv.config({ path: `${getAppDir()}/${process.argv[3]}` }).parsed
      : dotenv.config({ path: `${getAppDir()}/.env` }).parsed),
    ...e,
    ...process.env
  };
}

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


module.exports = {
  getPackages,
  getAppDir,
  getEnv
};
