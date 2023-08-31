/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { LayoutSpacing } from '@exo/frontend-components-core';
import { Button } from '@exo/frontend-components-base';

export const SellerDashboard = ({ store, onDelete }) => {
  return (
    <div>
      <h3>Seller Dashboard</h3>
      {store && (
        <>
          <LayoutSpacing size="sm" />
          <p>Store name: {store.name}</p>
          <LayoutSpacing size="sm" />
          <Button
            variant="link"
            onClick={() => onDelete(store.id)}
            label="Delete store"
            data-testid="marketplace-SellerDashboard-delete-button"
          />
        </>
      )}
    </div>
  );
};
