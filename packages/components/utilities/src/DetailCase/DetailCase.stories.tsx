/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { DetailCase } from './DetailCase';

type Props = React.ComponentProps<typeof DetailCase>;

export default {
  title: 'Components/Utilities/DetailCase',
  component: DetailCase
};

export const Default = (args: Props) => <DetailCase {...args} />;
Default.args = {
  subTitle: 'Benefits',
  title: "Lorem ipsum",
  body1: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  ctaTextMobile: "Shop",
  ctaLink: '#',
  image: "https://picsum.photos/1200/1200"
} as Props;
