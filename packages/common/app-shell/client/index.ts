/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { RewriteRule } from './rewrite/types';

export { Link } from './components/AppShellLink/AppShellLink';
export * from './components/AppShellSwitch/AppShellSwitch';
export * from './components/PermittedRoute/PermittedRoute';
export * from './components/ExtensionNode/ExtensionNode';
export * from './context/AppShellApolloProvider';
export * from './context/AppShellContext';
export * from './permissions/isPermitted';
export * from './utils/applicationConfigHelper';

export { RewriteEngine } from './rewrite/rewriteEngine';

declare global {
  interface EXOFeatureConfig {}
}

export type Extension =
  | ((props?: any) => React.ReactElement)
  | ((props?: any) => React.ReactElement)[];

export type Extensions<Keys extends keyof any> = {
  [k in Keys]: Extension;
};

export type WithSeoRewrites<T> = {
  seoRewrites?: RewriteRule[];
} & T;