/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { apolloClientFactory } from '@exo/frontend-common-apollo';
import { ApplicationConfig } from '@exo/frontend-common-app-shell';
import { loadable } from '@exo/frontend-apps-base';
import { AppWrapper } from './client/AppWrapper';

/* @ts-ignore */
const featureFlag = s => s?.toUpperCase() === 'TRUE';

const client = apolloClientFactory({
  batch: process.env.GRAPHQL_BATCH === 'true',
  endpoint: process.env.GRAPHQL_ENDPOINT!
});

const modules = {
  studio: loadable(() => import('@exo/frontend-features-studio-ui/client/App'))
};

export default {
  bundles: [
    {
      id: 'ROOT',
      url: 'http://localhost:3000',
      modules: {
        '/studio': modules.studio
      }
    }
  ],
  redirects: {
    '/': '/studio/homepage'
  },
  appWrapper: AppWrapper,
  featureConfig: {
    chrome: {
      meta: {
        title: 'EXO Sample',
        icon: 'data:;base64,iVBORw0KGgo='
      },
      header: {
        extensions: {
          icons: [],
          extraHeaders: []
        },
        fixedLinks: [
          { href: '/studio/homepage', label: 'Home' }, 
          { href: '/studio/data', label: 'Data Management' }, 
          { href: '/studio/events', label: 'Event Management' }, 
          { href: '/studio/settings', label: 'Settings' }
        ]
      },
      footer: {
        copyright: `Copyright © ${new Date().getFullYear()} IBM All rights reserved.`
      }
    }
  },
  client: () => client
} as ApplicationConfig;
