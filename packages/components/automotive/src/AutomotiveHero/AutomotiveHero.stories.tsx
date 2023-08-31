/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { AutomotiveHero } from './AutomotiveHero';

export default {
  title: 'Components/Automotive/AutomotiveHero',
  component: AutomotiveHero
};

const storyProps = {
  backgroundColor: '#033387',
  textColor: '#fff',
  description:
    'This is the car from Back to the Future,  which you really ought to watch if you haven’t already.',
  imgSrc: '/static/automotive/hero.png',
  title: 'DMC DELOREAN'
};

export const normal = args => <AutomotiveHero {...args} />;
normal.args = storyProps;
