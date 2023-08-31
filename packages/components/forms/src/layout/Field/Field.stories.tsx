/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Field } from './Field';

export default {
  title: 'Components/Forms/Layout/Field',
  component: Field
};

// ---------------------------------------------------------------------------------------------------

export const Default = args => (
  <div>
    <Field {...args}>
      <div style={{ backgroundColor: '#eeeeee', height: '3em' }} />
    </Field>
    <Field {...args}>
      <div style={{ backgroundColor: '#eeeeee', height: '3em' }} />
    </Field>
    <Field {...args}>
      <div style={{ backgroundColor: '#eeeeee', height: '3em' }} />
    </Field>
  </div>
);
Default.args = {};
