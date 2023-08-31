/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { createRoot, hydrateRoot } from 'react-dom/client';
import { loadableReady } from '@loadable/component';
import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { wrapHistory } from 'oaf-react-router';
import { CmsContextProvider } from '@exo-provider/frontend-content-provider';
import { HelmetProvider } from 'react-helmet-async';

import App from './App';
import applications from '../applications';

const history = createBrowserHistory();
wrapHistory(history);

if (window !== 'undefined' && window.Cypress) {
  // eslint-disable-next-line no-underscore-dangle
  window._exoHistory = history;
}

const promises = [];

// In certain environments (AEM) all loadable components must be loaded up-front
if (process.env.PRELOAD_ALL) {
  promises.push(
    ...applications?.featureConfig?.content?.components
      .filter(c => c?.component?.load)
      .map(c => c.component.load())
  );
}

if (CmsContextProvider.globalCmsInit) CmsContextProvider.globalCmsInit(applications);

const isSsr = process.env.CUSTOM_ENV?.includes('ssr');
const renderMethod = module.hot && !isSsr ?
  (app, container) => createRoot(container).render(app) :
  (app, container) => hydrateRoot(container, app);

Promise.all(promises).then(() => {
  loadableReady(() => {
    renderMethod(
      <Router history={history}>
        <HelmetProvider>
          <App config={applications} />
        </HelmetProvider>
      </Router>,
      document.getElementById('root')
    );
  });
});
