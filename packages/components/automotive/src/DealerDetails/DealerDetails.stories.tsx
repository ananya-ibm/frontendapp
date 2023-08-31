/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { DealerDetails } from './DealerDetails';

export default {
  title: 'Components/Automotive/DealerDetails',
  component: DealerDetails
};

const storyProps = {
  title: 'Your dealer',
  name: 'John Smith',
  surname: 'Car expert salesman',
  phoneNumber: '1234 4532',
  emailAddress: 'johnsmith@mail.com',
  img: 'https://images.unsplash.com/photo-1476286768413-e7051cdb2179'
};

export const normal = args => <DealerDetails {...args} />;
normal.args = storyProps;
