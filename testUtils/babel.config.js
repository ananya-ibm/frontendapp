/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
      '@babel/react',
      '@babel/preset-env',
      '@babel/preset-typescript'
    ],
    plugins: [
      'babel-plugin-styled-components',
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-class-properties',
      [
        '@babel/plugin-transform-runtime',
        {
          absoluteRuntime: true,
        },
      ]
    ]
  };
};
