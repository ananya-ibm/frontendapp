/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { FieldPanelGroupStepByStep } from './FieldPanelGroupStepByStep';

export default {
  title: 'Components/Forms/Layout/FieldPanelGroupStepByStep',
  component: FieldPanelGroupStepByStep
};

export const Default = args => (
  <FieldPanelGroupStepByStep {...args}>
    <FieldPanelGroupStepByStep.Step key="a" labelText="Step 1">
      <div style={{ border: '1px dashed gray' }}>Step 1</div>
    </FieldPanelGroupStepByStep.Step>

    <FieldPanelGroupStepByStep.Step key="b" labelText="Step 2" helpText="Lorem ipsum">
      <div style={{ border: '1px dashed gray' }}>Step 2</div>
    </FieldPanelGroupStepByStep.Step>

    <FieldPanelGroupStepByStep.Step key="c" labelText="Step 3">
      <div style={{ border: '1px dashed gray' }}>Step 3</div>
    </FieldPanelGroupStepByStep.Step>
  </FieldPanelGroupStepByStep>
);
Default.args = {
  onChange: () => {
    console.log('onChange');
  }
};
