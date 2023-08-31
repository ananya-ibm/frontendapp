/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { EmptyFinance } from './EmptyFinance';

export default {
  title: 'Components/Automotive/EmptyFinance',
  component: EmptyFinance
};

const storyProps = {
  chooseFinanceText: 'Choose Your Finance',
  onClickChooseFinance: () => {},
  text: 'You have no finance option selected at the moment'
};

export const normal = args => <EmptyFinance {...args} />;
normal.args = storyProps;
