/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

const { addAndFormat } = require('../utils');
const camelCase = require('camelcase');
const fs = require('fs');

module.exports = {
  description: 'Add new feature',
  prompts: [
    {
      type: 'confirm',
      name: 'isClientSpecific',
      message: 'Is this a client-specific feature?',
      default: true
    },
    {
      type: 'input',
      name: 'featureName',
      message: 'What should your feature be called?',
      default: 'generated'
    },
    {
      type: 'confirm',
      name: 'includeLogic',
      message: 'Include logic package',
      default: true
    },
    {
      type: 'input',
      name: 'featureUi',
      message: 'Feature UI package name',
      default: data => `${data.featureName}-ui`
    },
    {
      type: 'input',
      name: 'featureLogic',
      message: 'Feature logic package name',
      default: data => `${data.featureName}-logic`
    },
    {
      type: 'checkbox',
      name: 'apps',
      message: 'Choose apps in which to include feature',
      choices: () => {
        return [
          ...(fs.existsSync('client-packages/apps')
            ? fs.readdirSync('client-packages/apps').map(d => `client-packages/apps/${d}`)
            : []),
          ...fs.readdirSync('packages/apps').map(d => `packages/apps/${d}`)
        ];
      },
      bypass: a => a
    }
  ],
  actions: data => {
    // eslint-disable-next-line no-param-reassign
    data.directory = data.featureName;
    data.group = 'Features';
    data.pageName = 'SamplePage';
    data.containerName = 'SampleContainer';
    data.hookName = 'useSample';

    const pathToFeatures = data.isClientSpecific ? 'client-packages/features' : 'packages/features';

    const actions = [];

    /* UI feature ************************************************************************************** */

    addAndFormat(actions, {
      path: `${pathToFeatures}/${data.featureName}/${data.featureUi}/client/Routes.tsx`,
      templateFile: './feature/ui/client/Routes.hbs'
    });

    addAndFormat(actions, {
      path: `${pathToFeatures}/${data.featureName}/${data.featureUi}/client/App.tsx`,
      templateFile: './feature/ui/client/App.hbs'
    });

    addAndFormat(actions, {
      path: `${pathToFeatures}/${data.featureName}/${data.featureUi}/client/translations/en.tsx`,
      templateFile: './feature/ui/client/translations/translation-en-tsx.hbs'
    });

    addAndFormat(actions, {
      path: `${pathToFeatures}/${data.featureName}/${data.featureUi}/client/pages/${camelCase(
        data.pageName,
        { pascalCase: true }
      )}/${camelCase(data.pageName, { pascalCase: true })}.tsx`,
      templateFile: './shared/templates/page/Page.hbs',
      data: {
        ...data,
        name: data.pageName
      }
    });

    addAndFormat(actions, {
      path: `${pathToFeatures}/${data.featureName}/${data.featureUi}/client/pages/${camelCase(
        data.pageName,
        { pascalCase: true }
      )}/${camelCase(data.pageName, { pascalCase: true })}.stories.tsx`,
      templateFile: './shared/templates/page/Page.stories.hbs',
      data: {
        ...data,
        name: data.pageName
      }
    });

    actions.push({
      type: 'add',
      path: `../${pathToFeatures}/${data.featureName}/${data.featureUi}/client/translations/en.json`,
      templateFile: './feature/ui/client/translations/translation-en-json.hbs'
    });

    actions.push({
      type: 'add',
      path: `../${pathToFeatures}/${data.featureName}/${data.featureUi}/package.json`,
      templateFile: './feature/ui/package.hbs'
    });

    /* Logic feature *********************************************************************************** */

    if (data.includeLogic) {
      addAndFormat(actions, {
        path: `${pathToFeatures}/${data.featureName}/${data.featureLogic}/client/smart-components/${data.containerName}/${data.containerName}.tsx`,
        templateFile: './shared/templates/smart-component/Container.hbs',
        data: {
          name: data.containerName,
          queryName: 'Sample',
          returnType: {
            name: 'CatCategory',
            attributes: [{ name: 'id' }]
          }
        }
      });

      addAndFormat(actions, {
        path: `${pathToFeatures}/${data.featureName}/${data.featureLogic}/client/hooks/${data.hookName}.ts`,
        templateFile: './shared/templates/hook/useQuery.hbs',
        data: {
          name: data.hookName
        }
      });

      addAndFormat(actions, {
        path: `${pathToFeatures}/${data.featureName}/${data.featureLogic}/client/index.ts`,
        templateFile: './feature/logic/client/index.hbs'
      });

      actions.push({
        type: 'add',
        path: `../${pathToFeatures}/${data.featureName}/${data.featureLogic}/package.json`,
        templateFile: './feature/logic/package.hbs'
      });

      actions.push(
        'The feature generation is now complete. Run it as a standalone microfront-end, or add it to an app on a certain path'
      );
    }

    const apps = typeof data.apps === 'string' ? [data.apps] : data.apps;
    for (const app of apps) {
      actions.push({
        type: 'modifyJson',
        path: `${app}/package.json`,
        data: {
          dependencies: {
            [`@exo/frontend-features-${data.featureUi}`]: '^1.0.0'
          }
        }
      });
      actions.push({
        type: 'append',
        path: `../${app}/applications.ts`,
        pattern: 'const modules = {',
        template: `  ${data.featureName}: loadable(() => import('@exo/frontend-features-${data.featureUi}/client/App')),`
      });
      actions.push({
        type: 'append',
        path: `../${app}/applications.ts`,
        pattern: '      modules: {',
        template: `        '/${data.featureName}': modules.${data.featureName},`
      });
    }

    actions.push({ type: 'bootstrap' });

    return actions;
  }
};
