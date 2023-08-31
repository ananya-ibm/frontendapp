/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { BudgetCalculator, BUDGET_TYPE, STEP_TYPE } from './BudgetCalculator';

export default {
  title: 'Components/Automotive/BudgetCalculator',
  component: BudgetCalculator
};

const storyProps = {
  title: 'Set your budget',
  steps: [
    {
      title: 'How do you want to pay?',
      options: ['Upfront', 'Monthly contract'],
      type: STEP_TYPE.BUTTONS
    },
    {
      title: 'What is your budget?',
      options: {
        0: [
          { id: '10000', label: 'Up to £10,000' },
          { id: '15000', label: 'Up to £15,000' },
          { id: '20000', label: 'Up to £20,000' },
          { id: '25000', label: 'Up to £25,000' },
          { id: '35000', label: 'Up to £35,000' },
          { id: '45000', label: 'Up to £45,000' },
          { id: '50000', label: '£50,000 or more' }
        ],
        1: [
          { id: '9999999', label: 'No maximum' },
          { id: '200', label: 'Up to £200' },
          { id: '300', label: 'Up to £300' },
          { id: '400', label: 'Up to £400' },
          { id: '500', label: 'Up to £500' },
          { id: '5000', label: '£500 +' }
        ]
      },
      type: STEP_TYPE.DROPDOWN,
      label: { 0: 'Budget Amount', 1: 'Monthly Price' }
    },
    {
      title: 'How much will you pay for deposit?',
      options: [
        {
          label: 'How much will you pay for your deposit?',
          min: 0,
          max: 30000,
          step: 1000,
          value: 3000,
          unit: '£'
        },
        {
          label: 'How many miles per annum?',
          min: 1000,
          max: 30000,
          step: 1000,
          value: 10000,
          unit: 'm'
        },
        {
          label: 'How many months would you like to pay over?',
          min: 12,
          max: 48,
          step: 6,
          value: 36,
          unit: 'M'
        }
      ],
      type: STEP_TYPE.SLIDER,
      group: BUDGET_TYPE.MONTHLY
    },
    {
      title: 'Do you want to trade your car in?',
      options: ['Not right now', 'Yes, I want to trade-in'],
      type: STEP_TYPE.BUTTONS
    }
  ],
  nextBtnLabel: 'Next',
  savePreferenceLabel: 'Save my budget preference',
  browseCarsLabel: 'Browse cars with budget preference',
  onSave: budget => {
    // eslint-disable-next-line no-console
    console.log('budget saved:', budget);
  }
};

export const normal = args => <BudgetCalculator {...args} />;
normal.args = storyProps;
