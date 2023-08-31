/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { StudioHomepage } from './StudioHomepage';

type Props = React.ComponentProps<typeof StudioHomepage>;

export default {
  title: 'Features/Studio/Pages/StudioHomepage',
  component: StudioHomepage
};

export const Default = (args: Props) => <StudioHomepage {...args} />;
Default.args = {
  // TODO: Add dummy data here
} as Props;
