/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { MemoryRouter } from 'react-router';
import { AdvancedFilterSearch } from './AdvancedFilterSearch';

export default {
  title: 'Features/Catalog/Advanced Search/Components/AdvancedFilterSearch',
  component: AdvancedFilterSearch
};

// -------------------------------------------------------------------------------------------------------------

export const Default = args => (
  <MemoryRouter>
    <AdvancedFilterSearch {...args} />
  </MemoryRouter>
);
Default.args = {};
