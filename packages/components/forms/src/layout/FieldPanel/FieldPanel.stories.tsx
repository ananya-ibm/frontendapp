/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { FieldPanel } from './FieldPanel';
import { Field } from '../Field/Field';

export default {
  title: 'Components/Forms/Layout/FieldPanel',
  component: FieldPanel
};

// ---------------------------------------------------------------------------------------------------

export const Default = args => (
  <FieldPanel {...args}>
    <Field {...args}>
      <div style={{ backgroundColor: '#ffffff', height: '3em' }} />
    </Field>
    <Field {...args}>
      <div style={{ backgroundColor: '#ffffff', height: '3em' }} />
    </Field>
    <Field {...args}>
      <div style={{ backgroundColor: '#ffffff', height: '3em' }} />
    </Field>
  </FieldPanel>
);
Default.args = {
  title: 'Some title'
};

// ---------------------------------------------------------------------------------------------------

export const WithHelpText = args => (
  <FieldPanel {...args}>
    <Field {...args}>
      <div style={{ backgroundColor: '#ffffff', height: '3em' }} />
    </Field>
    <Field {...args}>
      <div style={{ backgroundColor: '#ffffff', height: '3em' }} />
    </Field>
    <Field {...args}>
      <div style={{ backgroundColor: '#ffffff', height: '3em' }} />
    </Field>
  </FieldPanel>
);
WithHelpText.args = {
  ...Default.args,
  helpText: 'Lorem ipsum dolor sit amet consectetuer adispcing'
};
