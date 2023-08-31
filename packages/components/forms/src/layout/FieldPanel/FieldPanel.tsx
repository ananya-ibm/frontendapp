/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './FieldPanel.styles';

export const FieldPanel = ({ title, helpText = '', children }: Props) => {
  return (
    <S.FieldPanel>
      {title && <S.Legend>{title}</S.Legend>}

      {helpText && <S.Help>{helpText}</S.Help>}

      {children}
    </S.FieldPanel>
  );
};

type Props = {
  children: any;
  title?: React.ReactNode;
  helpText?: React.ReactNode;
};
