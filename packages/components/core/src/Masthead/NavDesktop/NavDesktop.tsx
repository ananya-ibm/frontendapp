/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './NavDesktop.styles';

export const NavDesktop = (props: Props) => {
  return (
    <S.NavRow>
      <S.PrimaryActions>{props.actions}</S.PrimaryActions>
      <S.SecondaryActions>{props.secondaryActions}</S.SecondaryActions>
    </S.NavRow>
  );
};

type Props = {
  actions?: React.ReactElement;
  secondaryActions?: React.ReactElement;
};
