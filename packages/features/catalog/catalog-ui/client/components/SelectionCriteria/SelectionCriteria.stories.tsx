/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { SelectionCriteria } from './SelectionCriteria';

export default {
  title: 'Features/Catalog/Components/SelectionCriteria',
  component: SelectionCriteria
};

type Props = React.ComponentProps<typeof SelectionCriteria>;

export const Default = (args: Props) => <SelectionCriteria {...args} />;
Default.args = {
  onChange: () => {},
  selection: {
    criteria: [
      {
        id: 'colour',
        name: 'Colour',
        values: [
          { value: 'Select Colour', available: true },
          { id: 'r', value: 'Red', available: false },
          { id: 'b', value: 'Blue', available: true }
        ]
      },
      {
        id: 'size',
        name: 'Size',
        values: [
          { value: 'Select Size', available: true },
          { id: 'xl', value: 'XL', available: true },
          { id: 'l', value: 'L', available: true }
        ]
      }
    ]
  },
  activeSelection: {}
} as Props;

// --------------------------------------------------------
export const WithSelection = (args: Props) => <SelectionCriteria {...args} />;
WithSelection.args = {
  ...Default.args,
  activeSelection: { colour: 'b', size: 'l' }
} as Props;

// --------------------------------------------------------
export const Skeleton = args => <SelectionCriteria.Skeleton {...args} />;
