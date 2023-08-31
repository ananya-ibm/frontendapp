/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Address } from '@exo/frontend-features-checkout-logic';
import { NotificationContextProvider } from '@exo/frontend-common-notification';
import { PersonalDetails } from './PersonalDetails';
import { fakeAddress } from '../../../mocks/b2c-profile';

export default {
  title: 'Features/Account/Profile/Components/PersonalDetails',
  component: PersonalDetails
};

type Props = React.ComponentProps<typeof PersonalDetails>;

export const Default = (args: Props) => (
  <NotificationContextProvider>
    <PersonalDetails {...args} />
  </NotificationContextProvider>
);
Default.args = {
  address: fakeAddress(1) as Address
} as Props;

// -----------------------------------------------------------

export const Skeleton = () => <PersonalDetails.Skeleton />;
