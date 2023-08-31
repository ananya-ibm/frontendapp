/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useContext } from 'react';
import loadable from '@loadable/component';
import { ApplicationConfig, Extension } from '@exo/frontend-common-app-shell';

export const DevContext = React.createContext(undefined);

export const useDevContext = () => {
  return useContext(DevContext);
};

declare global {
  interface EXOFeatureConfig {
    devToolbar?: {
      widgets: Extension;
    };
  }
}

const Toolbar = loadable(() => import('@exo/frontend-features-dev-toolbar-ui'), {
  resolveComponent: loaded => loaded.DevToolbar
});

export const DevContextProvider = ({ children, config }: Props) => {
  // NOTE: This needs to be checking process.env directory for
  //       code not to be deployed as part of bundle in production mode
  // @ts-ignore
  if (process.env.NODE_ENV !== 'development') return children;
  if (!config.featureConfig.devToolbar?.widgets) return children;
  if (process.env.DEVMODE_TOOLBAR === 'hidden' || !process.env.DEVMODE_TOOLBAR) return children;

  return (
    <DevContext.Provider value={undefined}>
      <Toolbar config={config} />
      {children}
    </DevContext.Provider>
  );
};

type Props = {
  children: any;
  config: ApplicationConfig;
};
