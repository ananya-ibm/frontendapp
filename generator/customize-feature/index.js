/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf');

module.exports = {
  description: 'Customize existing feature for client use',
  prompts: [
    {
      type: 'list',
      name: 'existingFeature',
      message: 'What feature would you like to duplicate',
      default: 'catalog',
      choices: () => fs.readdirSync('packages/features')
        .flatMap(d => fs.readdirSync(`packages/features/${d}`).map(e => `packages/features/${d}/${e}`))
        .filter(f => fs.statSync(f).isDirectory())
    },
    {
      type: 'input',
      name: 'newFeatureName',
      message: 'What do you want to name your new feature?',
      default: (d) => {
        const suffix = d.existingFeature.substring('packages/features/'.length);
        const [,b] = suffix.split('/');
        return `generated-${b}`;
      }
    },
    {
      type: 'confirm',
      name: 'copy',
      message: 'Do you want to copy the existing code?',
      default: true
    }
  ],
  actions: data => {
    const featurePath = data.existingFeature.substring('packages/features/'.length);
    const [featGroup] = featurePath.split('/');

    const pathToClientFeatures = `client-packages/features/${featGroup}/${data.newFeatureName}`;

    const existingPackageData = JSON.parse(fs.readFileSync(`${data.existingFeature}/package.json`).toString());

    const actions = [];

    actions.push({
      type: 'addMany',
      destination: `../${pathToClientFeatures}`,
      base: `../${data.existingFeature}`,
      templateFiles: `../${data.existingFeature}`,
      abortOnFail: false
    });

    actions.push((data) => {
      rimraf.sync(`${pathToClientFeatures}/node_modules`);
      return "Cleared node_modules";
    });

    actions.push({
      type: 'modifyJson',
      path: `${pathToClientFeatures}/package.json`,
      data: {
        name: `@exo/frontend-features-${featGroup}-${data.newFeatureName}`,
        exo: {
          overrides: existingPackageData.name
        }
      }
    });
    
    if (!data.copy) {
      actions.push((data) => {
        const clientPath = existingPackageData.main;
        const clientDir = `${pathToClientFeatures}/${path.dirname(clientPath)}`;
        const clientFile = path.basename(clientPath);

        fs.readdirSync(clientDir).forEach(e => {
          rimraf.sync(`${clientDir}/${e}`);
        })

        return `Updated ${clientDir}/${clientFile}`;
      });

      actions.push({
        type: 'add',
        path: `../${pathToClientFeatures}/${existingPackageData.main}`,
        templateFile: './customize-feature/index.hbs',
        data: {
          originalPackage: existingPackageData.name.replace('@exo/', '@exo-original/')
        }
      })
    }

    actions.push(
      'The client feature generation is now complete. Run it as a standalone microfront-end, or add it to an app on a certain path'
    );

    return actions;
  }
};
