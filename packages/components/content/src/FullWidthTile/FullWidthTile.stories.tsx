/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { FullWidthTile } from './FullWidthTile';

export default {
  title: 'Components/Content/FullWidthTile',
  component: FullWidthTile
};

export const Default = args => <FullWidthTile {...args} />
Default.args = {
  subTitle: 'Men',
  title: "Mens summer 22' is here",
  body: "New-season, dressed up looks that salute the sun - and everyday escapism.",
  ctaText: "Shop evening wear",
  ctaTextMobile: "Shop",
  ctaLink: '#',
  image: "https://picsum.photos/1200/1200"
};
