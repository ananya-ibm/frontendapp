/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ContainerWrapper } from '@exo/frontend-common-storybook';
import { StoreFinder } from './StoreFinder';
import App from '../../App';

export default {
  title: 'Features/StoreFinder/pages/TestPage',
  component: StoreFinder
};

export const Default = args => (
  <ContainerWrapper app={App}>
    <StoreFinder {...args} />
  </ContainerWrapper>
);
Default.args = {};
