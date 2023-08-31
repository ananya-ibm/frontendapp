/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import faker from 'faker';
import { InvoicePDF } from './InvoicePDF';
import img1 from '../../../../../catalog/catalog-ui/mocks/b2c-images/IBMEMB001_EMB001_514.jpg';

export default {
  title: 'Features/Checkout/Components/InvoicePDF',
  component: InvoicePDF
};

type Props = React.ComponentProps<typeof InvoicePDF>;

export const Default = (args: Props) => <InvoicePDF {...args} />;
Default.args = {
  cart: {
    lineItems: [1, 2, 3].map(i => ({
      product: {
        id: '123',
        partnumber: 'abc',
        type: 'product',
        name: 'Emb(race) T-shirt',
        description: faker.commerce.productDescription(),
        thumbnail: img1
      },
      quantity: 3,
      id: i.toString(),
      partnumber: 'abc',
      unitPrice: {
        currency: 'EUR',
        value: 12.5
      },
      linePrice: {
        currency: 'EUR',
        value: 37.5
      }
    })),
    grandTotal: {
      value: 405.5,
      currency: 'EUR'
    },
    totalShippingCharge: {
      value: 27.5,
      currency: 'EUR'
    },
    totalShippingTax: {
      value: 3.2,
      currency: 'EUR'
    }
  },
  shippingAddress: {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    address1: 'Main Street 5'
  }
} as Props;
