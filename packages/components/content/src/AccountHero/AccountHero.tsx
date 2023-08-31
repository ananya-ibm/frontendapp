/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { AccountHeroNavigation } from '../AccountHeroNavigation/AccountHeroNavigation';
import * as S from './AccountHero.styles';

export const AccountHero = ({
  title,
  children
} : Props) => {
  return (
    <S.AccountHero>
      <S.AccountHeroTitle>
        {title}
      </S.AccountHeroTitle>
      <AccountHeroNavigation />
      {children}
    </S.AccountHero>
  );
};

type Props = {
  title?: any;
  children?: JSX.Element;
};



