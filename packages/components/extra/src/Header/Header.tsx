/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { useIntl } from '@exo/frontend-common-i18n';
import { Nav } from '../Nav/Nav';
import * as S from './Header.styles';

export const Header = ({
  navItems,
  children,
  isMenuOpen,
  onMenuToggle,
  logo,
  languageSelector,
  userName,
  search,
  link,
  megaMenuTrigger
}: Props) => {
  const intl=useIntl('features.chrome.chrome-ui.smart-components.Header');
  const searchDefined = !!search;
  return (
    <S.Header>
      <S.Content>
        {logo && (
          <S.Logo href="/" className="logo" aria-label="Home Link">
            {logo}
            <span className="sr">{intl.msg('header.Home', 'Home')}</span>
          </S.Logo>
        )}
        {children && (
          <S.Icons>
            {searchDefined && search}
            {children}
          </S.Icons>
        )}
      </S.Content>
      {navItems && (
        <Nav
          navItems={navItems}
          isMenuOpen={isMenuOpen}
          onMenuToggle={onMenuToggle}
          languageSelector={languageSelector}
          userName={userName}
          link={link}
          megaMenuTrigger={megaMenuTrigger}
        />
      )}
    </S.Header>
  );
};

type NavEntry = {
  text?: string;
  url?: string;
  type?: string;
  title?: string;
  description?: string;
  thumbnail?: string;
  isDelimiter: boolean;
  children?: NavEntry[];
};

type Props = {
  navItems?: NavEntry[];
  children?: any;
  isMenuOpen?: boolean;
  onMenuToggle: (state: boolean) => void;
  logo: React.ReactElement;
  languageSelector?: React.ReactElement;
  search?: React.ReactElement;
  userName?: string;
  link: string;
  megaMenuTrigger?: 'hover' | 'click' | 'none';
};
