/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CmsProviders } from '@exo/frontend-content-api-types';
import { useCmsContext } from '@exo/frontend-content-api';
import { mapRequest, mapResponse } from './mapper';

const ContentfulContainerContext = React.createContext<any>(undefined);

export const useContainerContext = () => {
  return useContext(ContentfulContainerContext);
};

type Content = {
  loaded: boolean;
  notFound?: boolean;
  spec: Record<string, string>;
  content?: any;
};

type CmsContainerType = NonNullable<CmsProviders['CmsContainer']>;

const CONTAINER_CONTENT = 'content';

export const ContentfulCmsContainer: CmsContainerType = ({ name, spec, children }) => {
  const ctx = useCmsContext();
  const location = useLocation();
  const [content, setContent] = useState<Content>({ loaded: false, spec: {} });

  const activeSpec = { ...spec } ?? {};
  activeSpec.path = activeSpec.path ?? location.pathname;
  activeSpec.type = activeSpec.type ?? name;

  useEffect(() => {
    setContent({ loaded: false, spec: activeSpec });

    const request = mapRequest(activeSpec, ctx?.configuration!);
    if (!request) {
      setContent({ loaded: true, notFound: true, spec: activeSpec });
      return;
    }

    ctx?.contentful!.api.getEntries(request).then(entries => {
      setContent({
        spec: activeSpec,
        loaded: true,
        content: mapResponse(entries, ctx?.configuration!)
      });
    });
  }, [JSON.stringify(activeSpec)]);

  if (!content || !content.loaded) {
    return <div>Loading...</div>;
  }

  if (content.notFound) {
    return children;
  }

  if (content.content[CONTAINER_CONTENT]) {
    const c = content.content[CONTAINER_CONTENT];
    if (Array.isArray(c)) {
      return c.map((cc, idx) => React.createElement(cc._component, { ...cc, key: idx }));
    } else {
      return React.createElement(c._component, c);
    }
  }

  return (
    <ContentfulContainerContext.Provider value={content.content}>
      {children}
    </ContentfulContainerContext.Provider>
  );
};
