/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-console */

import { Theme as themePrimary } from '@exo-provider/frontend-theme';
import { themes } from './themeList';

const verifyThemeVersion = t => {
  if (t.version !== '0.4') {
    console.warn(
      `Theme '${t.name}' uses an old theme format (${t.version ?? '0.1'} vs current 0.2)`
    );
  }
};

const handler = {
  get: (target, prop) => {
    if (typeof window !== 'undefined') {
      const exoTheme = window.localStorage.getItem('exo_theme') === undefined ? window.exo_theme : window.localStorage.getItem('exo_theme');
      if (exoTheme !== undefined && exoTheme !== null && exoTheme !== 'undefined') {
        return (themes[window.localStorage.getItem('exo_theme') ?? window.exo_theme] ?? target)[prop];
      }
    }
    return target[prop];
  }
};

// Verify theme versions
verifyThemeVersion(themePrimary);
themes.filter(t => t.name).forEach(t => verifyThemeVersion(t));

export default new Proxy(themePrimary, handler);
