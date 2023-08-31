/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Constants } from '@adobe/aem-spa-page-model-manager';
import React, { useContext } from 'react';
import { CmsProviders } from '@exo/frontend-content-api-types';
import { useCmsContext } from '@exo/frontend-content-api';
import { Page, withEditorContext, EditorContext } from '@adobe/aem-react-editable-components';
import { useOriginalLocation } from '@exo/frontend-common-app-shell';
import { getAemAssetPathFromURL } from './PathUtils';
import { getSpotComponentResourceType, getSpots } from './SpotUtils';
import { AemSpotsContext, useContainerContent } from './AemContexts';

type CmsContainerType = NonNullable<CmsProviders['CmsContainer']>;

const EditablePage = withEditorContext(Page);

// Need to clone the content and remove any :children prop, as this will not render
// correctly using our routing logic
// The issue is that multiple pages of content is rendered on one page under certain
// circumstances
const withoutChildren = (content: any) => {
  if (!content) return content;
  return JSON.parse(JSON.stringify(content, (k, v) => (k === ':children' ? [] : v)));
};

export const AemCmsContainer: CmsContainerType = ({ children }) => {
  const editorContext = useContext(EditorContext);
  const cmsContext = useCmsContext();
  const windowLocation = useOriginalLocation();

  const aemContentPath = getAemAssetPathFromURL(
    windowLocation.pathname,
    cmsContext?.configuration?.aem?.path!
  );

  // Default to children in case AEM is not initialized
  const content = useContainerContent();
  if (!content) return children;

  // AEM content is either found in the root, or as one of the children, depending on exactly how the
  // content has been fetched
  let childrenProp = {};
  if (content[':path'] === aemContentPath) {
    childrenProp = { [aemContentPath]: withoutChildren(content) };
  } else {
    childrenProp = {
      [aemContentPath]: withoutChildren(content[Constants.CHILDREN_PROP]?.[aemContentPath])
    };
  }

  // Handle the case when there is no content
  if (!childrenProp[aemContentPath]) {
    if (editorContext) {
      return (
        <div>
          <div style={{ border: '3px solid red', margin: '1rem', padding: '1rem' }}>
            This page is editable, but there's no corresponding page in AEM. Please create the page
            "{aemContentPath}" to edit this page
          </div>
          {children}
        </div>
      );
    } else {
      return children;
    }
  }

  // In case there are CMS Spots in the data, render content as spots rather than
  // replacing the whole container. Also, when within the template section (starts with /conf)
  // we cannot render the spots separately
  // Note: We might want to improve this logic to look at properties of the page or similar
  if (cmsContext?.configuration && !windowLocation.pathname.startsWith('/conf')) {
    const spotResourceType = getSpotComponentResourceType(cmsContext?.configuration!);
    if (spotResourceType) {
      const spots = getSpots(childrenProp[aemContentPath], '', spotResourceType!);

      if (Object.values(spots).length > 0) {
        return <AemSpotsContext.Provider value={spots}>{children}</AemSpotsContext.Provider>;
      }
    }
  }

  // Otherwise, we treat the "whole" page as AEM contentn
  return (
    <EditablePage
      cqChildren={childrenProp}
      cqItems={{}}
      cqItemsOrder={[]}
      cqPath={aemContentPath}
    />
  );
};
