/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useMemo } from 'react';
import * as S from './FlightInfoSegment.styles';

export const FlightInfoSegment = ({ type = 'noIcon', text = '', className }: Props) => {
  const icon = useMemo(() => {
    switch (type) {
      case 'date':
        return <S.DateIcon />;
      case 'time':
        return <S.TimeIcon />;
      case 'passengers':
        return <S.PassengersIcon />;
      case 'class':
        return <S.PlaneIcon />;
      case 'noIcon':
        return null;
      default:
        return <S.DateIcon />;
    }
  }, [type]);

  return (
    <S.FlightInfoSegment className={className}>
      <S.InfoText>
        {icon}
        {text}
      </S.InfoText>
    </S.FlightInfoSegment>
  );
};

type Props = {
  type?: 'date' | 'time' | 'passengers' | 'class' | 'noIcon';
  text?: string | number | null;
  className?: string; // enables styled-components to style this component from outside
};