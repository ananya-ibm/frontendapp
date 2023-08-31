/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-else-return */

import React, { JSXElementConstructor, ReactElement } from 'react';
import {
  PasswordInput as CarbonPasswordInput,
  TextInput as CarbonTextInput,
  NumberInput as CarbonNumberInput,
  Search as CarbonSearch
} from '@carbon/react';

type TextInputType = {
  (props: Props & React.RefAttributes<HTMLInputElement>): ReactElement<
    any,
    string | JSXElementConstructor<any>
  > | null;
};

export const TextInput: TextInputType = React.forwardRef<HTMLInputElement>(
  (
    {
      id,
      name,
      value,
      errorText,
      labelText,
      helpText,
      type = 'text',
      variant = 'default',
      size,
      hideLabel = false,
      onChange,
      onBlur,
      className,
      ...rest
    }: Props,
    ref
  ) => {
    if (type === 'password') {
      return (
        <CarbonPasswordInput
          id={id ?? name}
          name={name ?? id}
          ref={ref}
          invalidText={errorText}
          invalid={errorText !== undefined && errorText !== ''}
          labelText={labelText!}
          helperText={helpText}
          size={size}
          className={className}
          onChange={(e) => {
            onChange?.(e);
          }}
          onBlur={onBlur}
          value={value as string}
          {...ref}
        />
      );
    } else if (type === 'number') {
      return (
        <CarbonNumberInput
          id={id ?? name}
          name={name ?? id}
          ref={ref}
          invalidText={errorText}
          hideLabel={hideLabel || labelText === undefined}
          invalid={errorText !== undefined && errorText !== ''}
          label={labelText}
          iconDescription={labelText ?? 'number'}
          helperText={helpText}
          type={type}
          size={size}
          className={className}
          onChange={(e) => {
            onChange?.(e);
          }}
          onBlur={onBlur}
          value={value as number | ''}
          {...rest}
        />
      );
    } else if (type === 'search') {
      return (
        <CarbonSearch
          id={id ?? name}
          name={name ?? id}
          labelText={labelText!}
          size={size}
          className={className}
          onChange={(e) => {
            onChange?.(e);
          }}
          onBlur={onBlur}
          value={value as string}
          {...rest}
        />
      );
    } else {
      return (
        <CarbonTextInput
          id={id ?? name}
          name={name ?? id}
          ref={ref}
          invalidText={errorText}
          hideLabel={hideLabel || labelText === undefined || labelText === ''}
          invalid={errorText !== undefined && errorText !== ''}
          labelText={labelText!}
          helperText={helpText}
          type={type}
          size={size}
          className={className}
          onChange={(e) => {
            onChange?.(e);
          }}
          onBlur={onBlur}
          value={value as string}
          {...rest}
        />
      );
    }
  }
);

type Props<T = HTMLInputElement> = {
  id: string;
  labelText?: string;
  errorText?: string;
  helpText?: string;
  type?: 'text' | 'password' | 'number' | 'email' | 'search' | 'tel' | 'url';
  variant?: 'default';
  size?: 'sm' | 'md' | 'lg' | undefined;
  defaultValue?: string | number;
  hideLabel?: boolean;
  className?: string;
} & Omit<React.InputHTMLAttributes<T>, 'size' | 'defaultValue'>;
