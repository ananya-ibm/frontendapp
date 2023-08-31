/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import faker from 'faker';
import React from 'react';
import { SidePanel } from './SidePanel';

export default {
  title: 'Components/Core/SidePanel',
  component: SidePanel,
  parameters: { actions: { argTypesRegex: '^on.*' } }
};

type Props = React.ComponentProps<typeof SidePanel>;

const fakeMain = n =>
  faker.lorem
    .paragraphs(n)
    .split('\n')
    .map(e => <p key={e}>{e}</p>);

export const Default = args => (
  <div>
    <SidePanel {...args}>
      <SidePanel.Body>{fakeMain(1)}</SidePanel.Body>
    </SidePanel>
    <SidePanel.Main>{fakeMain(40)}</SidePanel.Main>
  </div>
);
Default.args = {
  isOpen: true,
  isClosable: false
} as Props;

export const WithTitle = args => (
  <div>
    <SidePanel {...args}>
      <SidePanel.Body>{fakeMain(10)}</SidePanel.Body>
    </SidePanel>
    <SidePanel.Main>{fakeMain(40)}</SidePanel.Main>
  </div>
);
WithTitle.args = {
  ...Default.args,
  title: 'Lorem ipsum dolor',
  isClosable: true,
  hasOverlay: false
} as Props;

export const WithButtons = args => (
  <div>
    <SidePanel {...args}>
      <SidePanel.Body>{fakeMain(10)}</SidePanel.Body>
    </SidePanel>
    <SidePanel.Main>{fakeMain(40)}</SidePanel.Main>
  </div>
);
WithButtons.args = {
  ...Default.args,
  title: 'Lorem ipsum dolor',
  isClosable: true,
  buttons: [{ label: 'Ok', isPrimary: true }, { label: 'Cancel' }]
} as Props;

export const WithDisabledButtons = args => (
  <div>
    <SidePanel {...args}>
      <SidePanel.Body>{fakeMain(10)}</SidePanel.Body>
    </SidePanel>
    <SidePanel.Main>{fakeMain(40)}</SidePanel.Main>
  </div>
);
WithDisabledButtons.args = {
  ...Default.args,
  title: 'Lorem ipsum dolor',
  isClosable: true,
  buttons: [{ label: 'Ok', isPrimary: true, disabled: true }, { label: 'Cancel' }]
} as Props;
