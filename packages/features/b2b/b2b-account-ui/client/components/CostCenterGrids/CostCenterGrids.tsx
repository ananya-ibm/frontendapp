/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { LayoutSpacing } from '@exo/frontend-components-core';
import { Button, Card, CardSection, CardTitle } from '@exo/frontend-components-base';

const tempCostCenters = [
  {
    id: '0001',
    name: 'Rustic 0K USD Order',
    details: ['Lynda Wolffe', 'Globex Corp', 'Springfield']
  },
  { id: '0002', name: 'Rustic 0K GBP Order' },
  { id: '0003', name: 'Rustic 2K GBP Order' },
  { id: '0004', name: 'Rustic 4K HKD Order' },
  { id: '0005', name: 'Rustic 8K USD Order' },
  { id: '0006', name: 'Rustic 16K USD Order' },
  { id: '0007', name: 'Rustic 32K USD Order' }
];

export const CostCenterGrids = () => {
  const handleAddCostCenter = () => {
    // eslint-disable-next-line no-console
    console.log('adding a cost center');
  };
  const handleEditCostCenter = id => {
    // eslint-disable-next-line no-console
    console.log('editing: ', id);
  };

  return (
    <div>
      {tempCostCenters.map(cc => (
        <div key={cc.id}>
          <Card>
            <CardTitle
              primaryAction={{
                label: 'Edit',
                onClick: () => handleEditCostCenter(cc.id)
              }}
            >
              {cc.name}
            </CardTitle>
            <CardSection>
              {cc.details?.map(d => (
                <div key={d}>{d}</div>
              ))}
            </CardSection>
          </Card>
          <LayoutSpacing size="sm" />
        </div>
      ))}
      <LayoutSpacing size="sm" />
      <div style={{ float: 'right' }}>
        <Button
          variant="secondary"
          label="Add New"
          size="field"
          onClick={() => handleAddCostCenter()}
        />
      </div>
    </div>
  );
};
