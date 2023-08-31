/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import faker from 'faker';
import { Deployments } from './Deployments';

type Props = React.ComponentProps<typeof Deployments>;

export default {
  title: 'Features/Devops/Components/Deployments',
  component: Deployments
};

export const Default = (args: Props) => <Deployments {...args} />;
Default.args = {
  data: Array.from({ length : 10 }).map(() => ({
    id: faker.datatype.number(10000).toString(),
    name: faker.lorem.words(2),
    deploymentStatus: 'Running',
    created_date: '2022-06-07',
    template: faker.lorem.words(2),
    frontend_url: faker.internet.url()
  }))
} as Props;
