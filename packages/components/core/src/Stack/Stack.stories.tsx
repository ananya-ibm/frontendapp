/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Stack } from './Stack';

export default {
  title: 'Components/Core/Stack',
  component: Stack
};

type Props = React.ComponentProps<typeof Stack>;

export const Default = args => (
  <div style={{ border: '1px dashed #666666', width: '40rem', height: '40rem' }}>
    <Stack {...args}>
      <div style={{ width: '10rem', height: '2rem', backgroundColor: '#eeaaaa' }}></div>
      <div style={{ width: '10rem', height: '2rem', backgroundColor: '#eeaaaa' }}></div>
      <div style={{ width: '10rem', height: '2rem', backgroundColor: '#eeaaaa' }}></div>
    </Stack>
  </div>
);
Default.args = {} as Props;

export const Medium = args => (
  <div style={{ border: '1px dashed #666666', width: '40rem', height: '40rem' }}>
    <Stack {...args}>
      <div style={{ width: '10rem', height: '2rem', backgroundColor: '#eeaaaa' }}></div>
      <div style={{ width: '10rem', height: '2rem', backgroundColor: '#eeaaaa' }}></div>
      <div style={{ width: '10rem', height: '2rem', backgroundColor: '#eeaaaa' }}></div>
    </Stack>
  </div>
);
Medium.args = {
  size: 'md'
} as Props;

export const Large = args => (
  <div style={{ border: '1px dashed #666666', width: '40rem', height: '40rem' }}>
    <Stack {...args}>
      <div style={{ width: '10rem', height: '2rem', backgroundColor: '#eeaaaa' }}></div>
      <div style={{ width: '10rem', height: '2rem', backgroundColor: '#eeaaaa' }}></div>
      <div style={{ width: '10rem', height: '2rem', backgroundColor: '#eeaaaa' }}></div>
    </Stack>
  </div>
);
Large.args = {
  size: 'lg'
} as Props;

export const XLarge = args => (
  <div style={{ border: '1px dashed #666666', width: '40rem', height: '40rem' }}>
    <Stack {...args}>
      <div style={{ width: '10rem', height: '2rem', backgroundColor: '#eeaaaa' }}></div>
      <div style={{ width: '10rem', height: '2rem', backgroundColor: '#eeaaaa' }}></div>
      <div style={{ width: '10rem', height: '2rem', backgroundColor: '#eeaaaa' }}></div>
    </Stack>
  </div>
);
XLarge.args = {
  size: 'xl'
} as Props;
