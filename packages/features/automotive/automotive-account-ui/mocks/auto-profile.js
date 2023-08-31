/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import faker from 'faker';

import img1 from '../../../../apps/automotive/client/static/images/products/thumbnails/DMCDeLoreanDeluxe.png';
import img2 from '../../../../apps/automotive/client/static/images/products/thumbnails/MillerMeteorFuturaDuplex.png';

export const fakeAddress = id => ({
  id: id.toString(),
  address1: faker.address.streetAddress(),
  address2: faker.address.secondaryAddress(),
  city: faker.address.city(),
  country: faker.address.country(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  name: `Address ${id}`,
  phone: faker.phone.phoneNumber(),
  province: faker.address.state(),
  zip: faker.address.zipCode(),
  email: faker.internet.email(),
  titleCode: 'mr',
  company: faker.company.companyName(),
  availableForShipping: true,
  availableForBilling: true
});

const fakePrice = () => ({ value: faker.commerce.price(), currency: 'EUR' });

export default {
  me: extraAttrs => ({
    Query: {
      me: () => ({
        ...(extraAttrs ?? {}),
        id: 'mrUser',
        username: 'mrUser',
        addresses: [1, 2, 3].map(fakeAddress),
        defaultAddress: fakeAddress(1),
        subscriptions: [
          {
            id: 'Charging Plan',
            status: 'ACTIVE',
            startDate: '1598532070104',
            subscribedProducts: [
              {
                id: 'Charging Plan',
                status: 'ACTIVE',
                startDate: '1598532070104',
                endDate: '1598532070105',
                product: {
                  id: '1234',
                  partnumber: '1234',
                  name: faker.lorem.sentence(),
                  price: {
                    list: {
                      value: '11873',
                      currency: 'USD'
                    }
                  }
                }
              }
            ]
          }
        ],
        configurations: [
          {
            id: 'c123',
            baseProduct: {
              id: '123',
              description: faker.lorem.sentence(),
              loneDescription: faker.lorem.sentences(3),
              thumbnail: img1,
              price: {
                list: {
                  value: '11873',
                  currency: 'USD'
                }
              }
            },
            optionCategories: [
              {
                optionClassifications: [
                  {
                    options: [
                      {
                        selected: true,
                        product: {
                          id: '876',
                          price: {
                            list: {
                              value: 78
                            }
                          }
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            id: 'c143',
            baseProduct: {
              id: '193',
              description: faker.lorem.sentence(),
              loneDescription: faker.lorem.sentences(3),
              thumbnail: img2,
              price: {
                list: {
                  value: '21173',
                  currency: 'USD'
                }
              }
            },
            optionCategories: []
          }
        ],
        orders: {
          edges: [
            {
              node: {
                id: '123',
                grandTotal: fakePrice(),
                placedDate: new Date(2020, 5, 1),
                updateDate: new Date(2020, 6, 1),
                status: 'IN_PROCESSING',
                statusCode: 'IN_PROCESSING',
                lineItems: [
                  {
                    id: '4123124',
                    linePrice: fakePrice(),
                    partnumber: 'IBMEMB001',
                    quantity: 2,
                    item: {
                      name: 'Delorian Deluxe',
                      thumbnail: img1
                    }
                  }
                ]
              }
            },

            {
              node: {
                id: '456',
                grandTotal: fakePrice(),
                placedDate: new Date(2020, 5, 1),
                updateDate: new Date(2020, 6, 1),
                status: 'DELIVERED',
                statusCode: 'DELIVERED',
                lineItems: [
                  {
                    id: '4123125',
                    linePrice: fakePrice(),
                    partnumber: 'IBMLGBT004',
                    quantity: 7,
                    item: {
                      name: 'Diversity T-Shirt',
                      thumbnail: img2
                    }
                  },

                  {
                    id: '4123124',
                    linePrice: fakePrice(),
                    partnumber: 'IBMEMB001',
                    quantity: 2,
                    item: {
                      name: 'Emb(race) T-shirt',
                      thumbnail: img1
                    }
                  }
                ]
              }
            }
          ]
        }
      })
    }
  })
};
