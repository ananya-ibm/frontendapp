/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { AccountHeroNavigation } from './AccountHeroNavigation';

export default { 
  title: 'Components/Content/AccountHeroNavigation',
  component: AccountHeroNavigation
};

type Props = React.ComponentProps<typeof AccountHeroNavigation>;

export const Default = (args) => <AccountHeroNavigation {...args} />;
Default.args = {
  exampleProp: 'AccountHeroNavigation'
} as Props;
