/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

const fs = require('fs');
const path = require('path');

function convert(p) {
  const files = fs.readdirSync(p);
  for (const f of files) {
    const rf = path.resolve(p, f);
    if (fs.statSync(rf).isDirectory()) {
      convert(rf);
    } else if (rf.endsWith('.js')) {
      if (
        fs
          .readFileSync(rf)
          .toString()
          .split('\n')
          .find(e => e.startsWith('import') && e.includes('React'))
      ) {
        fs.renameSync(rf, rf.replace('.js', '.tsx'));
      } else {
        fs.renameSync(rf, rf.replace('.js', '.ts'));
      }
    } else if (rf.endsWith('.js.snap')) {
      fs.renameSync(rf, rf.replace('.js.snap', '.tsx.snap'));
    }
  }
}

convert(path.resolve(process.cwd(), process.argv[2]));
