/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import {
  Dropdown as CarbonDropdown,
  DropdownSkeleton as CarbonDropdownSkeleton
} from '@carbon/react';
import React, { JSXElementConstructor, ReactElement } from 'react';

type DropdownType = {
  <I>(props: Props<I>): ReactElement<any, string | JSXElementConstructor<any>> | null;
  Skeleton(): JSX.Element;
};

// @ts-ignore
export const Dropdown: DropdownType = React.forwardRef<HTMLElement>(
  (
    {
      labelText,
      dropdownLabel,
      id,
      items,
      itemToString,
      itemToElement,
      onChange,
      disabled,
      errorText,
      helpText,
      selectedItem,
      initialSelectedItem,
      variant,
      className,
      ...rest
    }: Props<any>,
    ref
  ) => {
    return (
      <CarbonDropdown
        ref={ref as React.RefObject<HTMLButtonElement>}
        {...rest}
        id={id}
        disabled={disabled}
        type={variant === 'inline' ? 'inline' : 'default'}
        titleText={labelText}
        invalidText={errorText}
        helperText={helpText}
        invalid={errorText !== undefined && errorText !== ''}
        label={dropdownLabel ?? labelText}
        items={items}
        itemToString={itemToString}
        itemToElement={itemToElement}
        selectedItem={selectedItem}
        initialSelectedItem={initialSelectedItem}
        onChange={({ selectedItem: si }) => onChange?.(si)}
        className={className}
      />
    );
  }
);

Dropdown.Skeleton = () => {
  return <CarbonDropdownSkeleton />;
};

type Props<I, T = HTMLElement> = {
  id: string;
  labelText: string;
  // TODO: Maybe rename to placeholderText or similar - check with TextInput
  dropdownLabel?: string;
  disabled?: boolean;
  errorText?: string;
  helpText?: string;
  items: readonly I[];
  itemToString?(item: I): string;
  itemToElement?(item: I): ReactElement;
  onChange?(selectedItem: I): void;
  selectedItem?: I | null | undefined;
  initialSelectedItem?: I | null | undefined;
  variant?: 'default' | 'inline';
  className?: string;
} & Omit<React.HTMLAttributes<T>, 'onChange'>;
