/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

const path = require('path');

function webpack(baseConfig, options) {
  const origUse = baseConfig.module.rules[0].use;
  /*  delete baseConfig.module.rules[0].use;
  baseConfig.module.rules[0].oneOf = [
    {
      resourceQuery: /theme-ast/,
      use: [
        {
          loader: path.join(__dirname, 'themeAstLoader.js')
        }
      ]    
    },
    {
      use: origUse    
    }
  ];*/

  return {
    ...baseConfig,
    resolve: {
      ...(baseConfig.resolve || {}),
      alias: {
        ...(baseConfig.resolve.alias || {}),
        'ixl-frontend-storybook-theme-addon': path.join(__dirname)
      }
    }
  };
}

function managerEntries(entry = []) {
  return [...entry, path.join(__dirname, './register')];
}

function babel(config) {
  return {
    ...config,
    plugins: [path.join(__dirname, 'themeRefBabelPlugin.js'), ...config.plugins]
  };
}

module.exports = {
  webpack,
  managerEntries,
  babel
};
