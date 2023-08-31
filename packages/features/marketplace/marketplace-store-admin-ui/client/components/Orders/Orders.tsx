/* eslint-disable react/jsx-props-no-spreading */
/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useEffect, useState } from 'react';
import { OrdersTable } from '@exo/frontend-components-commerce';
import { ManageOrdersContainerRenderProps } from '@exo/frontend-features-marketplace-logic';
import { SingleOrderDetail } from './SingleOrderDetail/SingleOrderDetail';

export const Orders = ({ orders, getOrder }: ManageOrdersContainerRenderProps) => {
  const [displayOrderId, setDisplayOrderId] = useState<string>();
  const [order, setOrder] = useState<any>();

  const headerData = [
    {
      header: 'Order number',
      key: 'id'
    },
    {
      header: 'Date order placed',
      key: 'date_order_placed'
    },
    {
      header: 'Order status',
      key: 'order_status'
    },
    {
      header: 'Customer name',
      key: 'customer_name'
    },
    {
      header: 'Order value',
      key: 'order_value'
    }
  ];

  useEffect(() => {
    getOrder(displayOrderId!).then(o => {
      setOrder(o);
    });
  }, [displayOrderId]);

  return !displayOrderId || !order ? (
    <OrdersTable
      title="Orders"
      headerData={headerData}
      rowData={orders}
      setDisplayOrderId={setDisplayOrderId}
    />
  ) : (
    <SingleOrderDetail
      orderData={order}
      onBackClick={() => {
        setDisplayOrderId('1');
      }}
    />
  );
};
