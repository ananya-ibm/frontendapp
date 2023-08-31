/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Header } from './Header/Header';
import { Auxilliary } from './Auxilliary/Auxilliary';
import { NavDesktop } from './NavDesktop/NavDesktop';
import { NavMobile } from './NavMobile/NavMobile';
import { MenuToggle } from './MenuToggle/MenuToggle';
import { MegaMenu, MegaMenuTrigger } from './MegaMenu/MegaMenu';
import * as S from './Masthead.styles';

export const Masthead = ({ children }) => {
  return <S.Masthead>{children}</S.Masthead>;
};

Masthead.Auxilliary = Auxilliary;
Masthead.Header = Header;
Masthead.NavDesktop = NavDesktop;
Masthead.NavMobile = NavMobile;
Masthead.MenuToggle = MenuToggle;
Masthead.MegaMenu = MegaMenu;
Masthead.MegaMenuTrigger = MegaMenuTrigger;
