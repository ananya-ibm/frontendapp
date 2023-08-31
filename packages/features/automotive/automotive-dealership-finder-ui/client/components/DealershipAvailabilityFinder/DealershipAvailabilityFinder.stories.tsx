/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { DealershipAvailabilityFinder } from './DealershipAvailabilityFinder';

export default {
  title: 'Features/Automotive/Dealership Finder/Components/DealershipAvailabilityFinder',
  component: DealershipAvailabilityFinder
};

export const Default = args => <DealershipAvailabilityFinder {...args} />;
Default.args = {
  isOpen: true,
  selectedCountry: 'gb',
  availability: [
    {
      partnumber: 'abc',
      availability: [
        {
          status: 'inStock',
          shipNode: {
            id: 'armonk',
            name: 'Armonk',
            distance: '4.7 miles'
          }
        },
        {
          status: 'Unavailable',
          shipNode: {
            id: 'yorktown_heights',
            name: 'Yorktown Heights',
            distance: '12.3 miles'
          }
        }
      ]
    }
  ]
};
