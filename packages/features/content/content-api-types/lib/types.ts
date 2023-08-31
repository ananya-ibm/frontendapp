/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { ApplicationConfig } from '@exo/frontend-common-app-shell';
import { ProviderContextProvider } from '@exo/frontend-common-provider';

export type CmsProviders = {
  CmsContainer?: (props: {
    children?: any;
    name: string;
    spec?: Record<string, string>;
  }) => React.ReactElement;
  CmsSpot?: (props: {
    children?: any;
    name: string;
    spec?: Record<string, string>;
    render: (content: any) => React.ReactElement;
  }) => React.ReactElement | React.ReactElement[];
};


export type CmsComponent = {
  name: string;
  component: () => React.ReactElement;
} & EXOCmsComponentConfig;

export type CmsConfiguration = {
  components: CmsComponent[];
  aem?: { [key: string]: any };
  brxm?: { [key: string]: any };
} & EXOCmsConfig;

export type CmsContextInterface = EXOCmsContext;


export type CmsProviderContextProvider = ProviderContextProvider<
  CmsProviders,
  CmsConfiguration,
  CmsContextInterface
> & {
  globalCmsInit?: (config: ApplicationConfig) => void;
  ssrInit?: (config: ApplicationConfig, url: string, additionalData?: any) => Promise<() => string>;
  ssrInitAdditionalRoutes?: (config: ApplicationConfig, router: any) => void;
};
