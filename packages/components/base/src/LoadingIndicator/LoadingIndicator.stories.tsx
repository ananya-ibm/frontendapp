/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { LoadingIndicator } from './LoadingIndicator';

export default {
  title: 'Components/Base/LoadingIndicator',
  component: LoadingIndicator
};

type Props = React.ComponentProps<typeof LoadingIndicator>;

export const Default = (args: Props) => <LoadingIndicator {...args} />;
Default.args = {} as Props;

export const Inline = (args: Props) => <LoadingIndicator {...args} />;
Inline.args = {
  type: 'inline'
} as Props;
