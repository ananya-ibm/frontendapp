/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ContentCard } from './ContentCard';

export default {
  title: 'Components/Content/ContentCard',
  component: ContentCard
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

export const normal = args => (
  <div style={{ width: '400px' }}>
    <ContentCard {...args} />
  </div>
);
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

export const alwaysHasShadow = args => (
  <div style={{ width: '400px' }}>
    <ContentCard {...args} />
  </div>
);
alwaysHasShadow.args = withShadowProps;

const withoutShadowProps = {
  title: 'New Offer',
  subtitle: 'Check out the latest offer',
  text: 'Isn\'t it a great offer. I bet you\'ve never seen one like it.',
  img:
    'https://images.unsplash.com/photo-1476286768413-e7051cdb2179?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
  linkText: 'Learn More',
  link: '#',
  hasNoShadow: true
};

export const hasNoShadow = args => (
  <div style={{ width: '400px' }}>
    <ContentCard {...args} />
  </div>
);
hasNoShadow.args = withoutShadowProps;

const withoutImageStoryProps = {
  title: 'New Offer',
  subtitle: 'Check out the latest offer',
  text: 'Isn\'t it a great offer. I bet you\'ve never seen one like it.',
  linkText: 'Learn More',
  link: '#'
};

export const withoutImage = args => (
  <div style={{ width: '400px' }}>
    <ContentCard {...args} />
  </div>
);
withoutImage.args = withoutImageStoryProps;

const basicStoryProps = {
  title: 'New Offer',
  text: 'Isn\'t it a great offer. I bet you\'ve never seen one like it.',
  img:
    'https://images.unsplash.com/photo-1476286768413-e7051cdb2179?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
};

export const basic = args => (
  <div style={{ width: '400px' }}>
    <ContentCard {...args} />
  </div>
);
basic.args = basicStoryProps;
