/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplicatiols -lan or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

const fs = require('fs');

function promptSelectFeature(args) {
  return {
    ...(args ?? {}),
    type: 'list',
    name: 'feature',
    message: 'Select target feature',
    pageSize: 12,
    choices: (vars) => {
      return [
        ...(fs.existsSync('client-packages/features') ? fs.readdirSync('client-packages/features').map(d => `client-packages/features/${d}`) : []),
        ...(fs.readdirSync('packages/features').map(d => `packages/features/${d}`))
      ]
    },
    bypass: (a) => a
  };
};

function promptSelectComponentPackage(args) {
  return {
    ...(args ?? {}),
    type: 'list',
    name: 'componentPackage',
    message: 'Select component package',
    pageSize: 12,
    choices: (vars) => {
      return [
        ...(fs.existsSync('client-packages/components') ? fs.readdirSync('client-packages/components').map(d => `client-packages/components/${d}`) : []),
        ...(fs.readdirSync('packages/components').map(d => `packages/components/${d}`))
      ]
    },
    bypass: (a) => a
  };
};

function promptSelectUIFeature(args) {
  return {
    ...(args ?? {}),
    type: 'list',
    name: 'featureUi',
    message: 'Select UI feature package',
    pageSize: 12,
    default: (vars) => {
      return fs.readdirSync(vars.feature).find(e => e.endsWith('-ui'));
    },
    choices: (vars) => {
      return fs.readdirSync(vars.feature).map(f => ({
        value: f
      }));
    },
    bypass: (a) => a
  };
}

function promptSelectLogicFeature(args) {
  return {
    ...(args ?? {}),
    type: 'list',
    name: 'featureLogic',
    message: 'Select logic feature package',
    pageSize: 12,
    default: (vars) => {
      return fs.readdirSync(vars.feature).find(e => e.endsWith('-logic'));
    },
    choices: (vars) => {
      return fs.readdirSync(vars.feature).map(f => ({
        value: f
      }));
    },
    bypass: (a) => a
  }
}

module.exports = { promptSelectLogicFeature, promptSelectFeature, promptSelectUIFeature, promptSelectComponentPackage };