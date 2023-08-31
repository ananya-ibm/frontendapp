/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import faker from 'faker';

import img1 from '../../../catalog/catalog-ui/mocks/b2c-images/IBMEMB001_EMB001_514.jpg';
import img2 from '../../../catalog/catalog-ui/mocks/b2c-images/IBMLGBT004_Diversity Tee_368.jpg';
import img3 from '../../../catalog/catalog-ui/mocks/b2c-images/IBMRBS100_IBM_rebusshirt1_400.jpg';

const makePrice = price => ({ value: price ?? faker.commerce.price(), currency: 'EUR' });

const fakeProduct = (quantity, id, name, thumbnail, price) => ({
  id,
  partnumber: id,
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
    selection: [
      {
        id: 1,
        criteria: [{ id: 3, criteriaId: 3, name: 'Colour', value: { id: 'a', value: 'Red' } }]
      },
      { id: 2, criteria: [{ id: 4, criteriaId: 4, name: 'Size', value: { id: 'b', value: 'XS' } }] }
    ]
  }
});

export default {
  cart: () => ({
    Query: {
      countries: () => [
        { name: 'United Kingdom', isoCode: 'UK', phonePrefix: '+44', regions: undefined },
        {
          name: 'United States',
          isoCode: 'US',
          phonePrefix: '+1',
          regions: [
            { name: 'Alabama', code: 'AL' },
            { name: 'Alaska', code: 'AK' },
            { name: 'Arizona', code: 'AZ' },
            { name: 'Arkansas', code: 'AR' },
            { name: 'California', code: 'CA' },
            { name: 'Colorado', code: 'CO' },
            { name: 'Connecticut', code: 'CT' }
          ],
          languages: [{ name: 'English', isoCode: 'en' }],
          currencies: [{ name: 'US Dollars', isoCode: 'USD' }]
        },
        {
          name: 'Canada',
          phonePrefix: '+1',
          isoCode: 'CA',
          regions: [
            { code: 'AB', name: 'Alberta' },
            { code: 'BC', name: 'British Columbia' },
            { code: 'MB', name: 'Manitoba' },
            { code: 'NB', name: 'New Brunswick' },
            { code: 'NF', name: 'Newfoundland' }
          ],
          languages: [{ name: 'English', isoCode: 'en' }],
          currencies: [{ name: 'Canadian Dollars', isoCode: 'CAD' }]
        },
        {
          name: 'United Kingdom',
          isoCode: 'GB',
          languages: [{ name: 'English', isoCode: 'en' }],
          currencies: [
            { name: 'Pound Sterling', isoCode: 'GBP' },
            { name: 'Euro', isoCode: 'EUR' }
          ]
        }
      ],

      me: () => {
        return {
          id: 'username',
          carts: () => {
            return [
              {
                id: -1,
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
                  fakeProduct(3, 'IBMEMB001', 'Emb(race) T-shirt', img1, 14),
                  fakeProduct(1, 'IBMLGBT004', 'Diversity Tee', img2, 12),
                  fakeProduct(1, 'IBMRBS100', 'IBM Rebus T-shirt', img3, 13.95)
                ],
                availableShippingModes: [
                  {
                    type: 'PICKUP_IN_STORE',
                    id: 1,
                    identifier: 'cnc',
                    description: 'Click and Collect'
                  },
                  {
                    type: 'HOME_DELIVERY',
                    id: 2,
                    identifier: 'home_delivery',
                    description: 'Home Delivery'
                  },
                  {
                    type: 'ORGANIZATION_ORDER',
                    id: 3,
                    identifier: 'org_order',
                    description: 'Organization Order'
                  }
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
                  },

                  {
                    id: 'COD',
                    identifier: 'COD',
                    description: 'Cash on Delivery',
                    type: 'CASH_ON_DELIVERY'
                  }
                ]
              }
            ];
          }
        };
      }
    }
  })
};
