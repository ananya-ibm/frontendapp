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
  devops: loadable(() => import('@exo/frontend-features-devops-ui/client/App'))
};

export default {
  bundles: [
    {
      id: 'ROOT',
      url: 'http://localhost:3200',
      modules: {
        '/devops': modules.devops
      }
    }
  ],
  redirects: {
    '/': '/devops/dashboard'
  },
  appWrapper: AppWrapper,
  featureConfig: {
    chrome: {
      meta: {
        title: 'EXO Cloud - DevOps',
        icon: 'data:;base64,iVBORw0KGgo='
      },
      header: {
        extensions: {
          icons: [],
          extraHeaders: []
        },
        fixedLinks: [
          { href: '/devops/dashboard', label: 'Dashboard' },
          { href: '/devops/catalog', label: 'App Catalog' },
          { href: '/devops/deployments', label: 'App Deployments' },
          { href: '/devops/apis', label: 'API Marketplace' },
          { href: '/devops/reference-architecture', label: 'Reference Architecture' },
          { href: '/devops/storybook', label: 'Frontend Storybook' },
          { href: '/devops/docs', label: 'Docs' }
        ]
      },
      footer: {
        copyright: `Copyright © ${new Date().getFullYear()} IBM All rights reserved.`
      }
    }
  },
  client: () => client
} as ApplicationConfig;
