/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { DetailsGrid, LayoutSpacing } from '@exo/frontend-components-core';

const temporaryHeaderDetails = [
  { title: 'Permission ID', value: 'Rustic 0K USD Order' },
  { title: 'Parent Unit', value: 'Rustic' },
  { title: 'Permission Type', value: 'Allowed Order Threshold (per order)' },
  { title: 'Time Period', value: 'n/a' },
  { title: 'Threshold Amount', value: '0.00 (USD)' }
];

export const CostCenterHeader = () => {
  return (
    <>
      <DetailsGrid details={temporaryHeaderDetails} />
      <LayoutSpacing size="sm" />
    </>
  );
};
