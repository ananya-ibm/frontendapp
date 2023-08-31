/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Add } from '@carbon/react/icons';
import { ActionMenu, ActionMenuItem } from './ActionMenu';

type Props = React.ComponentProps<typeof ActionMenu>;

export default {
  title: 'Components/Base/ActionMenu',
  component: ActionMenu
};

export const Default = (args: Props) => (
  <ActionMenu {...args}>
    <ActionMenuItem label="Copy" />
    <ActionMenuItem label="Cut" />
    <ActionMenuItem label="Paste" />
  </ActionMenu>
);
Default.args = {} as Props;

export const PopupToTheLeft = (args: Props) => (
  <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
    <ActionMenu {...args}>
      <ActionMenuItem label="Copy" />
      <ActionMenuItem label="Cut" />
      <ActionMenuItem label="Paste" />
    </ActionMenu>
  </div>
);
PopupToTheLeft.args = {
  direction: 'left'
} as Props;

export const WithCustomIcon = (args: Props) => (
  <ActionMenu {...args}>
    <ActionMenuItem label="Copy" />
    <ActionMenuItem label="Cut" />
    <ActionMenuItem label="Paste" />
  </ActionMenu>
);
WithCustomIcon.args = {
  icon: <Add size={16} />
} as Props;
