/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { CategoryCard } from './CategoryCard';

export default {
  title: 'Components/Extra/CategoryCard',
  component: CategoryCard
};

const storyProps1 = {
  title: 'Model Name',
  price: {
    currency: 'GBP',
    value: '20000',
    prefix: ''
  },
  text:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam',
  img: {
    src: '/static/automotive/products/thumbnails/X34Landspeeder.png',
    alt: 'X34Landspeeder'
  },
  primaryBtnText: 'Discover the model',
  secondaryBtnText: 'Download brochure',
  onPrimaryBtnClick: () => {},
  onSecondaryBtnClick: () => {},
  isImageRight: false,
  productName: '#'
};

const storyProps2 = {
  title: 'Lorem ipsum dolor sit amet',
  text:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,',
  img: {
    src: '/static/automotive/products/thumbnails/X34Landspeeder.png',
    alt: 'X34Landspeeder'
  },
  primaryBtnText: 'See our offers',
  secondaryBtnText: 'Enquire now',
  onPrimaryBtnClick: () => {},
  onSecondaryBtnClick: () => {},
  isImageRight: true,
  productName: '#'
};

export const imageLeft = args => <CategoryCard {...args} />;
imageLeft.args = storyProps1;

export const imageRight = args => <CategoryCard {...args} />;
imageRight.args = storyProps2;
