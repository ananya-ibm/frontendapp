/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { ComponentType } from 'react';
import { RewriteRule } from '../rewrite/types';

export type Applications = {
  bundles: {
    id: string;
    url?: string;
    modules: Record<string, Module | Boolean>;
  }[];
  redirects?: Record<string, string>;
  rewrite?: RewriteRule[];
  appWrapper: AppRootType;
};

export type AppRootType = (props: { children: any; config: any }) => React.ReactElement;

type Module = ComponentType<{ config?: any }>;

export const getConfigForPath = (
  applications: Applications,
  bundle = process.env.APP_SHELL_BUNDLE ?? 'ROOT',
  otherBundles = process.env.APP_SHELL_OTHER_BUNDLES?.split(',') ?? ([] as string[])
) => {
  const bundles = applications?.bundles ?? [{ name: 'ROOT', modules: {} }];

  const currentBundle = bundles.find(b => b.id === bundle)!;

  const modulesInApp: Record<string, Module | string> = {};
  for (const [name, module] of Object.entries(currentBundle.modules ?? {})) {
    if (typeof module === 'boolean')
      throw new Error('Active bundle can only contain local modules');
    modulesInApp[name] = module as Module;
  }

  const externalModules: Record<string, string> = {};
  applications?.bundles
    .filter(b => b !== currentBundle)
    .filter(b => otherBundles.includes(b.id))
    .forEach(b => {
      for (const [prefix, m] of Object.entries(b.modules)) {
        if (!externalModules[prefix] && !!m) {
          externalModules[prefix] = b.url!;
        }
      }
    });

  return {
    modulesInApp,
    externalModules,
    redirects: applications?.redirects ?? {},
    rewrite: applications?.rewrite ?? []
  };
};
