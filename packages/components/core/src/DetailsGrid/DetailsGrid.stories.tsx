/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { DetailsGrid } from './DetailsGrid';

export default {
  title: 'Components/Core/DetailsGrid',
  component: DetailsGrid
};

export const normal = args => <DetailsGrid {...args} />;
normal.args = {
  details: [
    { title: 'test', value: 'test' },
    { title: 'test2', value: 'test' },
    { title: 'test3', value: 'test' },
    { title: 'test4', value: 'test' },
    { title: 'test5', value: 'test' }
  ]
};
