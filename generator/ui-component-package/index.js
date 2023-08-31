/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

const { addAndFormat } = require('../utils');
const camelCase = require('camelcase');

module.exports = {
  description: 'Add new UI component package',
  prompts: [
    {
      type: 'confirm',
      name: 'isClientSpecific',
      message: 'Is this a client-specific feature?',
      default: true
    },
    {
      type: 'input',
      name: 'packageName',
      message: 'What should your component package be called?',
      default: 'generated'
    }
  ],
  actions: data => {
    const pathToComponents = data.isClientSpecific
      ? 'client-packages/components'
      : 'packages/components';

    const actions = [];

    actions.push({
      type: 'add',
      path: `../${pathToComponents}/${data.packageName}/package.json`,
      templateFile: './ui-component-package/package.hbs'
    });

    addAndFormat(actions, {
      path: `${pathToComponents}/${data.packageName}/src/index.ts`,
      templateFile: './ui-component-package/index.hbs'
    });
  
    return actions;
  }
};