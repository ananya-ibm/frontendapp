/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { DealershipAvailabilityFinderContainer } from '@exo/frontend-features-automotive-dealership-finder-logic';
import { DealershipAvailabilityFinder } from '@exo/frontend-features-automotive-dealership-finder-ui';
import { ConfiguratorEntryBarContainer } from '@exo/frontend-features-automotive-configurator-logic';
import { ConfiguratorEntryBar } from '../../components/ConfiguratorEntryBar/ConfiguratorEntryBar';

export const ConfiguratorEntryBarExt = ({ productId }: Props) => {
  return (
    <ConfiguratorEntryBarContainer
      productId={productId}
      render={args => (
        <ConfiguratorEntryBar {...args}>
          <DealershipAvailabilityFinderContainer
            selectedTrimId={args.selectedTrimId}
            render={dealershipAvailabilityFinderArgs => (
              <DealershipAvailabilityFinder
                {...dealershipAvailabilityFinderArgs}
                isOpen={args.displayAvaliabilityModal}
                onClose={args.setDisplayAvaliabilityModal}
              />
            )}
          />
        </ConfiguratorEntryBar>
      )}
    />
  );
};

type Props = {
  productId: string;
};
