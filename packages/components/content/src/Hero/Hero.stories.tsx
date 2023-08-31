/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Hero } from './Hero';

export default {
  title: 'Components/Content/Hero',
  component: Hero
};

const storyProps = {
  link: '/department/test',
  image: 'https://picsum.photos/1500/700',
  title: 'Heading Text',
  subtitle: 'Subtitle Text',
  text:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  ctaText: 'View Shop'
};

export const FullWidth = args => <Hero {...args} />;
FullWidth.args = storyProps;


export const Image50 = args => <Hero {...args} />;
Image50.args = {
  link: '/department/test',
  image: 'https://picsum.photos/1500/700',
  title: 'Heading Text',
  subtitle: 'Subtitle Text',
  text:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  ctaText: 'View Shop',
  color: '#161616',
  variant: 'image-50%'
}

