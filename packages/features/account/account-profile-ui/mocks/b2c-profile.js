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

export const fakeAddress = id => ({
  id: id.toString(),
  address1: faker.address.streetAddress(),
  address2: faker.address.secondaryAddress(),
  city: faker.address.city(),
  countryName: faker.address.country(),
  countryCode: 'US',
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
        orders: {
          edges: [
            {
              node: {
                id: '123',
                grandTotal: fakePrice(),
                placedDate: faker.date.between(new Date(2020, 5, 1), new Date(2020, 6, 1)),
                updateDate: faker.date.between(new Date(2020, 6, 1), new Date(2020, 7, 1)),
                status: 'IN_PROCESSING',
                statusCode: 'IN_PROCESSING',
                lineItems: [
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
            },

            {
              node: {
                id: '456',
                grandTotal: fakePrice(),
                placedDate: faker.date.between(new Date(2020, 5, 1), new Date(2020, 6, 1)),
                updateDate: faker.date.between(new Date(2020, 6, 1), new Date(2020, 7, 1)),
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
