/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Tile } from './Tile';

export default {
  title: 'Components/Automotive/Tile',
  components: Tile
};

const storyProps = {
  description: 'Porem ipsum dolor sit amet consectetur adipiscing elit',
  id: 'yellowcar',
  price: {
    currency: 'GBP',
    value: 10
  },
  title: 'Yellow',
  image: '/static/automotive/thumbnails/yellow.png',
  isSmall: false
};

const storyPropsSmall = {
  description: 'Porem ipsum dolor sit amet consectetur adipiscing elit',
  id: 'yellowcar',
  price: {
    currency: 'GBP',
    value: 10
  },
  title: 'Yellow',
  image: '/static/automotive/thumbnails/yellow.png',
  isSmall: true
};

const storyPropsConfigurator = {
  id: 'yellowcar',
  price: {
    prefix: '+',
    currency: 'GBP',
    value: 500
  },
  title: 'Yellow',
  image: '/static/automotive/thumbnails/yellow.png',
  isSmall: true
};

const storyPropsActive = {
  id: 'yellowcar',
  price: {
    prefix: '+',
    currency: 'GBP',
    value: 500
  },
  title: 'Yellow',
  image: '/static/automotive/thumbnails/yellow.png',
  isSmall: true,
  isActive: true
};

export const normal = args => <Tile {...args} />;
normal.args = storyProps;

export const small = args => <Tile {...args} />;
small.args = storyPropsSmall;

export const active = args => <Tile {...args} />;
active.args = storyPropsActive;

export const configurator = args => <Tile {...args} />;
configurator.args = storyPropsConfigurator;
