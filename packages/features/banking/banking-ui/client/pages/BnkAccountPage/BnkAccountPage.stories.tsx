/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ContainerWrapper } from '@exo/frontend-common-storybook';
import BnkAccountPage from './BnkAccountPage';
import App from '../../App';

export default {
  title: 'Features/Banking/Pages/BnkAccountPage',
  component: BnkAccountPage
};

export const Default = args => (
  <ContainerWrapper app={App}>
    <BnkAccountPage {...args} />
  </ContainerWrapper>
);
Default.args = {};
