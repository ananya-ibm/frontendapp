/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { ApolloClient } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { RewriteEngine } from '../rewrite/rewriteEngine';
import { RewriteRule } from '../rewrite/types';
import { Applications } from '../utils/applicationConfigHelper';

export type ApplicationConfig = {
  featureConfig: EXOFeatureConfig;

  // NOTE: This is to work-around a serialization bug in Storybook
  //       Instead of being the client directly, we need to add
  //       a level of indirection
  client: () => ApolloClient<any>;
} & Applications;

type AppShellContextType = ApplicationConfig & {
  repaint: () => void;
  patchConfig: (name: string | undefined, config: Partial<ApplicationConfig>) => void;
  version: number;
  patchName: string | undefined;
  rewriteEngine: RewriteEngine;
};

export const AppShellContext = React.createContext<AppShellContextType | undefined>(undefined);

export const useAppShellContext = () => {
  const context = useContext(AppShellContext);
  console.assert(!!context);
  return context!;
};

export const AppShellContextProvider = ({ children, config }: Props) => {
  const [version, setVersion] = useState(0);
  const [patch, setPatch] = useState<{
    name: string | undefined;
    patch: Partial<ApplicationConfig>;
  }>({
    name: undefined,
    patch: {}
  });
  const context = useContext(AppShellContext);
  if (context) return <>{children}</>;

  const rewriteRuleList : RewriteRule[] = [...(config?.rewrite ?? [])];

  // Add any rewriteRules found in in each feature
  Object.keys(config?.featureConfig ?? {}).forEach(feature => {
    const featureRewriteConf: RewriteRule[] = config.featureConfig[feature].seoRewrites;
    if (!featureRewriteConf) return;
  
    featureRewriteConf.forEach(e => rewriteRuleList.push(e));
  });

  return (
    <AppShellContext.Provider
      value={{
        ...config,
        ...patch.patch,
        rewriteEngine: new RewriteEngine(rewriteRuleList),
        patchName: patch.name,
        version,
        repaint: () => {
          setVersion(version + 1);
        },
        patchConfig: (name, p) => setPatch({ name, patch: p })
      }}
    >
      {children}
    </AppShellContext.Provider>
  );
};

type Props = {
  children: any;
  config: ApplicationConfig;
};
