/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { FieldRow } from './FieldRow';

export default {
  title: 'Components/Forms/Layout/FieldRow',
  component: FieldRow
};

export const Default = args => (
  <FieldRow {...args}>
    <div style={{ backgroundColor: '#eeeeee', height: '3em' }} />
    <div style={{ backgroundColor: '#eeeeee', height: '3em' }} />
    <div style={{ backgroundColor: '#eeeeee', height: '3em' }} />
  </FieldRow>
);
Default.args = {};

// --------------------------------------------------------------------

export const DifferentWidths = args => (
  <FieldRow {...args}>
    <div style={{ backgroundColor: '#eeeeee', height: '3em' }} />
    <div style={{ backgroundColor: '#eeeeee', height: '3em' }} />
    <div style={{ backgroundColor: '#eeeeee', height: '3em' }} />
  </FieldRow>
);
DifferentWidths.args = {
  widths: ['20%', '45%', '35%']
};
