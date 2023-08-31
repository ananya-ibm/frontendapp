/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Button } from '@exo/frontend-components-base';
import * as S from './OptionCard.styles';

export const OptionCard = ({ title, children, onClick, onMoreClick }: Props) => {
  return (
    <S.OptionCard>
      <h4 className="title">{title}</h4>
      {children}
      <S.ButtonGroup>
        {onMoreClick && <Button variant="link" label="More Info" onClick={onMoreClick} />}
        {onClick && <Button onClick={onClick} label="Select" />}
      </S.ButtonGroup>
    </S.OptionCard>
  );
};

type Props = {
  title: string;
  children: any;
  onClick?: () => void;
  onMoreClick?: () => void;
};
