/* eslint-disable func-names */
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['@babel/preset-env', { modules: false, useBuiltIns: 'entry', corejs: "3.22" }],
      '@babel/preset-react',
      '@babel/preset-typescript'
    ],
    plugins: [
      ['babel-plugin-styled-components', { ssr: true, displayName: false, pure: true }],
      '@loadable/babel-plugin',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-class-properties',
      [
        '@babel/plugin-transform-runtime',
        {
          absoluteRuntime: true,
          useESModules: true
        }
      ]
    ]
  };
};
