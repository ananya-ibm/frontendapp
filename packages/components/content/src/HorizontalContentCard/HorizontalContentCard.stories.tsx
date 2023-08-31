/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { HorizontalContentCard } from './HorizontalContentCard';

export default {
  title: 'Components/Content/HorizontalContentCard',
  component: HorizontalContentCard
};

const storyProps = {
  title: 'New Offer',
  subtitle: 'Check out the latest offer',
  text: 'Isn\'t it a great offer. I bet you\'ve never seen one like it.',
  img:
    'https://images.unsplash.com/photo-1476286768413-e7051cdb2179?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  linkText: 'Learn More',
  link: '#'
};

export const normal = args => <HorizontalContentCard {...args} />;
normal.args = storyProps;

const withShadowProps = {
  title: 'New Offer',
  subtitle: 'Check out the latest offer',
  text: 'Isn\'t it a great offer. I bet you\'ve never seen one like it.',
  img:
    'https://images.unsplash.com/photo-1476286768413-e7051cdb2179?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  linkText: 'Learn More',
  link: '#',
  hasAlwaysShadow: true
};

export const hasAlwaysShadow = args => <HorizontalContentCard {...args} />;
hasAlwaysShadow.args = withShadowProps;

const withNoShadowProps = {
  title: 'New Offer',
  subtitle: 'Check out the latest offer',
  text: 'Isn\'t it a great offer. I bet you\'ve never seen one like it.',
  img:
    'https://images.unsplash.com/photo-1476286768413-e7051cdb2179?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  linkText: 'Learn More',
  link: '#',
  hasNoShadow: true
};

export const hasNoShadow = args => <HorizontalContentCard {...args} />;
hasNoShadow.args = withNoShadowProps;

const withRightImageProps = {
  title: 'New Offer',
  subtitle: 'Check out the latest offer',
  text: 'Isn\'t it a great offer. I bet you\'ve never seen one like it.',
  img:
    'https://images.unsplash.com/photo-1476286768413-e7051cdb2179?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  linkText: 'Learn More',
  link: '#',
  isImageRight: true
};

export const WithImageOnTheRight = args => <HorizontalContentCard {...args} />;
WithImageOnTheRight.args = withRightImageProps;

const basicStoryProps = {
  title: 'New Offer',
  text: 'Isn\'t it a great offer. I bet you\'ve never seen one like it.',
  img:
    'https://images.unsplash.com/photo-1476286768413-e7051cdb2179?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
};

export const basic = args => <HorizontalContentCard {...args} />;
basic.args = basicStoryProps;
