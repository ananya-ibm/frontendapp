/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { MemoryRouter } from 'react-router';
import { CategoryNavigation } from './CategoryNavigation';

export default {
  title: 'Features/Catalog/Components/CategoryNavigation',
  component: CategoryNavigation
};

type Props = React.ComponentProps<typeof CategoryNavigation>;

// -------------------------------------------------------------------------------------------------------------

export const Default = (args: Props) => (
  <MemoryRouter>
    <CategoryNavigation {...args} />
  </MemoryRouter>
);
Default.args = {
  categoryTree: {
    childCategories: [
      { id: 'a', name: 'Shirts' },
      {
        id: 'b',
        name: 'Trousers',
        childCategories: [
          { id: '1', name: 'Jeans' },
          { id: '2', name: 'Shorts' },
          { id: '3', name: 'Slacks' }
        ]
      },
      { id: 'c', name: 'Shoes' }
    ]
  },
  path: [{ id: 'root' }, { id: 'b' }, { id: '2' }],
  pathname: '/b/2',
  categoryUrlFactory: a => a.map(e => e.id).join('/')
} as Props;

// -------------------------------------------------------------------------------------------------------------

export const Skeleton = args => (
  <MemoryRouter>
    <CategoryNavigation.Skeleton {...args} />
  </MemoryRouter>
);
Skeleton.args = {};
