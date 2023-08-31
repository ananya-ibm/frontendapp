/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Utils, withMappable } from '@adobe/aem-react-editable-components';
import { useOriginalLocation } from '@exo/frontend-common-app-shell';
import { CmsProviders } from '@exo/frontend-content-api-types';
import { useCmsContext } from '@exo/frontend-content-api';
import { useRef } from 'react';
import { useSpotsContent } from './AemContexts';
import { CmsSpotComponent } from './components/CmsSpotComponent';
import { getAemAssetPathFromURL } from './PathUtils';
import { getSpotComponentResourceType } from './SpotUtils';

type CmsSpotType = NonNullable<CmsProviders['CmsSpot']>;

export const AemCmsSpot: CmsSpotType = ({ name, render }) => {
  const cmsContext = useCmsContext();
  const windowLocation = useOriginalLocation();

  // NOTE: We use a ref here in order *not* to create a new function for the component
  //       each time this component is rendered. This causes a number of issues with
  //       cleanup and unmount
  const mappedCmsSpotComponentRef = useRef(
    withMappable(CmsSpotComponent, {
      // TODO: Is there a need to improve isEmpty detection here
      isEmpty: () => false,
      resourceType: getSpotComponentResourceType(cmsContext?.configuration!)
    })
  );

  const MappedCmsSpotComponent = mappedCmsSpotComponentRef.current;

  const aemContentPath = getAemAssetPathFromURL(
    windowLocation.pathname,
    cmsContext?.configuration?.aem?.path!
  );

  const spots = useSpotsContent();
  if (!spots) return <></>;

  // Find spot with same name
  const spot = Object.entries(spots).find(([, v]) => v.spotName === name);
  if (!spot) return <></>;

  // In case of SSR, we need to load the props from the model
  // synchronously - as the adobe ModelProvider does it asynchronously, which
  // means no content is generated in SSR mode
  let props = {};
  const isSSR = typeof window === 'undefined';
  if (isSSR) {
    props = Utils.modelToProps(spot[1]);
  }

  return render(
    <MappedCmsSpotComponent
      // NOTE that we use key here to "force" a remount when pagePath or itemPath changes - this is because
      //      the AEM libraries are otherwise optimizing away any content changes
      key={`${aemContentPath}/${spot[0]}`}
      // @ts-ignore
      pagePath={aemContentPath}
      itemPath={spot[0]}
      {...props}
    />
  );
};
