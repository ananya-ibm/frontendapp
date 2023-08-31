/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { apolloClientFactory } from '@exo/frontend-common-apollo';
import { ApplicationConfig } from '@exo/frontend-common-app-shell';
import { loadable, devToolbarConfig } from '@exo/frontend-apps-base';
import { cmsConfig } from '@exo/frontend-apps-commerce-base';
import { Chrome } from '@exo/frontend-features-chrome-ui';
import { AppWrapper } from './client/AppWrapper';

const client = apolloClientFactory({
  batch: process.env.GRAPHQL_BATCH === 'true',
  endpoint: process.env.GRAPHQL_ENDPOINT!
});

const modules = {
  home: loadable(() => import('@exo/frontend-features-utilities-homepage-ui/client/App'), {
    type: 'page'
  })
};

export default {
  bundles: [
    {
      id: 'ROOT',
      url: 'http://localhost:3000',
      modules: {
        '/home/homepage': modules.home
      }
    }
  ],
  redirects: {
    '/': '/home/homepage'
  },
  appWrapper: AppWrapper,
  featureConfig: {
    content: cmsConfig,
    chrome: {
      meta: {
        title: 'EXO Utilities',
        icon: 'data:;base64,iVBORw0KGgo='
      },
      localization: {
        canSelectCountry: true,
        canSelectCurrency: true,
        canSelectLanguage: true,

        defaultCountry: 'US',
        defaultCurrency: 'USD',
        defaultLangauge: 'en'
      },
      header: {
        extensions: {
          icons: [],
          extraHeaders: []
        }
      },
      footer: {
        copyright: `Copyright © ${new Date().getFullYear()} IBM All rights reserved.`
      },
      ui: Chrome
    },
    devToolbar: devToolbarConfig
  },
  client: () => client
} as ApplicationConfig;
