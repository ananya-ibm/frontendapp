const path = require('path');

function webpack(baseConfig, options) {
  return {
    ...baseConfig,
    resolve: {
      ...(baseConfig.resolve || {}),
      alias: {
        ...(baseConfig.resolve.alias || {}),
        'ixl-frontend-storybook-i18n-addon': path.join(__dirname)
      }
    }
  };
}

function config(entry = []) {
  return [...entry, require.resolve('storybook-i18n/preview')];
}

function managerEntries(entry = []) {
  return [
    ...entry,
    require.resolve('storybook-i18n/manager') // <-- your addon's manager (if present)
  ];
}

module.exports = { webpack, config, managerEntries };
