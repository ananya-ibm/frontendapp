/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ASpot } from './ASpot';

export default {
  title: 'Components/Content/ASpot',
  component: ASpot
};

const storyProps = {
  image: 'https://picsum.photos/1500/700',
  title: 'Heading Text',
  isFixed: true,
  subtitle: 'We got your back!',
  buttonLabel: 'Explore More',
  onClick: () => {}
};

export const normal = args => <ASpot {...args} />;
normal.args = storyProps;
