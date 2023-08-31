/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { BnkAccount } from './BnkAccount';

type Props = React.ComponentProps<typeof BnkAccount>;

export default {
  title: 'Features/Banking/BnkAccount',
  component: BnkAccount
};

export const Default = (args: Props) => <BnkAccount {...args} />;
Default.args = {
  data: {
    nickname: 'Current Account',
    accountType: 'Current Account',
    account: [{identification: '0834802748374'}],
    openingDate: '01-05-2002'
  }
} as Props;
