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
import { Chrome } from '@exo/frontend-features-chrome-ui';
import { AppWrapper } from './client/AppWrapper';

const featureFlag = s => s?.toUpperCase() === 'TRUE';

const client = apolloClientFactory({
  batch: process.env.GRAPHQL_BATCH === 'true',
  endpoint: process.env.GRAPHQL_ENDPOINT!
});

const SpeechlyExt = loadable(() => import('@exo/frontend-features-speechly-search-api'), {
  resolveComponent: loaded => loaded.SpeechlySearch
});

const TutorialExt = loadable(() => import('@exo/frontend-features-tutorial'), {
  resolveComponent: loaded => loaded.Tutorial
});

const SAPCAExt = loadable(
  () => import('@exo/frontend-features-chat-sap-conversational-assistance-ui'),
  {
    resolveComponent: loaded => loaded.SapConversationalAssistanceLoader
  }
);

const modules = {
  catalog: loadable(() => import('@exo/frontend-features-catalog-ui/client/App'), { type: 'page' }),
  content: loadable(() => import('@exo/frontend-features-content-ui/client/App'), { type: 'page' }),
  home: loadable(() => import('@exo/frontend-features-homepage-ui/client/App'), { type: 'page' }),
  cart: loadable(() => import('@exo/frontend-features-cart-ui/client/App'), { type: 'page' }),
  checkout: loadable(() => import('@exo/frontend-features-checkout-ui/client/App'), { type: 'page' }),
  storeFinder: loadable(
    () => import('@exo/frontend-features-store-store-finder-ui/client/App'),
    { type: 'page' }
  ),
  accountProfile: loadable(
    () => import('@exo/frontend-features-account-profile-ui/client/App'),
    { type: 'page' }
  ),
  accountStores: loadable(
    () => import('@exo/frontend-features-marketplace-store-admin-ui/client/App'),
    { type: 'page' }
  ),
  accountB2b: loadable(
    () => import('@exo/frontend-features-b2b-account-ui/client/App'),
    { type: 'page' }
  ),
  marketplace: loadable(
    () => import('@exo/frontend-features-marketplace-ui/client/App'),
    { type: 'page' }
  ),
  auth: loadable(() => import('@exo/frontend-features-authentication-ui/client/App'), { type: 'page' }),
  authGigya: loadable(
    () => import('@exo/frontend-features-authentication-sap-gigya-ui/client/App'),
    { type: 'page' }
  ),
  wishlist: loadable(() => import('@exo/frontend-features-wishlist-ui/client/App'), { type: 'page' })
};

