/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

const camelCase = require('camelcase');
const { promptSelectFeature, promptSelectUIFeature, promptSelectComponentPackage } = require('../shared/prompts');
const { addAndFormat } = require('../shared/actions');

module.exports = {
  description: 'New page',
  prompts: [    
    {
      type: 'input',
      name: 'name',
      message: 'Page name'
    },

    promptSelectFeature(),

    promptSelectUIFeature()
  ],
  actions: data => {
    const actions = [];

    const destFolder = `${data.feature}/${data.featureUi}/client/pages`;
    const featureName = data.feature.split('/')[data.feature.split('/').length - 1];
    const subGroup = data.featureUi.replace('-ui', '');

    addAndFormat(actions, {
      path: `${destFolder}/${camelCase(data.name, {pascalCase: true})}/${camelCase(data.name, {pascalCase: true})}.tsx`,
      templateFile: './shared/templates/page/Page.hbs',
      data: {
        name: data.name,
        featureName,
        featureUi: data.featureUi
      }
    });

    addAndFormat(actions, {
      path: `${destFolder}/${camelCase(data.name, {pascalCase: true})}/${camelCase(data.name, {pascalCase: true})}.stories.tsx`,
      templateFile: './shared/templates/page/Page.stories.hbs',
      data: {
        name: data.name,
        featureName,
        group: 'Features',
        pageName: data.featureUi,
        subGroup
      }
    });

    return actions;
  }
};
