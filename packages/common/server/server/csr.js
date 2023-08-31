/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-console */

import express from 'express';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import compression from 'compression';
import { createProxyMiddleware } from 'http-proxy-middleware';

const escapeRegExp = string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
};

const spdy = require('spdy');
// eslint-disable-next-line consistent-return
export default port => {
  const appDirectory = fs.realpathSync(process.cwd());
  const resolveAppPath = relativePath => {
    return path.resolve(appDirectory, relativePath);
  };

  const app = express();

  const {
    PORT = port,
    HTTPS,
    HTTPS_KEY,
    HTTPS_CERT,
    HTTPS_CA,
    PROXY_FROM,
    PROXY_TO,
    NODE_GZIP
  } = process.env;

  app.use(cors());

  if (NODE_GZIP) {
    app.use(compression());
    console.log('Content is being compressed through g-zip 🤐');
  }

  if (PROXY_FROM && PROXY_TO) {
    app.use(
      PROXY_FROM,
      createProxyMiddleware({
        target: PROXY_TO,
        changeOrigin: true
      })
    );
  }
  app.post('/graphql', (req, res) => {
    res.redirect(307, process.env.GRAPHQL_ENDPOINT);
  });

  const dynamicEnvironment = (process.env.DYNAMIC_ENV_KEYS ?? '')
    .split(',')
    .map(k => `window.__${k}__ = "${process.env[k]}";`)
    .join('\n');

  const p = resolveAppPath('dist/index.html');
  const payload = fs
    .readFileSync(p)
    .toString()
    .replace(
      new RegExp(escapeRegExp('<script id="dynamic_environment"></script>')),
      `<script>${dynamicEnvironment}</script>`
    );

  app.get('/', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.send(Buffer.from(payload));
  });

  app.use(express.static('dist'));

  app.get('/*', (req, res) => {
    res.set('Content-Type', 'text/html');
    res.send(Buffer.from(payload));
  });

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
      console.log(`Your app is now running on http://localhost:${PORT} 🚀`);
    });
  }
};
