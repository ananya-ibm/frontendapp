/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Add, TrashCan } from '@carbon/react/icons';
import { Button } from './Button';

type Props = React.ComponentProps<typeof Button>;

export default {
  title: 'Components/Base-ReactAria/Button',
  component: Button
};

export const Default = (args: Props) => <Button {...args} />;
Default.args = {
  label: 'Click me'
} as Props;

export const VariantSecondary = (args: Props) => <Button {...args} />;
VariantSecondary.args = {
  label: 'Click me',
  variant: 'secondary'
} as Props;

export const VariantDanger = (args: Props) => <Button {...args} />;
VariantDanger.args = {
  label: 'Click me',
  variant: 'danger'
} as Props;

export const VariantTertiary = (args: Props) => <Button {...args} />;
VariantTertiary.args = {
  label: 'Click me',
  variant: 'tertiary',
  icon: <TrashCan size={16} />
} as Props;

export const VariantLight = (args: Props) => <Button {...args} />;
VariantLight.args = {
  label: 'Click me',
  variant: 'light',
  iconPosition: 'left',
  icon: <Add size={16} />
} as Props;

export const VariantLink = (args: Props) => <Button {...args} />;
VariantLink.args = {
  label: 'Click me',
  variant: 'link',
  iconPosition: 'left',
  icon: <TrashCan size={16} />
} as Props;

export const SizeDefault = (args: Props) => <Button {...args} />;
SizeDefault.args = {
  label: 'Click me',
  size: 'medium'
} as Props;

export const SizeSmall = (args: Props) => <Button {...args} />;
SizeSmall.args = {
  label: 'Click me',
  size: 'small'
} as Props;

export const SizeLarge = (args: Props) => <Button {...args} />;
SizeLarge.args = {
  label: 'Click me',
  size: 'large'
} as Props;

export const SizeField = (args: Props) => <Button {...args} />;
SizeField.args = {
  label: 'Click me',
  size: 'field'
} as Props;

export const OnlyIcon = (args: Props) => <Button {...args} />;
OnlyIcon.args = {
  variant: 'danger',
  icon: <TrashCan size={16} />
} as Props;
