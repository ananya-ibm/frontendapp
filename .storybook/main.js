const path = require('path');
const fs = require('fs');
const dotenv = require('dotenv');
const webpack = require('webpack');
const { getProviders, getOverridden, getOverrides, getEnv } = require('../buildUtils/lib/aliases');

const { getThemePackages } = require('../buildUtils/theme/themeUtils');

const MAX_THEME_COUNT = 10;

// Determine themes - using env variable with static fallback
const THEME_LIST = [];
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const env = dotenv.parse(fs.readFileSync(envPath));
  getThemePackages(path.resolve(__dirname, '..'), env.STORYBOOK_THEMES.split(',')).forEach(p => {
    THEME_LIST.push(p);
  });
} else {
  THEME_LIST.push({
    type: 'file',
    name: './packages/themes/default-theme/src'
  });
  THEME_LIST.push({
    type: 'file',
    name: './packages/themes/dark-theme/src'
  });
  THEME_LIST.push({
    type: 'file',
    name: './packages/themes/automotive-theme/src'
  });
  THEME_LIST.push({
    type: 'file',
    name: './packages/themes/carbon-g100-theme/src'
  });
  THEME_LIST.push({
    type: 'file',
    name: './packages/themes/ibm-consulting-theme/src'
  });
  THEME_LIST.push({
    type: 'file',
    name: './packages/themes/impact-solution-theme/src'
  });
  THEME_LIST.push({
    type: 'file',
    name: './packages/themes/sample-theme/src'
  });
  THEME_LIST.push({
    type: 'file',
    name: './packages/themes/b2b-theme/src'
  });
}

const stories = eval(`__tmp=${fs.readFileSync('./.storybook/stories.json').toString()}`);

module.exports = {
  features: {
    storyStoreV7: true
  },
  typescript: {
    reactDocgen: 'react-docgen'
  },
  core: {
    builder: 'webpack5'
  },
  stories: [
    '../storybook/theme-overview/**/*.stories.mdx',
    '../storybook/features-overview/**/*.stories.mdx',

    ...stories.map(s => `../${s}/**/*.stories.@(js|tsx)`)
  ],
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-a11y/register',
    path.join(__dirname, 'theme-addon/src/preset'),
    path.join(__dirname, 'i18n-addon/src/preset'),
    '@storybook/addon-storysource',
    '@storybook/addon-essentials'
  ],
  webpackFinal: async config => {
    const toBeIncluded = [];

    config.externals = [
      {
        // This is used for the AEM SSR - and should not be included in build
        'http-proxy-middleware': 'http-proxy-middleware'
      }
    ];

    // Needed to load page stories
    config.plugins.push(
      new webpack.DefinePlugin({
        process: {
          env: {}
        }
      })
    );

    const repoRoot = path.join(__dirname, '..');
    getProviders(getEnv(repoRoot, 'STORYBOOK', {}), repoRoot, true).forEach(e =>
      config.resolve.alias[e.package] = path.resolve(repoRoot, e.entry));

    getOverridden(getEnv(repoRoot, 'STORYBOOK', {}), repoRoot, true).forEach(e =>
      config.resolve.alias[e.originalPackage] = path.resolve(repoRoot, e.path));

    getOverrides(getEnv(repoRoot, 'STORYBOOK', {}), repoRoot, true).forEach(e =>
      config.resolve.alias[e.overriddenPackage] = path.resolve(repoRoot, e.override));


    // TODO: Can we get this automatically from the file-system instead
    // Alias each theme as @exo-provider/frontend-theme-<n>
    THEME_LIST.forEach(({ type, name }, idx) => {
      const themeAlias = `@exo-provider/frontend-theme-${idx}`;
      if (type === 'file') {
        config.resolve.alias[themeAlias] = path.resolve(__dirname, '..', name);
        if (idx === 0) {
          config.resolve.alias['@exo-provider/frontend-theme'] = path.resolve(__dirname, '..', name);
        }
      } else {
        config.resolve.alias[themeAlias] = name;
        if (idx === 0) {
          config.resolve.alias['@exo-provider/frontend-theme'] = name;
        }
        toBeIncluded.push(path.resolve(__dirname, '..', 'node_modules', name));
      }
    });

    // Alias empty theme for @exo-provider/frontend-theme-<n> for remaining slots
    // only way to get it included in storybook webpack build
    for (let i = THEME_LIST.length; i < MAX_THEME_COUNT; i++) {
      const themeAlias = `@exo-provider/frontend-theme-${i}`;
      config.resolve.alias[themeAlias] = path.resolve(__dirname, '../buildUtils/theme/fakeTheme');
    }

    // do mutation to the config
    // https://stackoverflow.com/questions/52148779/storybook-fails-to-parse-jsx-from-directories-imported-from-anywhere-behind-the

    // Support SASS for Carbon Components
    config.module.rules.push({
      test: /\.scss$/,
      use: ['css-loader', 'sass-loader']
    });

    config.module.rules = config.module.rules.map(rule => {
      if (
        String(rule.test) ===
        String(/\.(svg|ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/)
      ) {
        return {
          ...rule,
          test: /\.(ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/
        };
      }

      return rule;
    });

    config.module.rules.unshift({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

    return config;
  },
  framework: '@storybook/react'
};
