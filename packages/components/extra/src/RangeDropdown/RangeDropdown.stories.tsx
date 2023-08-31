/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Slider } from '@exo/frontend-components-base';
import { RangeDropdown } from './RangeDropdown';

export default {
  title: 'Components/Extra/RangeDropdown',
  component: RangeDropdown
};

const options = [
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
    unit: '£'
  },
  {
    label: 'How many months would you like to pay over?',
    min: 12,
    max: 48,
    step: 6,
    value: 36,
    unit: 'Month'
  }
];

const SliderChildren = () => {
  const onChange = (idx, evt) => {
    // eslint-disable-next-line no-console
    console.log('Slider ', idx, ' clicked with ', evt.value);
  };

  return (
    <>
      {options.map((option, idx) => (
        <Slider
          key={option.label}
          labelText={option.label}
          min={option.min}
          max={option.max}
          step={option.step}
          value={option.value}
          onChange={evt => onChange(idx, evt)}
          minLabel={option.unit}
          maxLabel={option.unit}
        />
      ))}
    </>
  );
};

const storyProps = {
  label: 'Budget',
  children: <SliderChildren />
};

export const normal = args => <RangeDropdown {...args} />;
normal.args = storyProps;
