/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import faker from 'faker';

export default {
  stores: () => ({
    Query: {
      marketplaceUserStore: () => ({
        id: 123,
        name: 'Default store',
        announcement: faker.lorem.sentence(),
        addresses: [1, 2, 3].map(() => ({
          address1: faker.address.streetAddress(),
          address2: faker.address.secondaryAddress(),
          city: faker.address.city(),
          zip: faker.address.zipCode(),
          county: faker.address.state(),
          country: faker.address.country(),
          phone: faker.phone.phoneNumber()
        })),
        email: faker.internet.email(),
        vatNo: faker.finance.iban(),
        theme: '',
        logo: faker.image.image(),
        image: faker.image.image()
      }),

      marketplaceStore: () => ({
        id: 123,
        name: 'Default store',
        announcement: faker.lorem.sentence(),
        addresses: [1, 2, 3].map(() => ({
          address1: faker.address.streetAddress(),
          address2: faker.address.secondaryAddress(),
          city: faker.address.city(),
          zip: faker.address.zipCode(),
          county: faker.address.state(),
          country: faker.address.country(),
          phone: faker.phone.phoneNumber()
        })),
        email: faker.internet.email(),
        vatNo: faker.finance.iban(),
        theme: '',
        logo: faker.image.image(),
        image: faker.image.image()
      }),

      marketplaceStores: () => [
        {
          id: 123,
          name: 'Default store',
          announcement: faker.lorem.sentence(),
          addresses: [1, 2, 3].map(() => ({
            address1: faker.address.streetAddress(),
            address2: faker.address.secondaryAddress(),
            city: faker.address.city(),
            zip: faker.address.zipCode(),
            county: faker.address.state(),
            country: faker.address.country(),
            phone: faker.phone.phoneNumber()
          })),
          email: faker.internet.email(),
          vatNo: faker.finance.iban(),
          theme: '',
          logo: faker.image.image(),
          image: faker.image.image()
        }
      ]
    }
  })
};
