/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { StoreAvailabilityFinder } from './StoreAvailabilityFinder';

export default {
  title: 'Features/Store/Components/StoreAvailabilityFinder',
  component: StoreAvailabilityFinder
};

export const Default = args => <StoreAvailabilityFinder {...args} />;
Default.args = {
  isInitiallyOpen: true,
  selectedCountry: 'GB',
  countries: [{ code: 'GB', label: 'Great Britain' }],
  onChange: () => {},
  onSearch: () => {}
};

// --------------------------------------------------------
export const NotYetOpened = args => <StoreAvailabilityFinder {...args} />;
NotYetOpened.args = {
  countries: [{ code: 'GB', label: 'Great Britain' }],
  onChange: () => {},
  onSearch: () => {}
};

// --------------------------------------------------------
export const Loading = args => <StoreAvailabilityFinder {...args} />;
Loading.args = {
  ...Default.args,
  state: {
    loading: true
  }
};

// --------------------------------------------------------
export const WithError = args => <StoreAvailabilityFinder {...args} />;
WithError.args = {
  ...Default.args,
  state: {
    error: {
      message: 'Something went wrong'
    }
  }
};

// --------------------------------------------------------
export const WithResult = args => <StoreAvailabilityFinder {...args} />;
WithResult.args = {
  ...Default.args,
  availability: [
    {
      availability: [
        { shipNode: { id: '1', name: 'Birmingham' }, status: 'Available' },
        { shipNode: { id: '2', name: 'London' }, status: 'Unavailable' },
        {
          shipNode: { id: '3', name: 'Glasgow' },
          status: 'Future',
          availableDate: '2024-06-30T13:48'
        }
      ]
    }
  ]
};
