/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { CategoryFilter } from './CategoryFilter';

export default {
  title: 'Components/Extra/CategoryFilter',
  component: CategoryFilter
};

export const normal = args => <CategoryFilter {...args} />;
normal.args = {
  heading: 'Primary category',
  primaryCategoryList: [
    {
      id: '1',
      name: 'Necklaces'
    },
    {
      id: '2',
      name: 'Pendants'
    },
    {
      id: '3',
      name: 'Bracelets'
    },
    {
      id: '4',
      name: 'Earings'
    },
    {
      id: '5',
      name: 'Rings'
    }
  ]
};
