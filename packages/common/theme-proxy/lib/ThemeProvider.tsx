/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';

/* @ts-ignore */
import { ThemeProvider as themePrimary } from '@exo-provider/frontend-theme';
// eslint-disable-next-line node/no-restricted-import
import { useTheme } from 'styled-components';
import { providers } from './themeList';

const DefaultThemeProvider = ({ children }: { children: any }) => {
  const currentTheme = useTheme();
  if (currentTheme && Object.entries(currentTheme).length > 0) {
    return children;
  }

  let EffectiveProvider = themePrimary;

  if (typeof window !== 'undefined') {
    const exoTheme = window.localStorage.getItem('exo_theme') === undefined ? window.exo_theme : window.localStorage.getItem('exo_theme');
    if (exoTheme !== undefined && exoTheme !== null && exoTheme !== 'undefined') {
      EffectiveProvider = providers[exoTheme] as any ?? themePrimary;
    }
  }

  return <EffectiveProvider>{children}</EffectiveProvider>;
};

export default DefaultThemeProvider;
