/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ProfileCompletion } from './ProfileCompletion';

export default {
  title: 'Components/Extra/ProfileCompletion',
  component: ProfileCompletion
};

const storyProps = {
  percent: 50,
  items: [
    {
      title: 'Personal details',
      isComplete: true
    },
    {
      title: 'Billing information',
      isComplete: true
    },
    {
      title: 'Security preferences',
      isComplete: false
    }
  ]
};

export const normal = args => <ProfileCompletion {...args} />;
normal.args = storyProps;
