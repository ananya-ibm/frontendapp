/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import { Theme } from '@exo/frontend-theme-base-theme';
import { white } from './themes/theme-white';

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

export type Carbon11Vars = typeof white;
export type PartialCarbon11Vars = DeepPartial<Carbon11Vars>;

export type CarbonTheme = Theme<Carbon11Vars>;

export type PartialCarbonTheme = Partial<Pick<CarbonTheme, 'globalStyles' | 'byComponent' | 'breakpoints' | 'static'>>;
