/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { SmartComponentProps } from '@exo/frontend-common-utils';

export const ManageOrdersContainer = ({ render }: Props) => {
  return render({
    orders: [
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
    ],

    getOrder: () =>
      Promise.resolve({
        title: 'Order Details',
        subTitle: 'Order Number: ',
        orderNumber: '0003835',
        orderDate: 'September 15, 2018',
        billingAddress: 'John Smith, 640, Hamilton circle Malvern, PA 19355',
        shippingAddress: 'John Smith, 640, Hamilton circle Malvern, PA 19355',
        paymentMethod: 'visa********9257',
        orderStatus: 'Shipped on Tuesday, June 23 USPS Priority Mail',
        trackingId: '097654334566111222221111',
        orderTotalPrice: {
          value: '59.99',
          currency: 'USD',
          format: 'en-US'
        },
        subTotalPrice: {
          value: '59.99',
          currency: 'USD',
          format: 'en-US'
        },
        totalItems: 3,
        discountPrice: {
          prefix: '-',
          value: '10.99',
          currency: 'USD',
          format: 'en-US'
        },
        shippingCharge: {
          value: '5.50',
          currency: 'USD',
          format: 'en-US'
        },
        taxCharges: {
          value: '2.80',
          currency: 'USD',
          format: 'en-US'
        },
        totalDays: 2,
        grandTotal: {
          value: '57.30',
          currency: 'USD',
          format: 'en-US'
        },
        orders: [
          {
            id: '0002',
            quantity: 1,
            brandName: 'Titan',
            size: 'Large',
            color: 'Golden',
            item: {
              thumbnail: 'https://images.unsplash.com/photo-1476286768413-e7051cdb2179',
              name: 'Titan Raga'
            },
            linePrice: {
              value: '9.99',
              currency: 'USD',
              format: 'en-US'
            }
          },
          {
            id: '0003',
            quantity: 2,
            brandName: 'Rebook',
            size: '7',
            color: 'Black',
            item: {
              thumbnail: 'https://images.unsplash.com/photo-1596018589855-e9a2a91f687f',
              name: 'Athletic Shoes'
            },
            linePrice: {
              value: '24.54',
              currency: 'USD',
              format: 'en-US'
            }
          }
        ]
      })
  });
};

type Props = SmartComponentProps<{
  render: (props: ManageOrdersContainerRenderProps) => JSX.Element;
}>;

export type ManageOrdersContainerRenderProps = {
  getOrder: (id: string) => Promise<any>;
  orders: any;
};
