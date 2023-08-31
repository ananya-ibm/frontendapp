/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { apolloClientFactory } from '@exo/frontend-common-apollo';
import { AdditionalConfig } from './types';

// Need to explicitly list all config entries as webpack wont
// include all process.env in the code otherwise
const CONFIGS = [
  process.env.SWAP_1,
  process.env.SWAP_2,
  process.env.SWAP_3,
  process.env.SWAP_4,
  process.env.SWAP_5,
  process.env.SWAP_6,
  process.env.SWAP_7,
  process.env.SWAP_8,
  process.env.SWAP_9
];

export const configs: AdditionalConfig[] = CONFIGS.filter(el => !!el).map(s => {
  const [name, endpoint] = s!.split(',');
  return {
    name,
    config: {
      client: () =>
        apolloClientFactory({
          batch: process.env.GRAPHQL_BATCH === 'true',
          endpoint
        })
    }
  };
});
