/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { HeroCarousel } from './HeroCarousel';

export default {
  title: 'Features/Automotive/HomePage/Components/HeroCarousel',
  component: HeroCarousel
};

export const Default = args => <HeroCarousel {...args} />;
Default.args = {};
