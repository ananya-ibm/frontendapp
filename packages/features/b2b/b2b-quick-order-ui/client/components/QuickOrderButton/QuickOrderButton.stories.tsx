/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { QuickOrderButton } from './QuickOrderButton';

export default {
  title: 'Features/B2B/QuickOrder/Components/QuickOrderButton',
  component: QuickOrderButton
};

export const Default = args => <QuickOrderButton {...args} />;
Default.args = {
  onClick: () => {}
};
