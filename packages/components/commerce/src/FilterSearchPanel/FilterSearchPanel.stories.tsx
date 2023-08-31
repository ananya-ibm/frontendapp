/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { FilterSearchPanel } from './FilterSearchPanel';

export default {
  title: 'Components/Commerce/FilterSearchPanel',
  component: FilterSearchPanel
};

export const normal = args => <FilterSearchPanel {...args} />;
normal.args = {
  exampleProp: 'FilterSearchPanel',
  searchFields: [
    {
      id: 'model',
      placeholder: 'Model',
      label: 'Model'
    },
    {
      id: 'doors',
      placeholder: 'Doors',
      label: 'Doors'
    },
    {
      id: 'year',
      placeholder: 'Year',
      label: 'Year'
    },
    {
      id: 'cons',
      placeholder: 'Constructor',
      label: 'Constructor'
    },
    {
      id: 'area',
      placeholder: 'Area',
      label: 'Area'
    },
    {
      id: 'transmission',
      placeholder: 'Transmission',
      label: 'Transmission'
    },
    {
      id: 'color-exterior',
      placeholder: 'Color Exterior',
      label: 'Color Exterior'
    },
    {
      id: 'interior',
      placeholder: 'Interior',
      label: 'Interior'
    }
  ],
  mainSearchField: {
    id: 'vin-number',
    placeholder: 'VIN Number',
    label: ''
  },
  onSubmit: v => console.log(v)
};
