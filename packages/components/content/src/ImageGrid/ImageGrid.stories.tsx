/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import faker from 'faker';
import React from 'react';
import { ImageGrid } from './ImageGrid';

export default {
  title: 'Components/Content/ImageGrid',
  component: ImageGrid
};

type Props = React.ComponentProps<typeof ImageGrid>;

export const Default = args => <ImageGrid {...args} />;
Default.args = {
  columnCount: 5,
  images: [
    {
      src: faker.image.animals(),
      title: faker.lorem.sentence(),
      columns: 3,
      url: '#'
    },
    {
      src: faker.image.abstract(),
      title: faker.lorem.sentence(),
      columns: 2,
      url: '#'
    },
    {
      src: faker.image.city(),
      title: faker.lorem.sentence(),
      columns: 1,
      url: '#'
    },
    {
      src: faker.image.cats(),
      title: faker.lorem.sentence(),
      columns: 1,
      url: '#'
    },
    {
      src: faker.image.business(),
      title: faker.lorem.sentence(),
      columns: 2,
      url: '#'
    }
  ]
} as Props;
