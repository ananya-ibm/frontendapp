/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { BnkAccounts } from './BnkAccounts';

type Props = React.ComponentProps<typeof BnkAccounts>;

export default {
  title: 'Features/Banking/BnkAccounts',
  component: BnkAccounts
};

export const Default = (args: Props) => <BnkAccounts {...args} />;
Default.args = {
  // TODO: Add dummy data here
} as Props;
