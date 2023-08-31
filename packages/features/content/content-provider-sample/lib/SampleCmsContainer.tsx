/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useCmsContext } from '@exo/frontend-content-api';
import { CmsProviders } from '@exo/frontend-content-api-types';
import React, { useContext } from 'react';
import { findMatchingEntry, makeComponents } from './utils';

type ContainerData = {
  name: string;
  spec: any;
}

const ContainerContext = React.createContext<ContainerData>({ name: '', spec: {} });

export const useContainerContext = () => {
  return useContext(ContainerContext);
}

type CmsContainerType = NonNullable<CmsProviders['CmsContainer']>;

export const SampleCmsContainer: CmsContainerType = ({ children, name, spec }) => {
  const ctx = useCmsContext();

  const matchingContentEntry = findMatchingEntry(ctx?.configuration?.sample ?? {}, name, spec);
  // TODO: Find a way to get rid of these @ts-ignore
  // @ts-ignore
  if (matchingContentEntry && matchingContentEntry.content) {
    // @ts-ignore
    return <>{makeComponents(matchingContentEntry.content, ctx?.configuration?.components ?? [])}</>;
  }

  return <ContainerContext.Provider value={{ name, spec }}>{children}</ContainerContext.Provider>;
};
