/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

const { addAndFormat } = require('../shared/actions');

const templateFiles = [
  '../packages/themes/default-theme/src/assets/ix-logo.svg',
  '../packages/themes/default-theme/src/Carbon11Vars.ts',
  '../packages/themes/default-theme/src/ThemeProvider.tsx',
  '../packages/themes/default-theme/src/Theme.ts',
  '../packages/themes/default-theme/src/index.ts',
  '../packages/themes/default-theme/webpack.config.js'
];

module.exports = {
  description: 'Add a theme',
  prompts: [
    {
      type: 'confirm',
      name: 'isClientSpecific',
      message: 'Is this a client-specific theme?',
      default: true
    },
    {
      type: 'input',
      name: 'name',
      message: 'What should your theme be called? ("-theme" will be added at the end)',
      default: 'my-theme'
    }
  ],
  actions: data => {
    const pathToThemes = data.isClientSpecific 
      ? '../client-packages/themes' 
      : `../packages/themes`;

    const actions = [];
    
    actions.push({
      type: 'addMany',
      destination: `${pathToThemes}/{{name}}-theme`,
      base: '../packages/themes/default-theme',
      templateFiles
    });

    addAndFormat(actions, {
      path: `${pathToThemes}/{{name}}-theme/src/Theme.ts`,
      templateFile: './theme/Theme.hbs'
    });
    
    addAndFormat(actions, {
      type: 'add',
      path: `${pathToThemes}/{{name}}-theme/src/ThemeProvider.tsx`,
      templateFile: './theme/ThemeProvider.hbs'
    });

    addAndFormat(actions, {
      type: 'add',
      path: `${pathToThemes}/{{name}}-theme/src/Carbon11Vars.ts`,
      templateFile: './theme/Carbon11Vars.hbs'
    });
    
    addAndFormat(actions, {
      type: 'add',
      path: `${pathToThemes}/{{name}}-theme/webpack.config.js`,
      templateFile: './theme/webpack.config.hbs'
    });

    actions.push({
      type: 'add',
      path: `${pathToThemes}/{{name}}-theme/package.json`,
      templateFile: './theme/package.hbs'
    });
      
    actions.push('The theme generation is now complete. Please add it to the appropriate environment files, run the install process and then customise any required variables');

    actions.push({ type: 'bootstrap' });

    return actions;
  }
};
