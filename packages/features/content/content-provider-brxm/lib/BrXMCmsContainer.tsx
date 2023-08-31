/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { CmsProviders } from '@exo/frontend-content-api-types';
import { useCmsContext } from '@exo/frontend-content-api';
import { BrPage, BrPageContext } from '@bloomreach/react-sdk';
import { Banner } from './BrXMBanner';

type CmsContainerType = NonNullable<CmsProviders['CmsContainer']>;


export const BrXMCmsContainer: CmsContainerType = ({ children }) => {
  const cmsContext = useCmsContext();

  const brxmComponentMappingMap = cmsContext?.configuration?.components.map(compEntry => ([compEntry.name, compEntry.component ]));

  /* @ts-ignore */
  const brxmComponentMapping = Object.fromEntries(brxmComponentMappingMap);
  /* @ts-ignore */
  const brxmConfiguration = cmsContext?.configuration?.brxm;
  console.log({ Banner, ...brxmComponentMapping });


  // Hacked as only data in cms is on homepage, this should be const pathforConfig = `$[location.pathname]${location.search}`
  const pathforConfig= '/';

   /* @ts-ignore */ /* issue with BRXM SPA SDK */
  return <BrPage mapping={{ Banner, ...brxmComponentMapping }} configuration={{ path: pathforConfig, ...brxmConfiguration }}>
      {children}
      <BrPageContext.Consumer>
          { page => (
            <span>
              { page!.getTitle() || 'brXM + React = ♥️'}
            </span>
          ) }
        </BrPageContext.Consumer>
    </BrPage>;
};
