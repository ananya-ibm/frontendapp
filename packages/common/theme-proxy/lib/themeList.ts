/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

// This looks weird, but it's the only feasible way to control, trough webpack,
// which themes gets bundled in the build

import { Theme as theme0, ThemeProvider as tp0 } from '@exo-provider/frontend-theme-0';
import { Theme as theme1, ThemeProvider as tp1 } from '@exo-provider/frontend-theme-1';
import { Theme as theme2, ThemeProvider as tp2 } from '@exo-provider/frontend-theme-2';
import { Theme as theme3, ThemeProvider as tp3 } from '@exo-provider/frontend-theme-3';
import { Theme as theme4, ThemeProvider as tp4 } from '@exo-provider/frontend-theme-4';
import { Theme as theme5, ThemeProvider as tp5 } from '@exo-provider/frontend-theme-5';
import { Theme as theme6, ThemeProvider as tp6 } from '@exo-provider/frontend-theme-6';
import { Theme as theme7, ThemeProvider as tp7 } from '@exo-provider/frontend-theme-7';
import { Theme as theme8, ThemeProvider as tp8 } from '@exo-provider/frontend-theme-8';
import { Theme as theme9, ThemeProvider as tp9 } from '@exo-provider/frontend-theme-9';

export default () => {
  return [theme0, theme1, theme2, theme3, theme4, theme5, theme6, theme7, theme8, theme9].filter(
    t => t.name
  );
};

export const themes = [
  theme0,
  theme1,
  theme2,
  theme3,
  theme4,
  theme5,
  theme6,
  theme7,
  theme8,
  theme9
];
export const providers = [tp0, tp1, tp2, tp3, tp4, tp5, tp6, tp7, tp8, tp9];
