/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

const { execSync } = require('child_process');
const { getAppDir, getEnv } = require('./utils');
const requitePrereqs = require('../checkPrereqs');

const root = process.cwd();

const appDir = getAppDir();

execSync(`node ./dist/server.bundle.js ./dist/loadable-stats.json`, {
  env: getEnv({ NODE_ENV: 'production' }),
  stdio: 'inherit',
  cwd: appDir
});
