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
  logging: loadable(() => import('@exo/frontend-features-work-management-logging-ui/client/App'))
};

export default {
  bundles: [
    {
      id: 'ROOT',
      url: 'http://localhost:3000',
      modules: {
        '/stats/user-logins': modules.logging
      }
    }
  ],
  redirects: {
    '/': '/stats/user-logins'
  },
  appWrapper: AppWrapper,
  featureConfig: {
    chrome: {
      meta: {
        title: 'EXO Work Management',
        icon: 'data:;base64,iVBORw0KGgo='
      },
      header: {
        extensions: {
          icons: [],
          extraHeaders: []
        },
        fixedLinks: [
          { href: '#1', label: 'Link 1' }, 
          { href: '#2', label: 'Link 2' }, 
          { href: '#3', label: 'Link 3' }        
        ]
      },
      footer: {
        copyright: `Copyright © ${new Date().getFullYear()} IBM All rights reserved.`
      }
    }
  },
  client: () => client
} as ApplicationConfig;
