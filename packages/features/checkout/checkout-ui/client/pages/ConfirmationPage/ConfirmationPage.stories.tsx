/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ContainerWrapper } from '@exo/frontend-common-storybook';
import { SessionContextProvider } from '@exo/frontend-common-session-context';
import { CheckoutContextProvider } from '@exo/frontend-features-checkout-logic';
import App from '../../App';
import ConfirmationPage from './ConfirmationPage';
import b2cCartMocks from '../../../../../cart/cart-ui/mocks/b2c-cart';
import faker from 'faker';

export default {
  title: 'Features/Checkout/Pages/ConfirmationPage',
  component: ConfirmationPage,
  decorators: [
    Story => (
      <div style={{ margin: '-1em' }}>
        <Story />
      </div>
    )
  ]
};

type Props = React.ComponentProps<typeof ConfirmationPage>;

const fakeAddress = id => ({
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

export const Default = args => (
  <ContainerWrapper config={{}} app={App} mocks={b2cCartMocks.cart()}>
    <SessionContextProvider state={{ type: 'USER', token: 'abc', roles: [] }}>
      <CheckoutContextProvider
        initialState="summary"
        initialContext={{ initialized: true, loading: false, 
          cartSummary: b2cCartMocks.cart().Query.me().carts()[0],
          shippingAddress: fakeAddress(1),
          billingAddress: fakeAddress(2),
          cartId: 'P67238'
        }}
        config={{ separateDeliveryScreen: true }}
      >
        <ConfirmationPage {...args} />
      </CheckoutContextProvider>
    </SessionContextProvider>
  </ContainerWrapper>
);
Default.args = {
} as Props;