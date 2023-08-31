/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { CmsProviders } from '@exo/frontend-content-api-types';
import { BrComponent } from '@bloomreach/react-sdk';

type CmsSpotType = NonNullable<CmsProviders['CmsSpot']>;

// note here that name is used rather than path for consistency with EXO, not BR
export const BrXMCmsSpot: CmsSpotType = ({ children, name }) => {
  // TODO: Fix this as soon as @bloomreach/react-sdk supports react 18
  // @ts-ignore React 18
  return <BrComponent path={name}>{children}</BrComponent>;
};
