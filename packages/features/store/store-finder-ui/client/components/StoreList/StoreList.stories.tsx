/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { StoreList } from './StoreList';

export default {
  title: 'Features/StoreFinder/Components/StoreList',
  component: StoreList
};

export const Default = args => <StoreList {...args} />;
Default.args = {
  isInitiallyOpen: true,
  selectedCountry: 'GB',
  countries: [{ code: 'GB', label: 'Great Britain' }],
  onChange: () => {},
  onSearch: () => {}
};

// --------------------------------------------------------
export const NotYetOpened = args => <StoreList {...args} />;
NotYetOpened.args = {
  countries: [{ code: 'GB', label: 'Great Britain' }],
  onChange: () => {},
  onSearch: () => {}
};

// --------------------------------------------------------
export const Loading = args => <StoreList {...args} />;
Loading.args = {
  ...Default.args,
  state: {
    loading: true
  }
};

// --------------------------------------------------------
export const WithError = args => <StoreList {...args} />;
WithError.args = {
  ...Default.args,
  state: {
    error: {
      message: 'Something went wrong'
    }
  }
};

// --------------------------------------------------------
export const WithResult = args => <StoreList {...args} />;
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
