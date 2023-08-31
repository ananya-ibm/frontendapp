/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useCmsContext } from '@exo/frontend-content-api';
import { CmsProviders } from '@exo/frontend-content-api-types';
import { useContainerContext } from './SampleCmsContainer';
import { findMatchingEntry, findMatchingSpot, makeComponents } from './utils';

type CmsSpotType = NonNullable<CmsProviders['CmsSpot']>;

export const SampleCmsSpot: CmsSpotType = ({ children, name, spec, render }) => {
  const ctx = useCmsContext();
  const container = useContainerContext();

  const matchingContentEntry = findMatchingEntry(ctx?.configuration?.sample ?? {}, container.name, container.spec);
  const matchingSpot = findMatchingSpot(matchingContentEntry, name, spec);

  if (matchingSpot && matchingSpot.content) {
    return render!(makeComponents(matchingSpot.content, ctx?.configuration?.components ?? []))
  }

  return render!(children);
};
