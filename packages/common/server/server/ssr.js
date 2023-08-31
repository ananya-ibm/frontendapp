/* eslint-disable no-console */
/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import express from 'express';
import fs from 'fs';
import path from 'path';
import { CmsContextProvider } from '@exo-provider/frontend-content-provider';
import pageRouter from './routers/page.router';

/* eslint-disable global-require, no-shadow, prefer-template */

const spdy = require('spdy');

// eslint-disable-next-line consistent-return
export default config => {
  const app = express();
  const chalk = require('chalk');
  const compression = require('compression');
  const { createProxyMiddleware } = require('http-proxy-middleware');
  // (See line 38)
  // const developmentMode = process.env.NODE_ENV === 'development';
  const { HTTPS, HTTPS_KEY, HTTPS_CERT, HTTPS_CA, PROXY_FROM, PROXY_TO, NODE_GZIP } = process.env;
  const PORT = config.port;

  if (PROXY_FROM && PROXY_TO) {
    app.use(
      PROXY_FROM,
      createProxyMiddleware({
        target: PROXY_TO,
        changeOrigin: true
      })
    );
  }
  if (NODE_GZIP) {
    app.use(compression());
    console.log(chalk.blue('Content is being compressed through g-zip 🤐'));
  }

  app.use(express.static('dist', { index: false }));

  CmsContextProvider.ssrInitAdditionalRoutes?.(config.config, app);

  app.use(pageRouter(path.join(process.cwd(), process.argv[2]), config));

  if (HTTPS === 'true') {
    const keyToUse = fs.readFileSync(HTTPS_KEY);
    const certToUse = fs.readFileSync(HTTPS_CERT);
    if (!keyToUse) {
      console.log('There is no HTTPS_KEY avaliable, and one cannot be found in your app directory');
      return process.exit(1);
    }
    if (!certToUse) {
      console.log(
        'There is no HTTPS_CERT avaliable, and one cannot be found in your app directory'
      );
      return process.exit(1);
    }
    const options = {
      key: keyToUse,
      cert: certToUse,
      ...(HTTPS_CA ? { ca: fs.readFileSync(HTTPS_CA, 'utf8') } : {})
    };
    // eslint-disable-next-line consistent-return
    spdy.createServer(options, app).listen(PORT, error => {
      if (error) {
        console.error(error);
        return process.exit(1);
      }
      console.log(
        `Your app is now running on https://localhost:${PORT} 🚀, with https 🔐 and HTTP/2 🤩`
      );
    });
  } else {
    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log(chalk.blue('Welcome to iX Experience Orchestrator 😍'));
      // eslint-disable-next-line no-console
      console.log(chalk.blue(`Your app is now running on http://localhost:${PORT}/ 🚀`));
    });
  }
};
