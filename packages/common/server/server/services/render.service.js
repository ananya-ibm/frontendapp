/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { StaticRouter } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ServerStyleSheet } from 'styled-components';
import React from 'react';
import { getMarkupFromTree } from "@apollo/client/react/ssr";
import { apolloClientFactory } from '@exo/frontend-common-apollo';
import { ApolloProvider } from '@apollo/client';
import { Theme } from '@exo/frontend-common-theme-proxy';
import { ChunkExtractor } from '@loadable/server';
import { CmsContextProvider } from '@exo-provider/frontend-content-provider';
import * as ReactDOMServer from 'react-dom/server';
import fs from 'fs';
import zlib from 'zlib';
import etag from 'etag';

const pushResources = {};

const pushResource = (res, name, type) => {
  if (process.env.NODE_ENV !== 'production') return;
  if (! pushResources[name]) {
    if (!fs.existsSync(`dist/${name}.br`) || !fs.existsSync(`dist/${name}`)) return;

    pushResources[name] = {
      bundle: fs.readFileSync(`dist/${name}.br`),
      etag: etag(fs.readFileSync(`dist/${name}`), { weak: true })
    }    
  }
  const stream = res.push('/' + name, {
    status: 200, 
    method: 'GET',
    request: {
      accept: '*/*'
    },
    response: {
      'content-type': type,
      'content-encoding': 'br',
      'cache-control': 'public, max-age=0',
      'etag': pushResources[name].etag
    }
  })
  if (stream) stream.end(pushResources[name].bundle);   
}

const renderPageOnServer = async (
  url,
  statsFile,
  config,
  req,
  res,
  stylesHash,
  query,
  additionalData
) => {
  try {
    const appStylesheet = new ServerStyleSheet();
    const context = Object.keys(query).length > 0 ? { query } : {};
    const App = config.app;

    if (url in config.config.redirects) {
      res.redirect(config.config.redirects[url]);
      return;
    }

    // Push client bundle on the initial load for better performance
    // ... use a cookie to prevent it from being pushed on all requests
    if (res.push /* && !(req.headers.cookie ?? '').includes('exocache=1') */) {
      // res.set('Set-Cookie', 'exocache=1; Max-Age=3600000');

      pushResource(res, 'client.bundle.js', 'application/javascript');
    }

    const client = apolloClientFactory({
      endpoint: process.env.GRAPHQL_ENDPOINT,
      ssrMode: true
    });

    if (CmsContextProvider.globalCmsInit) CmsContextProvider.globalCmsInit(config.config);

    const ssrGetContentState =
      (await CmsContextProvider.ssrInit?.(config.config, url, additionalData)) ?? (() => '');

    const helmetContext = {};
    const tree = (
      <HelmetProvider context={helmetContext}>
        <ApolloProvider client={client}>
          {appStylesheet.collectStyles(
            <StaticRouter location={url} context={context}>
              <App config={config.config} />
            </StaticRouter>
          )}
        </ApolloProvider>
      </HelmetProvider>
    );

    const extractor = new ChunkExtractor({ statsFile });
    const jsx = extractor.collectChunks(tree);

    const appHtml = await getMarkupFromTree({
      tree: jsx,
      renderFunction: ReactDOMServer.renderToString
    });

    if (context.url) {
      res.redirect(context.url);
      return;
    }

    const appStyles = appStylesheet.getStyleTags();

    // TODO: This is a workaround for a defect of loadable-components. This makes the main bundle be loaded as second item
    // in the list and in a synchronous way - i.e. not defer nor async
    const extractedScripts = extractor
      .getScriptTags()
      .split('\n')
      .filter(l => !l.includes('client.bundle.js'));
    const scripts = [
      extractedScripts[0],
      '<script async src="/client.bundle.js"></script>',
      ...extractedScripts.slice(1)
    ];
    const { helmet } = helmetContext;
    const dynamicEnvironment = (process.env.DYNAMIC_ENV_KEYS ?? '')
      .split(',')
      .map(k => `window.__${k}__ = "${process.env[k]}";`)
      .join('\n');

    const fullPageHtml = config.pageTemplate(
      appHtml,
      `
        <script>
          window.__APOLLO_STATE__ = ${JSON.stringify(client.extract())}; 
          ${dynamicEnvironment}
        </script>
        ${ssrGetContentState()}
        ${scripts.join('\n')}
      `,
      `
        <link rel="preload" href="/client.bundle.js" as="script">
        ${(Theme.globalStyles.cssUrls ?? [])
          .map(u => {
            return `<link rel="stylesheet" type="text/css" href="${u}">`;
          })
          .join('\n')}
        <link rel="stylesheet" type="text/css" href="/carbon_${stylesHash}.css">
        ${appStyles}
      `,
      '',
      helmet
    );

    // To include instead of link to CSS
    //       <style>${Theme.globalStyles?.cssRules ?? ''}</style>
    //       <link rel="stylesheet" type="text/css" href="/carbon_${stylesHash}.css">


    res.status(200);
    res.send(fullPageHtml);
  } catch (e) {
    res.status(500);
    res.send("Unknown error");
    console.log(e);
  }
};

export { renderPageOnServer };
