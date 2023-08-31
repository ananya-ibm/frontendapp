/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

const { execSync } = require('child_process');

const path = require('path');
const depcheck = require('depcheck');

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

async function checkDependencies(packages) {
  // eslint-disable-next-line guard-for-in
  for (const p of packages) {
    // eslint-disable-next-line no-continue
    if (p.location.includes('packages/apps')) continue;

    // eslint-disable-next-line no-await-in-loop
    const depcheckResult = await depcheck(p.location, {
      detectors: [
        depcheck.detector.requireCallExpression,
        depcheck.detector.requireResolveCallExpression,
        depcheck.detector.importCallExpression,
        depcheck.detector.importDeclaration,
        depcheck.detector.exportNamedDeclaration,
        depcheck.detector.gruntLoadTaskCallExpression,

        // handle jest.requireActual(<string>)
        function(node) {
          return (
            node.type === 'CallExpression' &&
            node.callee &&
            node.callee.type === 'MemberExpression' &&
            node.callee.object &&
            node.callee.object.name === 'jest' &&
            node.callee.property &&
            node.callee.property.name === 'requireActual' &&
            node.arguments[0] && [node.arguments[0].value]
          );
        }
      ]
    });

    const missing = [...depcheckResult.dependencies, ...depcheckResult.devDependencies]
      .filter(d => !depcheckResult.using[d])
      .filter(d => d !== '@exo/frontend-common-root-exec');

    if (missing.length > 0) {
      console.log(`${p.name} - ${path.relative(process.cwd(), p.location)}`);
      missing.forEach(e => console.log(`  ${e}`));
      console.log('');
    }
  }
}

checkDependencies(getPackages());
