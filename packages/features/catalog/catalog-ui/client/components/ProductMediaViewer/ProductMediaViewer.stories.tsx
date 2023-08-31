/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import faker from 'faker';
import { ProductMediaViewer } from './ProductMediaViewer';

export default {
  title: 'Features/Catalog/Components/ProductMediaViewer',
  component: ProductMediaViewer
};

type Props = React.ComponentProps<typeof ProductMediaViewer>;

export const Default = (args: Props) => <ProductMediaViewer {...args} />;
Default.args = {
  fullImage: faker.image.people(),
  additionalImages: [
    faker.image.animals(),
    faker.image.business(),
    faker.image.food(),
    faker.image.nightlife(),
    faker.image.sports(),
    faker.image.transport()
  ]
} as Props;

// --------------------------------------------------------
export const Skeleton = args => <ProductMediaViewer.Skeleton {...args} />;
Skeleton.args = {};
