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
  description: 'New Hook',
  prompts: [    
    {
      type: 'list',
      name: 'type',
      message: 'Type of hook',
      choices: [
        { name: 'Query', value: 'query' },
        { name: 'Mutation', value: 'mutation' }
      ]
    },

    {
      type: 'input',
      name: 'name',
      message: 'Name',
      default: (data) => data.type === 'query' ? 'useMyEntity' : 'useMyEntityOperations',
      bypass: (a) => a
    },

    promptSelectFeature(),

    promptSelectLogicFeature()
  ],
  actions: data => {
    const actions = [];

    const destFolder = `${data.feature}/${data.featureLogic}/client/hooks`;

    if (data.type === 'query') {
      addAndFormat(actions, {
        path: `${destFolder}/${data.name}.ts`,
        templateFile: './shared/templates/hook/useQuery.hbs',
        data: {
          name: data.name
        }
      })
    } else {
      addAndFormat(actions, {
        path: `${destFolder}/${data.name}.ts`,
        templateFile: './shared/templates/hook/useModification.hbs',
        data: {
          name: data.name
        }
      })
    }

    actions.push({
      type: 'addToIndex',
      path: `${data.feature}/${data.featureLogic}/client/index.ts`,
      line: `export * from './hooks/${data.name}';`
    })


    return actions;
  }
};
