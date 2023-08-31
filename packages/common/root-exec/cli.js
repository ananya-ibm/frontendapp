#!/usr/bin/env node

/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

const fs = require('fs');
const path = require('path');
const crossEnv = require('cross-env');

const substituteEnv = el => {
  // Replace bash variable substitution patterns on windows
  // on UNIX environments, this replacement happens before the root-exec
  // is called, so no need to do this conditionally for windows only
  return el.replace(/\${([^:]+):-([^}]+)}/g, '$2');
};

// Find root folder
let p = __dirname;
// eslint-disable-next-line no-constant-condition
while (true) {
  const dir = fs.readdirSync(p);
  if (dir.includes('packages') && dir.includes('lerna.json')) {
    break;
  }
  p = path.resolve(p, '..');
}

process.env.PATH =
  path.join(p, 'node_modules', '.bin') + path.delimiter + process.env.PATH;

crossEnv(process.argv.slice(2).map(substituteEnv));
