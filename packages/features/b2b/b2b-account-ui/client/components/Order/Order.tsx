/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { LayoutSpacing } from '@exo/frontend-components-core';
import { Button, ButtonGroup } from '@exo/frontend-components-base';
import { OrderApprovalContainerRenderProps } from '@exo/frontend-features-b2b-account-logic';

export const Order = ({ order, onUpdateOrder }: OrderApprovalContainerRenderProps) => {
  // TODO: Ideally we should use a context provided by the App, rather than use useParams
  const orderId = order!.id;

  return (
    <div>
      <h2>Order details</h2>
      <p>Order id: {orderId}</p>
      <p>Date:{order!.date} </p>
      <p>Order placed by {order!.user}</p>
      <LayoutSpacing size="sm" />

      <h3>Status</h3>
      <div>{order!.status}</div>
      <LayoutSpacing size="sm" />

      <h3>Actions</h3>
      <LayoutSpacing size="sm" />

      <ButtonGroup isLeft>
        <Button
          label="Approve order"
          onClick={() => onUpdateOrder({ id: orderId, status: 'approved' })}
        />
        <Button
          variant="secondary"
          label="Reject order"
          onClick={() => onUpdateOrder({ id: orderId, status: 'rejected' })}
        />
      </ButtonGroup>
    </div>
  );
};
