/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

const camelCase = require('camelcase');
const { promptSelectFeature, promptSelectLogicFeature, promptSelectComponentPackage } = require('../shared/prompts');
const { addAndFormat } = require('../shared/actions');

module.exports = {
  description: 'New Smart Component',
  prompts: [    
    {
      type: 'input',
      name: 'name',
      message: 'Component name'
    },

    promptSelectFeature(),

    promptSelectLogicFeature()
  ],
  actions: data => {
    const actions = [];

    const destFolder = `${data.feature}/${data.featureLogic}/client/smart-components`;

    addAndFormat(actions, {
      path: `${destFolder}/${camelCase(data.name, {pascalCase: true})}/${camelCase(data.name, {pascalCase: true})}.tsx`,
      templateFile: './shared/templates/smart-component/Container.hbs',
      data: {
        name: data.name,
        queryName: 'MySampleQuery'
      }
    })

    actions.push({
      type: 'addToIndex',
      path: `${data.feature}/${data.featureLogic}/client/index.ts`,
      line: `export * from './smart-components/${camelCase(data.name, {pascalCase: true})}/${camelCase(data.name, {pascalCase: true})}';`
    })

    return actions;
  }
};
