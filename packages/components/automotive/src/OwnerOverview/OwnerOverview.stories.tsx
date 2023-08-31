/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { OwnerOverview } from './OwnerOverview';

export default {
  title: 'Components/Automotive/OwnerOverview',
  component: OwnerOverview
};

export const normal = args => <OwnerOverview {...args} />;
normal.args = {
  title: "Marty McFly's car",
  description:
    'DMCDeLorean is a classic sports car giving you unmatched speed and precise controls.The DeLorean coupe combines a thrilling mix of retro feel, gull-wing doors, and V6 PRV engine technology that gives you unmatched speed with precise controls.',
  distance: '36000 km',
  reviewDate: '12/05/2020',
  insuranceDate: '12/05/2020',
  year: '2020',
  weight: '56.00 lb'
};
