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
import { MiniCartExt } from '@exo/frontend-features-automotive-cart-automotive-logic';
import { loadable, rewriteConfig } from '@exo/frontend-apps-base';
import { cmsConfig } from '@exo/frontend-apps-commerce-base';
import { Chrome } from '@exo/frontend-features-chrome-ui';
import { AppWrapper } from './client/AppWrapper';

const HeroBarExt = loadable(
  () => import('@exo/frontend-features-automotive-configurator-ui/client'),
  {
    resolveComponent: loaded => loaded.ConfiguratorEntryBarExt
  }
);

const featureFlag = s => s?.toUpperCase() === 'TRUE';

const client = apolloClientFactory({
  batch: process.env.GRAPHQL_BATCH === 'true',
  endpoint: process.env.GRAPHQL_ENDPOINT!
});

const modules = {
  automotive: loadable(() =>
    import('@exo/frontend-features-automotive-configurator-ui/client/App')
  ),
  catalog: loadable(() => import('@exo/frontend-features-catalog-ui/client/App')),
  content: loadable(() => import('@exo/frontend-features-content-ui/client/App')),
  home: loadable(() => import('@exo/frontend-features-automotive-homepage-ui/client/App')),
  cart: loadable(() => import('@exo/frontend-features-automotive-cart-automotive-ui/client/App')),
  placeholder: loadable(() => import('@exo/frontend-features-automotive-placeholder-ui/client/App')),
  profile: loadable(() => import('@exo/frontend-features-account-profile-ui/client/App')),
  automotiveAccount: loadable(() =>
    import('@exo/frontend-features-automotive-account-ui/client/App')
  ),
  auth: loadable(() => import('@exo/frontend-features-authentication-ui/client/App')),
  vr: loadable(() => import('@exo/frontend-features-automotive-vr-car-ui/client/App'))
};

export default {
  bundles: [
    {
      id: 'ROOT',
      url: 'http://localhost:3000',
      modules: {
        '/content': modules.content,
        '/home': modules.home,
        '/catalog': modules.catalog,
        '/automotive': modules.automotive,
        '/cart': modules.cart,
        '/account-profile': modules.profile,
        '/account-automotive': modules.automotiveAccount,
        '/placeholder': modules.placeholder,
        '/auth': modules.auth,
        '/vr': modules.vr
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
    automotive: {
      vr: featureFlag(process.env.VR_CAR)
    },
    account: {
      profile: {
        ...(process.env.GET_ADDRESS_API_KEY ? { getAddressIOProvider } : {})
      },
      authentication: {
        loginRedirect: '/account-profile/profile',
        publicUrl: process.env.OIDC_PUBLIC_URL ?? 'https://localhost:3200',
        flow: process.env.OIDC_FLOW ?? 'password',
        carrier: process.env.OIDC_AUTH_CARRIER ?? 'token'
      },
      accounts: [
        {
          title: 'My profile',
          id: 'account-profile',
          url: '/account-profile',
          items: [
            { url: '/account-profile/profile', text: 'Profile', id: 'profile' },
            {
              url: '/account-profile/details',
              text: 'Personal details',
              id: 'details'
            },
            {
              url: '/account-profile/orders',
              text: 'My orders',
              id: 'orders'
            },
            {
              url: '/account-profile/security',
              text: 'Account security',
              id: 'security'
            },
            {
              url: '/account-profile/addresses',
              text: 'Manage addresses',
              id: 'addresses'
            },
            {
              url: '/account-profile/preferences',
              text: 'Preferences',
              id: 'preferences'
            },
            {
              url: '/account-profile/payment',
              text: 'Payment methods',
              id: 'payment'
            }
          ]
        },
        {
          title: 'My car',
          id: 'account-automotive',
          url: '/account-automotive',
          items: [
            {
              url: '/account-automotive/profile',
              text: 'Overview',
              id: 'auto-profile'
            },
            {
              url: '/account-automotive/vehicle',
              text: 'Vehicle dashboard',
              id: 'vehicle'
            },
            {
              url: '/account-automotive/orders',
              text: 'Order History',
              id: 'auto-orders'
            },
            {
              url: '/account-automotive/configurations',
              text: 'Saved configurations',
              id: 'configurations'
            },
            {
              url: '/account-automotive/messages',
              text: 'Messages',
              id: 'messages'
            },
            {
              url: '/account-automotive/subscriptions',
              text: 'My subscriptions',
              id: 'subscriptions'
            },
            {
              url: '/account-automotive/payments',
              text: 'My payments',
              id: 'payments'
            },
            {
              url: '/account-automotive/lease',
              text: 'My lease',
              id: 'lease'
            },
            {
              url: '/account-automotive/documents',
              text: 'My documents',
              id: 'documents'
            },
            {
              url: '/account-automotive/visit-dealer',
              text: 'Visit Dealer',
              id: 'dealer'
            }
          ]
        }
      ]
    },

    catalog: {
      useSlugs: featureFlag(process.env.FEATURE_USE_CATALOG_SLUGS),
      useSlugseparator: featureFlag(process.env.FEATURE_USE_CATALOG_SLUG_SEPARATOR),
      slugSeparator: '@@',
      pdp: {
        availability: process.env.FEATURE_AVAILABILITY_ON_PDP,
        template: 'hero',
        extensions: {
          heroBar: HeroBarExt
        }
      },
      plp: {
        availability: process.env.FEATURE_AVAILABILITY_ON_PROD_CARDS,
        reviews: featureFlag(process.env.FEATURE_REVIEWS_ON_PROD_CARDS)
      },
      defaultCurrency: 'GBP',
      defaultStoreId: undefined,
      baseSort: process.env.BASE_SORT || 'PRICE_ASCENDING',
      baseFacets: process.env.BASE_PRODUCT_TYPE ? [process.env.BASE_PRODUCT_TYPE] : [],
      filters: {
        includesPrice: true
      }
    },
    chrome: {
      meta: {
        title: 'EXO Automotive',
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
          icons: [MiniCartExt],
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

