/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { SmartComponentWrapper } from '@exo/frontend-common-storybook';
import { Footer } from './Footer';

export default {
  title: 'Features/Chrome/Smart Components/Footer',
  component: Footer
};

export const Default = args => (
  <SmartComponentWrapper>
    <Footer {...args} />
  </SmartComponentWrapper>
);
Default.args = {};
