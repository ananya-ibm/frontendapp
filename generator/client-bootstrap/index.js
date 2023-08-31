/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-useless-escape */

const fs = require('fs-extra');
const replace = require('replace-in-file');

if (!fs.existsSync('client-packages')) fs.mkdirSync('client-packages');
if (!fs.existsSync('client-packages/apps')) fs.mkdirSync('client-packages/apps');
if (!fs.existsSync('client-packages/features')) fs.mkdirSync('client-packages/features');
if (!fs.existsSync('client-packages/themes')) fs.mkdirSync('client-packages/themes');


function updateFiles(files, clientName) {
  replace({
    files: files,
    from: [
      '@exo/frontend-apps-sample',
      '@exo/frontend-theme-sample',
      '@exo/frontend-features-sample-chrome-ui',
      '@exo/frontend-features-sample-logic',
      '@exo/frontend-features-sample-ui',
      'packages/themes/default-theme/src/index.ts',
      'packages/themes/sample-theme/src/index.ts'
    ],
    to: [
      `@exo/frontend-apps-${clientName}`,
      `@exo/frontend-theme-${clientName}`,
      `@exo/frontend-features-${clientName}-chrome-ui`,
      `@exo/frontend-features-${clientName}-logic`,
      `@exo/frontend-features-${clientName}-ui`,
      `client-packages/themes/${clientName}-theme/src/index.ts`,
      `client-packages/themes/${clientName}-theme/src/index.ts`
    ]
  });
}

module.exports = {
  description: 'Create a new sample client project',
  prompts: [
    {
      type: 'input',
      name: 'clientName',
      message: 'What is the client/project name?',
      default: 'acme'
    }
  ],
  actions: data => {
    const actions = [
      (answers, config, plop) => {
        console.log(__dirname, process.cwd());
        fs.copySync('packages/apps/sample', `client-packages/apps/${answers.clientName}`);
        fs.copySync(`client-packages/apps/${answers.clientName}/.env.example`, `client-packages/apps/${answers.clientName}/.env`);
        fs.removeSync(`client-packages/apps/${answers.clientName}/node_modules`);

        updateFiles(`client-packages/apps/${answers.clientName}/**`, answers.clientName);
        updateFiles(`client-packages/apps/${answers.clientName}/.*`, answers.clientName);

        return 'Created app';
      },
      (answers, config, plop) => {
        fs.copySync('packages/features/sample', `client-packages/features/${answers.clientName}`);
        fs.renameSync(
          `client-packages/features/${answers.clientName}/sample-chrome-ui`,
          `client-packages/features/${answers.clientName}/${answers.clientName}-chrome-ui`
        );
        fs.removeSync(`client-packages/features/${answers.clientName}/${answers.clientName}-chrome-ui/node_modules`);
        updateFiles(`client-packages/features/${answers.clientName}/${answers.clientName}-chrome-ui/**`, answers.clientName);

        fs.renameSync(
          `client-packages/features/${answers.clientName}/sample-ui`,
          `client-packages/features/${answers.clientName}/${answers.clientName}-ui`
        );
        fs.removeSync(`client-packages/features/${answers.clientName}/${answers.clientName}-ui/node_modules`);
        updateFiles(`client-packages/features/${answers.clientName}/${answers.clientName}-ui/**`, answers.clientName);

        fs.renameSync(
          `client-packages/features/${answers.clientName}/sample-logic`,
          `client-packages/features/${answers.clientName}/${answers.clientName}-logic`
        );
        fs.removeSync(`client-packages/features/${answers.clientName}/${answers.clientName}-logic/node_modules`);
        updateFiles(`client-packages/features/${answers.clientName}/${answers.clientName}-logic/**`, answers.clientName);

        return 'Created features';
      },
      (answers, config, plop) => {
        fs.copySync('packages/themes/sample-theme', `client-packages/themes/${answers.clientName}-theme`);
        fs.removeSync(`client-packages/themes/${answers.clientName}-theme/node_modules`);
        updateFiles(`client-packages/themes/${answers.clientName}-theme/**`, answers.clientName);

        return 'Created theme';
      },
      'The client feature, app and theme has been generated. Don\'t forget to run \'npm run bootstrap\''
    ];
    return actions;
  }
};
