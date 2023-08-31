/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import {
  Events,
  Money,
  Document,
  DocumentBlank,
  Rotate,
  ArrowsVertical
} from '@carbon/react/icons';
import React from 'react';
import * as S from './AccountHeroNavigation.styles';

export const AccountHeroNavigation = ({ children } : Props) => {
  return (
    <S.AccountHeroNavigation>
      <S.NavigationItems>
        <S.NavigationItem href='#'>
          <S.NavigationItemIcon>
            <Money size={32} />
          </S.NavigationItemIcon>
          <S.NavigationItemLink>
            Make a payment
          </S.NavigationItemLink>
        </S.NavigationItem>
        <S.NavigationItem href='#'>
          <S.NavigationItemIcon>
            <Events size={32} />
          </S.NavigationItemIcon>
          <S.NavigationItemLink>
            Manage payees
          </S.NavigationItemLink>
        </S.NavigationItem>
        <S.NavigationItem href='#'>
          <S.NavigationItemIcon>
            <Document size={32} />
          </S.NavigationItemIcon>
          <S.NavigationItemLink>
            Statements
          </S.NavigationItemLink>
        </S.NavigationItem>
        <S.NavigationItem href='#'>
          <S.NavigationItemIcon>
            <DocumentBlank size={32} />
          </S.NavigationItemIcon>
          <S.NavigationItemLink>
            Documents
          </S.NavigationItemLink>
        </S.NavigationItem>
        <S.NavigationItem href='#'>
          <S.NavigationItemIcon>
            <Rotate size={32} />
          </S.NavigationItemIcon>
          <S.NavigationItemLink>
            Direct debits
          </S.NavigationItemLink>
        </S.NavigationItem>
        <S.NavigationItem href='#'>
          <S.NavigationItemIcon>
            <ArrowsVertical size={32} />
          </S.NavigationItemIcon>
          <S.NavigationItemLink>
            Standing orders
          </S.NavigationItemLink>
        </S.NavigationItem>
      </S.NavigationItems>
      {children}
    </S.AccountHeroNavigation>
  );
};

type Props = {
  children?: JSX.Element;
};