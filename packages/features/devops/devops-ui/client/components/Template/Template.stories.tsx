/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Template } from './Template';

type Props = React.ComponentProps<typeof Template>;

export default {
  title: 'Features/Devops/Components/Template',
  component: Template
};

export const Default = (args: Props) => <Template {...args} />;
Default.args = {
  data: {
    id: '123456',
    name: 'Some name',
    description: 'Some description. Lorem ipsum dolor sit amet.',
    frontend: 'Frontend',
    adapter: 'Adapter',
    keywords: 'Lorem, Ipsum, Dolor'
  }
} as Props;
