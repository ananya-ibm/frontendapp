/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Templates } from './Templates';
import faker from 'faker';

type Props = React.ComponentProps<typeof Templates>;

export default {
  title: 'Features/Devops/Components/Templates',
  component: Templates
};

export const Default = (args: Props) => <Templates {...args} />;
Default.args = {
  data: Array.from({ length : 10}).map(() => ({
    name: faker.lorem.words(2),
    description: faker.lorem.sentence(),
    keywords: faker.lorem.words(3).split(' ').join(', ')
  }))
} as Props;
