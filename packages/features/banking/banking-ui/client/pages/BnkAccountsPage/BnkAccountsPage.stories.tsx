/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ContainerWrapper } from '@exo/frontend-common-storybook';
import { BnkAccountsPage } from './BnkAccountsPage';
import App from '../../App';

export default {
  title: 'Features/Banking/Pages/BnkAccountsPage',
  component: BnkAccountsPage
};

export const Default = args => (
  <ContainerWrapper app={App}>
    <BnkAccountsPage {...args} />
  </ContainerWrapper>
);
Default.args = {};
