/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { DataBase } from '@carbon/react/icons';
import { Button } from '@exo/frontend-components-base';
import * as S from './QuickOrderButton.styles';

export const QuickOrderButton = ({ onClick }: Props) => {
  return (
    <S.QuickOrderButton>
      <Button variant="link" onClick={onClick} icon={<DataBase size={24} />} />
    </S.QuickOrderButton>
  );
};

type Props = {
  onClick: () => void;
};
