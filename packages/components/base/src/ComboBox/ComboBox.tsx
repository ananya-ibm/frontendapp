/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { ComboBox as CarbonComboBox } from '@carbon/react';
import React, { JSXElementConstructor, ReactElement } from 'react';

type ComboBoxType = {
  <I>(props: Props<I>): ReactElement<any, string | JSXElementConstructor<any>> | null;
};

// @ts-ignore
export const ComboBox: ComboBoxType = ({
  labelText,
  placeholder,
  id,
  name,
  disabled,
  errorText,
  helpText,
  initialSelectedItem,
  variant,
  items,
  itemToString,
  selectedItem,
  onChange,
  onInputChange,
  shouldFilterItem,
  downshiftProps,
  className,
  ...rest
}: Props<any>) => {
  return (
    <CarbonComboBox<any>
      {...rest}
      id={id}
      disabled={disabled}
      type={variant === 'inline' ? 'inline' : 'default'}
      titleText={labelText}
      invalidText={errorText}
      helperText={helpText}
      invalid={errorText !== undefined && errorText !== ''}
      placeholder={placeholder ?? labelText}
      items={items}
      itemToString={itemToString}
      selectedItem={selectedItem}
      initialSelectedItem={initialSelectedItem}
      onChange={({ selectedItem: si }) => onChange?.(si)}
      onInputChange={onInputChange}
      downshiftProps={downshiftProps}
      shouldFilterItem={shouldFilterItem}
      className={className}
    />
  );
};

type Props<ItemType = string, T = HTMLElement> = {
  id: string;
  labelText: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  errorText?: string;
  helpText?: string;
  variant?: 'default' | 'inline';
  initialSelectedItem?: ItemType;
  items: readonly ItemType[];
  itemToString?(item: ItemType): string;
  onChange?(selectedItem: ItemType): void;
  onInputChange?(val: string): void;
  shouldFilterItem?(data: { item: ItemType; inputValue?: string }): void;
  selectedItem?: ItemType | null | undefined;
  downshiftProps?: any;
  className?: string;
} & Omit<React.HTMLAttributes<T>, 'onChange'>;
