/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import faker from 'faker';

const organization = () => ({
  id: '123',
  name: 'My Organization',
  members: [1, 2, 3, 4].map(i => ({
    id: i,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    companyName: faker.company.companyName()
  }))
});

const userOrganization = () => ({
  id: '123',
  name: 'My Organization',
  members: [1, 2, 3, 4].map(i => ({
    id: i,
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName()
  })),
  addresses: [1, 2, 3, 4].map(i => ({ id: i }))
});

export default {
  organization: () => ({
    Query: {
      organization
    }
  }),

  all: () => ({
    Query: {
      organization,
      me: () => ({
        organization: userOrganization
      })
    }
  })
};
