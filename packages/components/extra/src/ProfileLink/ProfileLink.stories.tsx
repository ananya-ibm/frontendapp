/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ProfileLink } from './ProfileLink';

export default {
  title: 'Components/Extra/ProfileLink',
  component: ProfileLink
};

const storyProps = {
  exampleProp: 'ProfileLink'
};

export const normal = (args) => <ProfileLink {...args} />;
normal.args = storyProps;
