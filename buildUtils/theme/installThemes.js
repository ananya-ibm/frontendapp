/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable */

const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const util = require('util');
const exec = util.promisify(require('child_process').exec);


const [_, name, opt] = process.argv;

async function install(s) {
  const { stderr, stdout, error } = await exec(`npm install ${s.join(' ')} --no-save`);
  console.log(stdout);
  const addedPackages = stdout.split('\n').filter(l => l[0] === '+');
  const res = [];
  if (addedPackages.length >= 1) {
    for (const p of addedPackages) {
      const pkg = p
        .substring(2)                     // strip '+ '
        .replace(/^(.*)@[^@]+$/, '$1');   // strip version tag at the end
      console.log(`  -> installed theme ${pkg}`);
      res.push(pkg);
    }
    return res;
  }
}

async function run() {
  const themePackages = {};

  let themes;

  const env = dotenv.config();
  if (env.parsed) {
    themes = env.parsed.STORYBOOK_THEMES.split(',');
  } else {
    themes = [];
  }
  
  const APP_FOLDER = 'packages/apps'; 
  const appEnv = fs.readdirSync(APP_FOLDER)
    .filter(d => fs.lstatSync(path.join(APP_FOLDER, d)).isDirectory())
    .map(d => path.join(APP_FOLDER, d, '.env'))
    .filter(f => fs.existsSync(f))
    .map(f => dotenv.parse(fs.readFileSync(f)));
  appEnv.map(e => e.THEME)
    .filter(t => t)
    .forEach(t => themes.push(t));
  appEnv.map(e => e.ADDITIONAL_THEMES)
    .filter(t => t)
    .flatMap(t => t.split(','))
    .forEach(t => themes.push(t));    
  themes = [...new Set(themes)];

  const themesToBeInstalled = [];  

  for (let s of themes) {
    if (fs.existsSync(`./${s}`)) {
      s = `file://./${s}`;
    } else if (fs.existsSync(s)) {
      s = `file://${s}`;
    }
  
    if (s.startsWith('file://')) {
      const p = s.substring('file://'.length);
  
      if (! fs.existsSync(p)) {
        console.log(p);
        console.error(`Theme ${s} does not exist on disk - can't install`);
        process.exit(1);
      };
  
      console.log(`Theme ${s} found - no install needed`);
  
    } else {
      console.log(`Requesting installation of theme ${s}...`);
      themesToBeInstalled.push(s);
    }
  }

  if (themesToBeInstalled.length > 0) {
    console.log(`Installing themes ${themesToBeInstalled}...`);
    const pkgs = await install(themesToBeInstalled);
    themesToBeInstalled.forEach((s, idx) => themePackages[s] = pkgs[idx]);
  }

  fs.writeFileSync(path.join('node_modules', 'themes.json'), 
    JSON.stringify(themePackages, undefined, '  '));
}

run();

