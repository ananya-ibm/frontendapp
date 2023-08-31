/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ButtonGroup } from './ButtonGroup';
import { Button } from '../Button/Button';

export default {
  title: 'Components/Base/ButtonGroup',
  component: ButtonGroup
};

export const Default = args => (
  <ButtonGroup {...args}>
    <Button label="Primary button" />
    <Button label="Secondary button" variant="secondary" />
  </ButtonGroup>
);
Default.args = {};

export const LeftAligned = args => (
  <ButtonGroup {...args}>
    <Button label="Primary button" />
    <Button label="Secondary button" variant="secondary" />
  </ButtonGroup>
);
LeftAligned.args = { isLeft: true };
