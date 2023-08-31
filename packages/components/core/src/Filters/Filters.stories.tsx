/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { MemoryRouter } from 'react-router';
import { Filters } from './Filters';

export default {
  title: 'Component/Core/Filters',
  component: Filters
};

type Props = React.ComponentProps<typeof Filters>;

// -------------------------------------------------------------------------------------------------------------

export const Default = (args: Props) => (
  <MemoryRouter>
    <Filters {...args} />
  </MemoryRouter>
);
Default.args = {
  facets: [
    {
      name: 'Colour',
      code: 'lorem',
      multiSelect: true,
      type: 'GENERAL',
      entries: [
        { code: 'Red', name: 'Red', label: 'Red', count: 10 },
        { code: 'Green', name: 'Green', label: 'Green', count: 7 },
        { code: 'Blue', name: 'Blue', label: 'Blue', count: 3 },
        { code: 'Yellow', name: 'Yellow', label: 'Yellow', count: 1 }
      ]
    },

    {
      name: 'Size',
      code: 'lorem',
      multiSelect: false,
      type: 'GENERAL',
      entries: [
        { code: 'XL', name: 'XL', label: 'XL', count: 11 },
        { code: 'L', name: 'L', label: 'L', count: 6 },
        { code: 'M', name: 'M', label: 'M', count: 2 },
        { code: 'S', name: 'S', label: 'S', count: 2 }
      ]
    }
  ],
  onRemoveFacet: () => {},
  onReplaceFacets: () => {},
  onToggleFacet: () => {}
} as Props;

// -------------------------------------------------------------------------------------------------------------

export const WithSelected = (args: Props) => (
  <MemoryRouter>
    <Filters {...args} />
  </MemoryRouter>
);
WithSelected.args = {
  facets: [
    Default.args.facets[0],
    {
      name: 'Size',
      code: 'lorem',
      multiSelect: false,
      entries: [{ code: 'XL', name: 'XL', label: 'XL', count: 11 }]
    }
  ],
  selectedFacets: [
    { code: 'XL', facet: { name: 'Size' }, label: 'XL' },
    { code: 'Shirts', facet: { name: 'Category' }, label: 'Shirts' }
  ]
} as Props;

// -------------------------------------------------------------------------------------------------------------

export const Skeleton = () => (
  <MemoryRouter>
    <Filters.Skeleton />
  </MemoryRouter>
);
Skeleton.args = {};
