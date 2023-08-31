/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { TextSection } from './TextSection';

export default {
  title: 'Components/Content/TextSection',
  component: TextSection
};

export const Default = args => <TextSection {...args} />;
Default.args = {
  subTitle: "Summer 22’",
  title: "Every moment is an occasion",
  body: "New-season, dressed up looks that salute the sun - and everyday escapism. Formal or casual we have got you covered." ,
  buttons: [
    { label: "Shop men’s", link: '#' },
    { label: "Shop women’s", link: '#' }
  ]
};


