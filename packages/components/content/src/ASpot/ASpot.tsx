/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Button } from '@exo/frontend-components-base';
import * as S from './ASpot.styles';

export const ASpot = ({ image, title, subtitle, buttonLabel, onClick }: Props) => {
  return (
    <S.ASpot bgImg={image}>
      <S.Title>{title}</S.Title>
      {subtitle && <S.Subtitle>{subtitle}</S.Subtitle>}
      {onClick && (
        <S.Button>
          <Button variant="secondary" onClick={onClick} label={buttonLabel} />
        </S.Button>
      )}
    </S.ASpot>
  );
};

type Props = {
  image: string;
  title: string | React.ReactNode;
  subtitle?: string | React.ReactNode;
  buttonLabel?: string | React.ReactNode;
  onClick?: () => void;
};
