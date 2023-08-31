/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Tooltip } from './Tooltip';

export default {
  title: 'Features/Tutorial/Tooltip',
  component: Tooltip,
  decorators: [
    Story => (
      <div style={{ backgroundColor: 'grey', height: '40rem', padding: '1rem' }}>
        <Story />
      </div>
    )
  ]
};

export const Default = args => <Tooltip {...args} />;
Default.args = {
  backProps: {
    'aria-label': 'Back',
    'data-action': 'back',
    onClick: () => {},
    role: 'button',
    title: 'Back'
  },
  closeProps: {
    'aria-label': 'Close',
    'data-action': 'close',
    onClick: () => {},
    role: 'button',
    title: 'Close'
  },
  primaryProps: {
    'aria-label': 'Last',
    'data-action': 'primary',
    onClick: () => {},
    role: 'button',
    title: 'Last'
  },
  skipProps: {
    'aria-label': 'Skip',
    'data-action': 'skip',
    onClick: () => {},
    role: 'button',
    title: 'Skip'
  },
  tooltipProps: {
    'aria-modal': true,
    ref: () => {},
    role: 'alertdialog'
  },
  continuous: false,
  index: 1,
  isLastStep: true,
  size: 2,
  step: {
    title: 'Welcome to nextgen!',
    content: 'Here you can browse the main categories'
  }
};
