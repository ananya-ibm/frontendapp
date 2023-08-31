/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Provider } from './types';

export function BaseProviderContextProvider<P, C, E>({
  context,
  value,
  children,
  components,
  configuration
}: Props<P, C, E>) {
  const { Provider: ProviderComponent } = context;

  return (
    <ProviderComponent
      value={{
        ...(value as any),
        components,
        configuration
      }}
    >
      {children}
    </ProviderComponent>
  );
}

type Props<P, C, E> = {
  context: React.Context<Provider<P, C, E> | undefined>;
  components?: P;
  configuration?: C;
  value?: E;
  children?: any;
};
