/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-else-return */

import React, { JSXElementConstructor, ReactElement } from 'react';
import { TextArea as CarbonTextArea } from '@carbon/react';

type TextAreaType = {
  (props: Props & React.RefAttributes<HTMLTextAreaElement>): ReactElement<
    any,
    string | JSXElementConstructor<any>
  > | null;
};

export const TextArea: TextAreaType = React.forwardRef<HTMLTextAreaElement>(
  (
    {
      id,
      name,
      value,
      errorText,
      labelText,
      helpText,
      variant = 'default',
      hideLabel = false,
      onChange,
      onBlur,
      className,
      ...rest
    }: Props,
    ref
  ) => {
    return (
      <CarbonTextArea
        id={id ?? name}
        name={name ?? id}
        ref={ref}
        invalidText={errorText}
        hideLabel={hideLabel || labelText === undefined || labelText === ''}
        invalid={errorText !== undefined && errorText !== ''}
        labelText={labelText!}
        helperText={helpText}
        onChange={(e) => {
          onChange?.(e);
        }}
        className={className}
        onBlur={onBlur}
        value={value as string}
        {...rest}
      />
    );
  }
);

type Props<T = HTMLTextAreaElement> = {
  id: string;
  labelText?: string;
  errorText?: string;
  helpText?: string;
  variant?: 'default';
  defaultValue?: string | number;
  hideLabel?: boolean;
  className?: string;
} & Omit<React.TextareaHTMLAttributes<T>, 'size' | 'defaultValue'>;
