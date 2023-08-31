/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

const appGenerator = require('./app/index.js');
const microfrontEndGenerator = require('./feature/index.js');
const uiComponentGenerator = require('./ui-component');
const smartComponentGenerator = require('./smart-component');
const themeGenerator = require('./theme/index.js');
const customizeFeature = require('./customize-feature/index.js');
const clientBootstrapGenerator = require('./client-bootstrap/index.js');
const featureContentFromGQL = require('./feature-content-from-gql/index.js');
const pageGenerator = require('./page/index.js');
const hookGenerator = require('./hook/index.js');
const uiComponentPackageGenerator = require('./ui-component-package/index.js');

const _ = require('lodash');
const { ESLint } = require("eslint");
const fs = require('fs');
const { execSync } = require('child_process');

/** 
 * This adds the ability to bypass the prompts of a generator, even if
 * the generator uses dynamic prompts
 */
const wrapGenerator = (generator) => {
  if (process.argv.includes('--force-bypass')) {
    return {
      ...generator,
      prompts: generator.prompts.map(p => ({ ...p, when: (d) => false })),
      actions: () => {
        const s = process.argv.findIndex((e) => e === '--args');
        const data = {};
        for (let i = s + 1; i < process.argv.length; i += 2) {
          const key = process.argv[i].substring(2);
          data[key] = process.argv[i + 1];
          const p = generator.prompts.find(p => p.name === key);
          if (p && p.bypass) {
            data[key] = p.bypass(data[key]);
          }
        }

        const actions = generator.actions(data);
        actions.forEach(a => a.data = { ...data, ...(a.data ?? {}) });
        return actions;
      }
    }
  }
  return generator;
};

module.exports = plop => {
  plop.setActionType('format', async (answers, config, plopInstance) => {
    if (config && config.path && plopInstance) {
      const filePath = plopInstance.renderString(config.path, answers);
      const eslint = new ESLint({
        fix: true, useEslintrc: false, baseConfig: {
          parser: '@typescript-eslint/parser',
          parserOptions: {
            ecmaFeatures: {
              legacyDecorators: true,
              experimentalDecorators: false
            }
          },
          rules: {
            "unused-imports/no-unused-imports": "error",
            "prettier/prettier": "error"
          },
          plugins: ["prettier", "unused-imports"]
        }
      });
      const results = await eslint.lintFiles(filePath);
      await ESLint.outputFixes(results);
      return filePath;
    }

    throw new Error('Formatting skipped');
  });

  plop.setActionType('addToIndex', async (answers, config, plopInstance) => {
    if (config && config.path && plopInstance) {
      const filePath = plopInstance.renderString(config.path, answers);

      const lines = fs.readFileSync(filePath).toString().trim().split('\n');

      let delimiter = lines.length - 1;
      for (let i = lines.length - 1; i > 0; i--) {
        if (lines[i] === '') {
          delimiter = i;
          break;
        }
      }

      const preamble = lines.slice(0, delimiter + 1);
      let lastBlock = lines.slice(delimiter + 1, lines.length);

      lastBlock.push(config.line);
      lastBlock = [...new Set(lastBlock)].sort();

      fs.writeFileSync(filePath, [...preamble, ...lastBlock].join('\n'));

      return filePath;
    }

    throw new Error('addToIndex');
  });

  plop.setActionType('modifyJson', async (answers, config, plopInstance) => {
    if (config && config.path && config.data && plopInstance) {
      const filePath = plopInstance.renderString(config.path, answers);

      const inData = JSON.parse(fs.readFileSync(filePath).toString());

      const res = _.merge(inData, config.data);
      fs.writeFileSync(filePath, JSON.stringify(res, undefined, '  '));

      return filePath;
    }

    throw new Error('modifyJson');
  });

  plop.setActionType('bootstrap', async (answers, config, plopInstance) => {
    execSync(`npm run bootstrap`)
  });

  plop.setGenerator('New Feature', wrapGenerator(microfrontEndGenerator));
  plop.setGenerator('New Page', wrapGenerator(pageGenerator));
  plop.setGenerator('New UI Component', wrapGenerator(uiComponentGenerator));
  plop.setGenerator('New UI Component Package', wrapGenerator(uiComponentPackageGenerator));
  plop.setGenerator('New App', wrapGenerator(appGenerator));
  plop.setGenerator('New Smart Component', wrapGenerator(smartComponentGenerator));
  plop.setGenerator('New GraphQL Hook', wrapGenerator(hookGenerator));
  plop.setGenerator('New Theme', wrapGenerator(themeGenerator));

  plop.setGenerator(
    'Scaffold feature from GQL',
    wrapGenerator(featureContentFromGQL)
  );

  plop.setGenerator(
    'Bootstrap vanilla client project',
    wrapGenerator(clientBootstrapGenerator)
  );

  plop.setGenerator(
    'Customize Feature',
    wrapGenerator(customizeFeature)
  );
};
