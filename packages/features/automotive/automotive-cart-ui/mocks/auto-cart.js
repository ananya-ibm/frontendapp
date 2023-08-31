/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import faker from 'faker';

import img1 from '../../../../apps/automotive/client/static/content/homepage/products/batmobile.jpg';

const makePrice = (price) => ({ value: price ?? faker.commerce.price(), currency: 'EUR' });

const fakeProduct = (quantity, id, name, thumbnail, price) => ({
  id,
  quantity,
  linePrice: makePrice(price * quantity),
  unitPrice: makePrice(price),
  product: {
    id,
    type: 'sku',
    thumbnail,
    name,
    partnumber: id,
    description: faker.commerce.productDescription(),
    parentCategory: {
      id: 'Derivative'
    },
    price: {
      list: makePrice(price)
    },
    selection: [
      { id: 1, criteria: [
        { id: 3, criteriaId: 3, name: 'Colour', value: { id: 'a', value: 'Red' } }
      ]},
      { id: 2, criteria: [
        { id: 4, criteriaId: 4, name: 'Size', value: { id: 'b', value: 'XS' } }
      ]}
    ]
  }
})

export default {
  cart: () => ({
    Query: {
      me: () => ({
        id: 'username',
        carts: () => [
          {
            id: -1,
            guid: -1,
            grandTotal: makePrice(85.24),
            totalProductPrice: makePrice(67.95),
            totalShippingCharge: makePrice(4.95),
            totalAdjustment: makePrice(2.46),
            totalShippingTax: makePrice(1.12),
            totalSalesTax: makePrice(8.76),
            adjustments: [
              { title: 'Adjustment 1', amount: makePrice(0.34) },
              { title: 'Adjustment 2', amount: makePrice(2.12) }
            ],
            lineItems: [
              fakeProduct(3, 'IBMEMB001', 'Batmobile', img1, 14)
            ],
            availableShippingModes: [
              { type: 'PICKUP_IN_STORE', id: 1, identifier: 'cnc', description: 'Click and Collect' },
              { type: 'HOME_DELIVERY', id: 2, identifier: 'home_delivery', description: 'Home Delivery' },
              { type: 'ORGANIZATION_ORDER', id: 3, identifier: 'org_order', description: 'Organization Order' }
            ],
            availablePaymentMethods: [
              {
                id: 'account-payment',
                identifier: 'account-payment',
                description: 'Account',
                type: 'ACCOUNT_PAYMENT'
              },

              {
                id: 'VISA',
                identifier: 'VISA',
                description: 'VISA',
                type: 'TOKEN'
              }
            ] 
          }
        ]
      }),

      availability: () => [{
        partnumber: 'abc',
        availability: [
          { status: 'inStock',
            shipNode: {
              id: 'armonk',
              name: 'Armonk',
              distance: '4.7 miles'
            }
          },
          { status: 'Unavailable',
            shipNode: {
              id: 'yorktown_heights',
              name: 'Yorktown Heights',
              distance: '12.3 miles'
            }
          }
        ]
      }]
    }
  })
}
