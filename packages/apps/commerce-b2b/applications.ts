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
import { MiniCartExt } from '@exo/frontend-features-cart-ui';
import { loadable, rewriteConfig, devToolbarConfig } from '@exo/frontend-apps-base';
import { cmsConfig } from '@exo/frontend-apps-commerce-base';
import { Chrome } from '@exo/frontend-features-b2b-chrome-ui';
import { AppWrapper } from './client/AppWrapper';

const featureFlag = s => s?.toUpperCase() === 'TRUE';

const client = apolloClientFactory({
  batch: process.env.GRAPHQL_BATCH === 'true',
  endpoint: process.env.GRAPHQL_ENDPOINT!
});

const modules = {
  content: loadable(() => import('@exo/frontend-features-content-ui/client/App')),
  home: loadable(() => import('@exo/frontend-features-b2b-homepage-ui/client/App')),
  checkout: loadable(() => import('@exo/frontend-features-checkout-ui/client/App')),
  accountProfile: loadable(() => import('@exo/frontend-features-account-profile-ui/client/App')),
  accountStores: loadable(() =>
    import('@exo/frontend-features-marketplace-store-admin-ui/client/App')
  ),
  accountB2b: loadable(() => import('@exo/frontend-features-b2b-account-ui/client/App')),
  marketplace: loadable(() => import('@exo/frontend-features-marketplace-ui/client/App')),
  auth: loadable(() => import('@exo/frontend-features-authentication-ui/client/App')),
  shop: loadable(() => import('@exo/frontend-features-b2b-shopping-ui/client/App'))
};

export default {
  bundles: [
    {
      id: 'ROOT',
      url: 'http://localhost:3000',
      modules: {
        '/content': modules.content,
        '/home': modules.home,
        '/account-profile': modules.accountProfile,
        '/account-stores': modules.accountStores,
        '/checkout': modules.checkout,
        '/my-company': modules.accountB2b,
        '/marketplace': modules.marketplace,
        '/auth': modules.auth,
        '/shop': modules.shop
      }
    }
  ],
  redirects: {
    '/': '/home/homepage',
    '/my-company': '/my-company/my-organization',
    '/account-profile': '/account-profile/profile',
    '/account-stores': '/account-stores/overview',
    '/cart/cart': '/shop'
  },
  rewrite: rewriteConfig,
  appWrapper: AppWrapper,
  featureConfig: {
    content: cmsConfig,
    checkout: {
      allowOrgAddress: featureFlag(process.env.B2B_ALLOW_ORG_ADDRESS)
    },
    account: {
      profile: {
        ...(process.env.GET_ADDRESS_API_KEY ? { getAddressIOProvider } : {})
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
          title: 'My company',
          id: 'my-company',
          url: '/my-company',
          items: [
            {
              url: '/my-company/approval',
              text: 'Approval Dashboard',
              id: 'approval-dashboard'
            },
            {
              url: '/my-company/my-organization',
              text: 'My Organization',
              id: 'my-organization'
            },
            {
              url: '/my-company/cost-centers',
              text: 'Cost Centers',
              id: 'cost-centers'
            },
            { url: '/my-company/budgets', text: 'Budgets', id: 'budgets' }
          ]
        },
        {
          title: 'My stores',
          id: 'account-stores',
          url: '/account-stores',
          items: [
            { url: '/account-stores/overview', text: 'Overview', id: 'stores' },
            {
              url: '/account-stores/store-info',
              text: 'Store info',
              id: 'store-info'
            },
            {
              url: '/account-stores/orders',
              text: 'Orders',
              id: ' '
            },
            {
              url: '/account-stores/shipping',
              text: 'Shipping',
              id: 'shipping'
            },
            {
              url: '/account-stores/products',
              text: 'Products',
              id: 'products'
            }
          ]
        }
      ]
    },
    authentication: {
      loginRedirect: '/home/homepage',
      publicUrl: process.env.OIDC_PUBLIC_URL ?? 'https://localhost:3200',
      flow: process.env.OIDC_FLOW ?? 'password',
      carrier: process.env.OIDC_AUTH_CARRIER ?? 'token'
    },
    catalog: {
      useSlugs: featureFlag(process.env.FEATURE_USE_CATALOG_SLUGS),
      useSlugseparator: featureFlag(process.env.FEATURE_USE_CATALOG_SLUG_SEPARATOR),
      slugSeparator: '@@',
      pdp: {
        availability: process.env.FEATURE_AVAILABILITY_ON_PDP,
        template: 'standard'
      },
      plp: {
        availability: process.env.FEATURE_AVAILABILITY_ON_PROD_CARDS,
        reviews: featureFlag(process.env.FEATURE_REVIEWS_ON_PROD_CARDS)
      },
      defaultCurrency: 'USD',
      defaultStoreId: undefined,
      baseSort: 'RELEVANCE',
      baseFacets: process.env.BASE_PRODUCT_TYPE ? [process.env.BASE_PRODUCT_TYPE] : [],
      filters: {
        includesPrice: true
      }
    },
    chrome: {
      meta: {
        title: 'EXO B2B',
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
    },
    'b2b-homepage': {
      advancedSearch: 'simple',
      mainSearchField: 'vin-number',
      mainSearchFieldDisplay: 'VIN Number'
    },
    devToolbar: devToolbarConfig
  },
  client: () => client
} as ApplicationConfig;
