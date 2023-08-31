/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { FeaturedItem } from './FeaturedItem';

export default {
  title: 'Components/Content/FeaturedItem',
  component: FeaturedItem
};

const storyProps = {
  subtitle: 'Todays Offer',
  title: 'Featured Product Here',
  text:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum finibus tincidunt turpis id mattis. Sed laoreet tempor porttitor. Utut feugiat dui, non pretium eros. Praesent blandit euismod semper. Duis condimentum euismod risus, a euismod tortor ullamcorper sit amet.',
  image: 'https://picsum.photos/500/500'
};

export const normal = args => <FeaturedItem {...args} />;
normal.args = storyProps;
