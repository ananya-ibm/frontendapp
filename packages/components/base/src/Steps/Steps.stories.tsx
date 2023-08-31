/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Steps, Step } from './Steps';

export default {
  title: 'Components/Base/Steps',
  component: Steps
};

type Props = React.ComponentProps<typeof Steps>;

// -------------------------------------------------------------------------------------------------------------

export const Default = args => (
  <Steps {...args}>
    <Step title="Step 1" description="Lorem ipsum dolor sit amet" />
    <Step title="Step 2" description="Consectetuer adispcing" />
    <Step title="Step 3" description="Nullam eleifend mi sodales tortor tristique consectetur. " />
  </Steps>
);
Default.args = {
  current: 2
} as Props;

export const Skeleton = () => <Steps.Skeleton />;
