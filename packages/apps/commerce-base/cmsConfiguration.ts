/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { ApplicationConfig } from '@exo/frontend-common-app-shell';
import { loadable, cmsConfig as baseCmsConfig } from '@exo/frontend-apps-base';

export const cmsConfig: ApplicationConfig['featureConfig']['content'] = {
  ...baseCmsConfig,
  components: [
    ...(baseCmsConfig?.components ?? []),
    {
      name: 'categoryCarousel',
      component: loadable(() => import('@exo/frontend-features-catalog-ui/client'), {
        resolveComponent: loaded => loaded.CategoryCarousel
      }),
      aem: {
        minimumProps: ['catId'],
        name: 'components/commerce/catCarousel',
        emptyLabel: 'Uninitialized Category Carousel'
      }
    }
  ]
};
