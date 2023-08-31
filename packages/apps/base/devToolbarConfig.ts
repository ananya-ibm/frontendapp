/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { ApplicationConfig } from '@exo/frontend-common-app-shell';
import { loadable } from './loadable';

const PlaygroundLink = loadable(
  () => import('@exo/frontend-features-dev-toolbar-extension-playground'),
  {
    resolveComponent: loaded => loaded.PlaygroundLink
  }
);

const SessionInfo = loadable(() => import('@exo/frontend-features-dev-toolbar-extension-session'), {
  resolveComponent: loaded => loaded.SessionInfo
});

const ToggleGrid = loadable(() => import('@exo/frontend-features-dev-toolbar-extension-grid'), {
  resolveComponent: loaded => loaded.ToggleGrid
});

const ResourceWidget = loadable(
  () => import('@exo/frontend-features-dev-toolbar-extension-resources'),
  {
    resolveComponent: loaded => loaded.ResourceWidget
  }
);

const ThemeSwitcher = loadable(() => import('@exo/frontend-features-dev-toolbar-extension-theme'), {
  resolveComponent: loaded => loaded.ThemeSwitcher
});

const ConfigSwitcher = loadable(
  () => import('@exo/frontend-features-dev-toolbar-extension-config-switch'),
  {
    resolveComponent: loaded => loaded.ConfigSwitcher
  }
);

export const devToolbarConfig: ApplicationConfig['featureConfig']['devToolbar'] = {
  widgets: [ThemeSwitcher, ConfigSwitcher, ToggleGrid, PlaygroundLink, SessionInfo, ResourceWidget]
};
