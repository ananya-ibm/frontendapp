/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { SixThumbnailGrid } from './SixThumbnailGrid';

export default {
  title: 'Components/Extra/SixThumbnailGrid',
  component: SixThumbnailGrid
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
      title: 'Meter',
      image: 'https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4'
    },
    {
      title: 'Gear',
      image: 'https://images.unsplash.com/photo-1524600976353-e33983229a3e'
    },
    {
      title: 'Heading',
      image: 'https://images.unsplash.com/photo-1538392881296-16b46c54ba6f'
    }
  ]
};

export const normal = args => <SixThumbnailGrid {...args} />;
normal.args = storyProps;