export default {
  bundles: [
    {
      id: 'ROOT',
      url: 'http://localhost:3000',
      modules: {
        '/': modules.home,
        '/content': modules.content,
        '/catalog': modules.catalog,
        '/cart': modules.cart,
        '/checkout': modules.checkout,
        '/account-profile': modules.accountProfile,
        '/account-stores': modules.accountStores,
        '/marketplace': modules.marketplace,
        '/store-finder': modules.storeFinder,
        ...(process.env.AUTH === 'gigya'
          ? { '/auth': modules.authGigya }
          : { '/auth': modules.auth }),
        '/wishlist': modules.wishlist
      }
    }
  ],
  redirects: {
    '/my-company': '/my-company/my-organization',
    '/account-profile': '/account-profile/profile',
    '/account-stores': '/account-stores/overview'
  },
  rewrite: [
    ...(rewriteConfig ?? []), 

    // This is a sample rule to document how rewrites can be setup
    {
      type: 'simple',
      seo: '/authentication/:name',
      exo: '/auth/:name'
    }

    // Another sample rule to show how variables are retained
    /*
    {
      type: 'inbound',
      from: '/:lang/authentication/:name',
      to: '/auth/:name'
    },
    {
      type: 'outbound',
      from: '/auth/:name',
      to: '/:in--lang/authentication/:name'
    }
    */
  ],
  appWrapper: AppWrapper,
  featureConfig: {
    content: {
      ...cmsConfig,
      sample: require(`./content/${process.env.CMS_SAMPLE_PROVIDER_DATASET ?? 'empty'}`).default
    },
    cart: {
      // TODO: Make helper for this somehow
      useZipIn: process.env.FEATURE_CART_ZIP_IN?.toUpperCase() === 'TRUE' 
        ? 'full' 
        : process.env.FEATURE_CART_ZIP_IN === undefined ? 'none'
        : process.env.FEATURE_CART_ZIP_IN === 'undefined' ? 'none' 
        : process.env.FEATURE_CART_ZIP_IN?.toUpperCase() === 'FALSE' ? 'none' 
        : process.env.FEATURE_CART_ZIP_IN
    },
    account: {
      profile: {
        requireOldPasswordWhenChanging: featureFlag(process.env.FEATURE_REQUIRE_OLD_PASSWORD),
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
              id: 'store-orders'
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
    homepage: {
      extensions: {
        body: featureFlag(process.env.FEATURE_TUTORIAL) ? [TutorialExt] : []
      }
    },
    authentication: {
      loginRedirect: '/account-profile/profile',
      publicUrl: process.env.OIDC_PUBLIC_URL ?? 'https://localhost:3200',
      flow: process.env.OIDC_FLOW ?? 'password',
      carrier: process.env.OIDC_AUTH_CARRIER ?? 'token'
    },
    authenticationSapGigya: {
      url: process.env.GIGYA_URL
    },
    catalog: {
      useSlugs: featureFlag(process.env.FEATURE_USE_CATALOG_SLUGS),
      useSlugseparator: featureFlag(process.env.FEATURE_USE_CATALOG_SLUG_SEPARATOR),
      slugSeparator: '@@',
      pdp: {
        availability: process.env.FEATURE_AVAILABILITY_ON_PDP,
        template: 'standard',
        reviews: featureFlag(process.env.FEATURE_REVIEWS_ON_PDP)
      },
      plp: {
        availability: process.env.FEATURE_AVAILABILITY_ON_PROD_CARDS,
        reviews: featureFlag(process.env.FEATURE_REVIEWS_ON_PROD_CARDS)
      },
      search: {
        availability: process.env.FEATURE_AVAILABILITY_ON_PROD_CARDS,
        reviews: featureFlag(process.env.FEATURE_REVIEWS_ON_PROD_CARDS),
        extensions: {
          form: featureFlag(process.env.FEATURE_SPEECHLY) ? [SpeechlyExt] : []
        }
      },
      defaultCurrency: 'USD',
      defaultStoreId: undefined,
      baseSort: 'RELEVANCE',
      baseFacets: process.env.BASE_PRODUCT_TYPE ? [process.env.BASE_PRODUCT_TYPE] : [],
      filters: {
        includesPrice: true
      },
      speechly: {
        appID: process.env.SPEECHLY_APP_ID,
        appLang: process.env.SPEECHLY_APP_LANG
      },
      seoRewrites: [
        // Just a sample rule, doesn't make much sense in real use  
        {
          type: 'simple',
          seo: '/allProducts',
          exo: '/catalog/search/all'
        }    
      ]
    },
    ...(process.env.SAP_CAI_TOKEN
      ? {
          sapConversationalAssitant: {
            token: process.env.SAP_CAI_TOKEN,
            channelId: process.env.SAP_CAI_CHANNEL_ID,
            apiRoot: process.env.SAP_CAI_API_ROOT,
            scriptSrc: process.env.SAP_CAI_SCRIPT_SRC
          }
        }
      : {}),
    chrome: {
      meta: {
        title: 'EXO B2C',
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
          icons: [MiniCartExt],
          extraHeaders: [...(process.env.SAP_CAI_TOKEN ? [SAPCAExt] : [])]
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
    devToolbar: devToolbarConfig,
    events: {
      provider: 'custom-dom-events'
      /*      
      provider: 'mqtt',
      mqtt: {
        broker: 'wss://mqtt.eclipseprojects.io/mqtt',
        topic: 'exo_test'
      } 
      */
    }
  },
  client: () => client
} as ApplicationConfig;
