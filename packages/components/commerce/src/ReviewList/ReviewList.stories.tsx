/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import faker from 'faker';
import React from 'react';
import { ReviewList } from './ReviewList';

export default {
  title: 'Components/Commerce/ReviewList',
  component: ReviewList
};

type Props = React.ComponentProps<typeof ReviewList>;

export const Default = args => <ReviewList {...args} />;
Default.args = {
  reviews: [1, 2, 3, 4, 5].map(_ => ({
    name: `${faker.name.firstName()} ${faker.name.lastName()}`,
    stars: 1 + (faker.datatype.number() % 4),
    review: faker.lorem.paragraph(),
    avatar: faker.image.avatar()
  }))
} as Props;
