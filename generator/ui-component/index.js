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
  description: 'New UI component',
  prompts: [    
    {
      type: 'confirm',
      name: 'isSharedComponent',
      message: 'Will this be a shared component?',
      default: true
    },

    {
      type: 'input',
      name: 'name',
      message: 'Component name'
    },

    promptSelectComponentPackage({ when: (d) => d.isSharedComponent }),

    promptSelectFeature({ when: (d) => !d.isSharedComponent }),

    promptSelectUIFeature({ when: (d) => !d.isSharedComponent })
  ],
  actions: data => {
    const actions = [];

    const destFolder = data.isSharedComponent ? 
      `${data.componentPackage}/src` :
      `${data.feature}/${data.featureUi}/client/components`;
    const packageName = data.isSharedComponent ? 
      data.componentPackage.split('/')[data.componentPackage.split('/').length - 1] :
      data.featureUi;
    const group = data.isSharedComponent ? 'Components' : 'Features';
    const subGroup = data.isSharedComponent ? '' : 'Components/';

    addAndFormat(actions, {
      path: `${destFolder}/${camelCase(data.name, {pascalCase: true})}/${camelCase(data.name, {pascalCase: true})}.tsx`,
      templateFile: './shared/templates/ui-component/Component.hbs',
      data: {
        name: data.name,
        propsType: `{}`
      }
    });

    addAndFormat(actions, {
      path: `${destFolder}/${camelCase(data.name, {pascalCase: true})}/${camelCase(data.name, {pascalCase: true})}.styles.ts`,
      templateFile: './shared/templates/ui-component/Component.styles.hbs',
      data: {
        name: data.name
      }
    });

    addAndFormat(actions, {
      path: `${destFolder}/${camelCase(data.name, {pascalCase: true})}/${camelCase(data.name, {pascalCase: true})}.theme.ts`,
      templateFile: './shared/templates/ui-component/Component.theme.hbs',
      data: {
        name: data.name,
        packageName 
      }
    });

    addAndFormat(actions, {
      path: `${destFolder}/${camelCase(data.name, {pascalCase: true})}/${camelCase(data.name, {pascalCase: true})}.test.tsx`,
      templateFile: './shared/templates/ui-component/Component.test.hbs',
      data: {
        name: data.name,
        packageName,
        group
      }
    });

    addAndFormat(actions, {
      path: `${destFolder}/${camelCase(data.name, {pascalCase: true})}/${camelCase(data.name, {pascalCase: true})}.stories.tsx`,
      templateFile: './shared/templates/ui-component/Component.stories.hbs',
      data: {
        name: data.name,
        packageName,
        group,
        subGroup
      }
    });

    if (data.isSharedComponent) {
      actions.push({
        type: 'addToIndex',
        path: `${destFolder}/index.ts`,
        line: `export * from './${camelCase(data.name, {pascalCase: true})}/${camelCase(data.name, {pascalCase: true})}';`
      })
    } else {
      actions.push({
        type: 'addToIndex',
        path: `${destFolder}/index.ts`,
        line: `export * from './components/${camelCase(data.name, {pascalCase: true})}/${camelCase(data.name, {pascalCase: true})}';`
      })
    }

    return actions;
  }
};
