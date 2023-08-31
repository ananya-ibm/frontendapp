/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

const rimraf = require('rimraf');
const { getPackages } = require('./utils');
const path = require('path');

Promise.all(
  getPackages().map(p => {
    const nm = path.join(p.location, 'node_modules');
    console.log(`Clean ${nm}`);
    return new Promise((resolve, reject) => {
      rimraf(nm, () => resolve(undefined));
    });
  })
).then(
  () => {
    console.log(`Clean node_modules`);
    rimraf.sync('node_modules');
  }
);


