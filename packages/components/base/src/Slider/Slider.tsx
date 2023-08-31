/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Slider as CarbonSlider } from '@carbon/react';

export const Slider = ({
  id,
  name,
  value = 0,
  step,
  min = 0,
  max = 100,
  minLabel,
  maxLabel,
  onChange = () => {},
  labelText,
  className
}: Props) => (
  <CarbonSlider
    id={id}
    name={name}
    value={value}
    step={step}
    min={min}
    max={max}
    minLabel={minLabel}
    maxLabel={maxLabel}
    onChange={(v) => onChange(v.value)}
    labelText={labelText}
    className={className}
  />
);

type Props = {
  id?: string;
  name?: string;
  value?: number;
  step?: number;
  min?: number;
  max?: number;
  minLabel?: string;
  maxLabel?: string;
  onChange?: (value: number) => void;
  labelText?: string;
  variant?: 'default';
  className?: string;
};
