/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { apolloClientFactory } from '@exo/frontend-common-apollo';
import { getAddressIOProvider } from '@exo/frontend-features-account-address-search';
import { ApplicationConfig } from '@exo/frontend-common-app-shell';
import { loadable, rewriteConfig } from '@exo/frontend-apps-base';
import { cmsConfig } from '@exo/frontend-apps-commerce-base';
import { Chrome } from '@exo/frontend-features-chrome-ui';
import { AppWrapper } from './client/AppWrapper';

const featureFlag = s => s?.toUpperCase() === 'TRUE';

const client = apolloClientFactory({
  batch: process.env.GRAPHQL_BATCH === 'true',
  endpoint: process.env.GRAPHQL_ENDPOINT!
});

const modules = {
  home: loadable(() => import('@exo/frontend-features-automotive-dealer-homepage-ui/client/App')),
  qrscanner: loadable(() => import('@exo/frontend-features-automotive-dealer-qr-ui/client/App')),
  account: loadable(() => import('@exo/frontend-features-automotive-dealer-account-ui/client/App'))
};

export default {
  bundles: [
    {
      id: 'ROOT',
      url: 'http://localhost:3200',
      modules: {
        '/home': modules.home,
        '/qrscanner': modules.qrscanner,
        '/account': modules.account
      }
    }
  ],
  redirects: {
    '/': '/home/homepage',
    '/account-profile': '/account-profile/profile',
    '/automotive': '/home/homepage',
    '/content/homepage': '/home/homepage'
  },
  rewrite: rewriteConfig,
  appWrapper: AppWrapper,
  featureConfig: {
    content: cmsConfig,
    account: {
      profile: {
        ...(process.env.GET_ADDRESS_API_KEY ? { getAddressIOProvider } : {})
      },
      authentication: {
        loginRedirect: '/account-profile/profile',
        publicUrl: process.env.OIDC_PUBLIC_URL ?? 'https://localhost:3200',
        flow: process.env.OIDC_FLOW ?? 'password',
        carrier: process.env.OIDC_AUTH_CARRIER ?? 'token'
      }
    },
    chrome: {
      meta: {
        title: 'EXO Dealer Automotive',
        icon: 'data:;base64,iVBORw0KGgo='
      },
      localization: {
        canSelectCountry: true,
        canSelectCurrency: true,
        canSelectLanguage: true,

        defaultCountry: 'GB',
        defaultCurrency: 'GBP',
        defaultLangauge: 'en'
      },
      header: {
        extensions: {
          icons: [],
          extraHeaders: []
        },
        navigationUrlType: featureFlag(process.env.FEATURE_USE_CATALOG_SLUGS) ? 'slug' : 'id',
        navigationKey:
          !process.env.NAV_KEY || process.env.NAV_KEY === 'main'
            ? 'main'
            : `${process.env.NAV_KEY}_main`,
        menuTrigger: process.env.MENU_TRIGGER ?? 'hover'
      },
      footer: {
        copyright: `Copyright © ${new Date().getFullYear()} IBM All rights reserved.`
      },
      ui: Chrome
    },
    events: {
      provider: 'custom-dom-events'
      /*      provider: 'mqtt',
      mqtt: {
        topic: 'exo_auto_demo/global',
        broker: 'wss://mqtt.eclipseprojects.io/mqtt'
      } */
    }
  },
  client: () => client
} as ApplicationConfig;
