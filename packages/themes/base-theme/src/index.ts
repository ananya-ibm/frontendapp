/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { DefaultTheme } from 'styled-components';
import { Theme } from './types';

export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;

declare global {
  interface EXOComponentStyles {}
  type EXOThemeProps = { theme: DefaultTheme };
}

declare module 'styled-components' {
  export interface DefaultTheme extends Theme<any> {}
}

export * from './types';
