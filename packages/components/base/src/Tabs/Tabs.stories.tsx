/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Tabs, Tab } from './Tabs';

export default {
  title: 'Components/Base/Tabs',
  component: Tabs
};

type Props = React.ComponentProps<typeof Tabs>;

// -------------------------------------------------------------------------------------------------------------

export const Default = () => (
  <Tabs>
    <Tab id="1" label="Tab One">
      <p> Lorem ipsum </p>
      <p> Dolor sit amet </p>
    </Tab>
    <Tab id="2" label="Tab Two">
      <p> Consectetuer </p>
    </Tab>
  </Tabs>
);
Default.args = {} as Props;

export const Skeleton = () => <Tabs.Skeleton />;
