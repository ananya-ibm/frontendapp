/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Breadcrumb } from './Breadcrumb';

export default {
  title: 'Components/Base/Breadcrumb',
  component: Breadcrumb
};

type Props = React.ComponentProps<typeof Breadcrumb>;

// -------------------------------------------------------------------------------------------------------------

export const Default = (args: Props) => <Breadcrumb {...args} />;
Default.args = {
  path: [
    { url: 'test', label: 'test' },
    { url: 'test2', label: 'test2' },
    { url: 'test3', label: 'test3' }
  ]
} as Props;

export const Skeleton = () => <Breadcrumb.Skeleton />;
