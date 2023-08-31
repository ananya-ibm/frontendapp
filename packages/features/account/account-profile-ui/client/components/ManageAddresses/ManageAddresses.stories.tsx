/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ManageAddresses } from './ManageAddresses';
import b2cProfileMock from '../../../mocks/b2c-profile';

export default {
  title: 'Features/Account/Profile/Components/ManageAddresses',
  component: ManageAddresses
};

type Props = React.ComponentProps<typeof ManageAddresses>;

const { addresses } = b2cProfileMock.me().Query.me();

export const Default = (args: Props) => <ManageAddresses {...args} />;
Default.args = {
  addresses,
  defaultAddressId: '2'
} as Props;

// -----------------------------------------------------------------

export const Skeleton = () => <ManageAddresses.Skeleton />;
