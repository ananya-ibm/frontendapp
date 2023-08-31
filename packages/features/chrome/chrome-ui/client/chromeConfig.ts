/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { ApplicationConfig, Extension, Extensions } from '@exo/frontend-common-app-shell';

declare global {
  interface EXOFeatureConfig {
    chrome?: ChromeConfig;
  }
}

export type ChromeConfig = {
  meta: {
    title: string;
    icon: string;
  };
  localization?: {
    canSelectCountry: boolean;
    canSelectLanguage: boolean;
    canSelectCurrency: boolean;

    defaultCurrency: string;
    defaultCountry: string;
    defaultLangauge: string;
  };
  header: {
    extensions: Extensions<'icons' | 'extraHeaders'>;
    navigationUrlType?: 'slug' | 'id';
    navigationKey?: string;
    menuTrigger?: 'none' | 'hover' | 'click';
    fixedLinks?: {
      label: string;
      href: string;
    }[];
  };
  footer: {
    copyright: string;
  };
  ui?: Extension;
};

export const getChromeConfig = (config: ApplicationConfig): ChromeConfig => {
  return config.featureConfig?.chrome!;
};
