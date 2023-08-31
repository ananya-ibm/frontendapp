/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { System } from './System';

type Props = React.ComponentProps<typeof System>;

export default {
  title: 'Features/Devops/Components/System',
  component: System
};

export const Default = (args: Props) => <System {...args} />;
Default.args = {
  data: {
    name: 'Digital Commerce',
    category: 'Digital',
    description: 'Provides B2C and B2B commerce capabilities, including product catalog, cart and checkout'
  }
} as Props;
