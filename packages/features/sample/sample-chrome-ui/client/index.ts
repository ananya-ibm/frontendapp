/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { ApplicationConfig } from '@exo/frontend-common-app-shell';
import { ChromeConfig } from '@exo/frontend-features-chrome-ui';

export * from './components/Chrome/Chrome';
export * from './components/PageNotFound/PageNotFound';
export * from './smart-components/Header/Header';
export * from './smart-components/Footer/Footer';

export const getChromeConfig = (config: ApplicationConfig): ChromeConfig => {
  return config.featureConfig?.chrome!;
};
