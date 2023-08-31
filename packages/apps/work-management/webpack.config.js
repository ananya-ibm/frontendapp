/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/


const dotenv = require('dotenv');
const dotenvExpand = require('dotenv-expand');

process.env.PROVIDERS_THEME = process.env.PROVIDERS_THEME || 'packages/themes/default-theme/src/index.ts';

const webpack = require('../../../webpack.config');

const aemDevelopmentEnv = dotenvExpand({
  ...dotenv.config({ path: `${process.cwd()}/.env.aem.development` }).parsed
});

module.exports = (env) => {
  const res = webpack(env);
  res.forEach(r => {
    // eslint-disable-next-line no-param-reassign
    if (r.devServer) r.devServer.proxy = {
      '/content/carbon-commerce-ssr': { target: process.env.PROXY_TO, secure: false, changeOrigin: true }
    };
    return null;
  });
  return res;
};