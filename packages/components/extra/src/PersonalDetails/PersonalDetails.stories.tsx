/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { PersonalDetails } from './PersonalDetails';

export default {
  title: 'Components/Extra/PersonalDetails',
  component: PersonalDetails
};

const storyProps = {
  name: 'Mr John Smith',
  initials: 'JS',
  details: [
    {
      title: 'Position',
      text: 'Lab manager'
    },
    {
      title: 'Organisation',
      text: 'University of Cambridge'
    },
    {
      title: 'Location',
      text: 'California'
    }
  ]
};

export const normal = args => <PersonalDetails {...args} />;
normal.args = storyProps;

export const withEditButton = args => <PersonalDetails {...args} onEditClick={() => {}} />;
withEditButton.args = storyProps;

export const small = args => <PersonalDetails {...args} />;
small.args = {
  ...storyProps,
  isSmall: true
};
