/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable jsx-a11y/label-has-for */

import React from 'react';
import { UncontrolledFieldProps } from '../../helpers/types';
import * as S from './RadioButton.styles';

export const RadioButton = React.forwardRef(
  (
    {
      id,
      name,
      value,
      labelText,
      helpText,
      isDisabled,
      isChecked,
      onChange,
      onBlur,
      onChangeValue
    }: Props,
    ref
  ) => {
    return (
      <S.RadioButton>
        <div className="cds--radio-button-wrapper">
          <input
            disabled={isDisabled}
            /* @ts-ignore */
            ref={ref}
            id={id}
            name={name}
            onChange={e => {
              onChange?.(e);
              onChangeValue?.(e.currentTarget.value);
            }}
            checked={isChecked}
            onBlur={onBlur}
            type="radio"
            className="cds--radio-button"
            value={value}
          />
          <label htmlFor={id} className="cds--radio-button__label">
            <span className="cds--radio-button__appearance" />
            <span>{labelText}</span>
          </label>
        </div>

        {helpText !== undefined && <S.Help>{helpText}</S.Help>}
      </S.RadioButton>
    );
  }
);

type Props = UncontrolledFieldProps<string> & {
  isChecked?: boolean;
};
