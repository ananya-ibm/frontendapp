/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme as render } from '@testUtils';
import { OrdersTable } from './OrdersTable';

const testProps = {
  title: 'Orders',
  headerData: [
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
  ],
  rowData: [
    {
      id: '111',
      date_order_placed: '20/05/2020',
      order_status: 'New',
      customer_name: 'Round robin',
      order_value: '550'
    },
    {
      id: '112',
      date_order_placed: '21/06/2020',
      order_status: 'Shipped',
      customer_name: 'Robin Hood',
      order_value: '250'
    },
    {
      id: '114',
      date_order_placed: '24/06/2020',
      order_status: 'New',
      customer_name: 'Robert',
      order_value: '320'
    },
    {
      id: '113',
      date_order_placed: '22/07/2020',
      order_status: 'Shipped',
      customer_name: 'Angelina',
      order_value: '170'
    },
    {
      id: '116',
      date_order_placed: '27/07/2020',
      order_status: 'Refunded',
      customer_name: 'Surekha',
      order_value: '400'
    },
    {
      id: '115',
      date_order_placed: '28/07/2020',
      order_status: 'New',
      customer_name: 'Lobita',
      order_value: '200'
    },
    {
      id: '118',
      date_order_placed: '29/07/2020',
      order_status: 'New',
      customer_name: 'Reshma',
      order_value: '270'
    },
    {
      id: '119',
      date_order_placed: '30/07/2020',
      order_status: 'New',
      customer_name: 'King John',
      order_value: '600'
    },
    {
      id: '120',
      date_order_placed: '1/08/2020',
      order_status: 'Refunded',
      customer_name: 'Albert',
      order_value: '100'
    }
  ]
};

describe('<OrdersTable /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<OrdersTable {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
});
