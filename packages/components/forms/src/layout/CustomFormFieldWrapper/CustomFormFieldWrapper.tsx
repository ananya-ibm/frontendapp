/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './CustomFormFieldWrapper.styles';

export const CustomFormFieldWrapper = ({
  children,
  errorText,
  labelText,
  isRequired,
  requiredLabelText = (isReq, label) => (isReq ? label : `${label} (optional)`),
  helpText
}) => {
  return (
    <S.CustomFormField>
      <S.Label>{requiredLabelText(!!isRequired, labelText ?? '')}</S.Label>
      <S.Field hasError={!!errorText}>{children}</S.Field>
      {helpText && <S.Help>{helpText}</S.Help>}
      {errorText !== undefined && errorText !== '' && <S.Error>{errorText}</S.Error>}
    </S.CustomFormField>
  );
};
