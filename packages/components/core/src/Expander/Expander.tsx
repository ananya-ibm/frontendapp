/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from '@carbon/react/icons';

import * as S from './Expander.styles';

export const Expander = ({ label, isDefaultExpanded, children }: Props) => {
  const [isExpanded, setIsExpanded] = useState(isDefaultExpanded);
  const onClick = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <>
      <S.Expander isExpanded={isExpanded}>
        <S.Heading data-testid="OpenMenu" onClick={onClick}>
          {label}
          <S.Icon> {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}</S.Icon>
        </S.Heading>
        <S.Content isExpanded={isExpanded}>{children}</S.Content>
      </S.Expander>
    </>
  );
};

type Props = {
  isDefaultExpanded?: boolean;
  label?: React.ReactElement | string;
  children?: any;
};
