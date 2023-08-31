/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Stars } from './Stars';

export default {
  title: 'Components/Commerce/Stars',
  component: Stars
};

const storyProps = {
  reviews: 309,
  totalStars: 5,
  rating: 60
};

export const normal = args => <Stars {...args} />;
normal.args = storyProps;
