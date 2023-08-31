/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { FourCardDisplay } from './FourCardDisplay';

export default {
  title: 'Components/Extra/FourCardDisplay',
  component: FourCardDisplay
};

const storyProps = {
  cards: [
    {
      title: 'Front View',
      image: 'https://images.unsplash.com/photo-1530981279185-9f0960715267'
    },
    {
      title: 'Rear View',
      image: 'https://images.unsplash.com/photo-1530981254872-b77d0b6ca40c'
    },
    {
      title: 'Left View',
      image: 'https://images.unsplash.com/photo-1515853191710-4db39aa5fe54'
    },
    {
      title: 'Right View',
      image: 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4'
    }
  ]
};

export const normal = args => <FourCardDisplay {...args} />;
normal.args = storyProps;
