/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

const fs = require('fs');
const path = require('path');
const { getAppDir } = require('./utils');

const root = process.cwd();

const appDir = getAppDir();

fs.writeFileSync(path.join(appDir, '.env'),
  fs.readFileSync(process.argv[3])
);
