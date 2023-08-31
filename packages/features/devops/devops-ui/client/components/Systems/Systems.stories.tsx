/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Systems } from './Systems';

type Props = React.ComponentProps<typeof Systems>;

export default {
  title: 'Features/Devops/Components/Systems',
  component: Systems
};

export const Default = (args: Props) => <Systems {...args} />;
Default.args = {
  // TODO: Add dummy data here
} as Props;
