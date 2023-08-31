/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable consistent-return, no-restricted-syntax, react/prop-types, no-unused-vars */

import React, { useState, useEffect } from 'react';
import { MapTo, Page, withComponentMappingContext } from '@adobe/aem-react-editable-components';
import { ComponentMapping } from '@adobe/aem-spa-component-mapping';
import {
  ModelManager,
  PathUtils as AEMPathUtils,
  PathUtils
} from '@adobe/aem-spa-page-model-manager';
import { CmsComponent, CmsProviderContextProvider } from '@exo/frontend-content-api-types';
import { BaseProviderContextProvider } from '@exo/frontend-common-provider';
import { useOriginalLocation } from '@exo/frontend-common-app-shell';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { useTheme } from 'styled-components';
import { getAemAssetPathFromURL } from './PathUtils';
import { AemCmsContainer } from './AemCmsContainer';
import { withErrorBoundary } from './withErrorBoundary';
import { addStylesheet, addStylesheetLink, setMetaProperty } from './HtmlHeadUtils';
import { monkeyPatchWindowForStateChangeEvents } from './DomWindowUtils';
import { AemCmsSpot } from './AemCmsSpot';
import { AemContainerContentContext } from './AemContexts';
import { useEffectOnce } from '@exo/frontend-common-hooks';

const EXOModelManager = ModelManager as typeof ModelManager & {
  initialized?: boolean;
};

monkeyPatchWindowForStateChangeEvents();

const loadAemContentIfNeeded = (
  url,
  pathLoaded,
  setPathLoaded,
  loadedCallback,
  aemRoot,
  loadingDepth
) => {
  const aemPath = getAemAssetPathFromURL(url, aemRoot);
  if (EXOModelManager.modelStore.getData(aemPath) === undefined) {
    let shouldBeInModel = false;
    for (const root of pathLoaded) {
      if (aemPath.startsWith(`${root}/`)) {
        const depth = aemPath.substring(root.length + 1).split('/').length;
        if (depth <= loadingDepth) shouldBeInModel = true;
      }
    }
    if (!shouldBeInModel) {
      // eslint-disable-next-line no-console
      console.log(`AEM: Loading CMS content for path ${aemPath}`);
      // TODO: Should we load at this level, or should we load a couple of levels up
      EXOModelManager.getData(aemPath)
        .then(d => {
          EXOModelManager.modelStore.setData(aemPath, d);
          setPathLoaded([...pathLoaded, aemPath]);
          loadedCallback(d);
        })
        .catch(() => {
          // eslint-disable-next-line no-console
          console.warn(`CMS content for path ${aemPath} not found`);
          setPathLoaded([...pathLoaded, aemPath]);
          loadedCallback(undefined);
        });
    } else {
      loadedCallback(undefined);
    }
  } else {
    loadedCallback(EXOModelManager.modelStore.getData(aemPath));
  }
};

const registerComponent = (
  aemComponentName: string,
  component,
  siteName: string,
  entry: CmsComponent | undefined
) => {
  const mapped = !!ComponentMapping.instance.get(aemComponentName);
  if (mapped) {
    // eslint-disable-next-line no-console
    console.warn(`AEM: Attempting to register ${siteName}/${aemComponentName} twice`);
  } else {
    // eslint-disable-next-line no-console
    const path = aemComponentName.startsWith('/')
      ? aemComponentName.substring(1)
      : `${siteName}/${aemComponentName}`;

    // eslint-disable-next-line no-console
    console.log(`AEM: Registering ${path} component=${component ? '[Function]' : ''} `);

    MapTo(path)(
      component,
      entry && entry?.aem?.minimumProps
        ? {
            isEmpty: props => {
              return (
                !!entry?.aem?.minimumProps &&
                !entry?.aem?.minimumProps.every(
                  p => props[p] && props[p].toString().trim().length > 0
                )
              );
            },
            emptyLabel: entry?.aem?.emptyLabel ?? entry?.name ?? aemComponentName
          }
        : undefined
    );
  }
};

export const CmsContextProvider: CmsProviderContextProvider = ({
  configuration,
  context,
  children
}) => {
  const windowLocation = useOriginalLocation();

  const [isModelManagerInitialized, setModelManagerInitialized] = useState<boolean>(false);
  const [pathLoaded, setPathLoaded] = useState<string[]>([]);

  const currentTheme = useTheme();

  useEffect(() => {
    loadAemContentIfNeeded(
      windowLocation.pathname,
      pathLoaded,
      setPathLoaded,
      model => {
        AEMPathUtils.dispatchGlobalCustomEvent('cq-pagemodel-route-changed', {
          detail: {
            model
          }
        });
        setModelManagerInitialized(true);
      },
      configuration.aem!.path,
      configuration.aem!.loadingDepth
    );
  }, [windowLocation.pathname]);

  useEffectOnce(() => {
    setMetaProperty('cq:pagemodel_router', 'disabled');
    addStylesheetLink(configuration.aem!.gridCss!);

    // TODO: Align with grid
    addStylesheet(
      'aem-extension',
      `.aem-GridColumn > *:last-child { margin-bottom: ${currentTheme?.spacing.stack.s7 ??
        '1rem'}; }`
    );
  });

  const isSSR = typeof window === 'undefined';
  if (!isModelManagerInitialized && !isSSR) {
    return <div>Loading AEM content...</div>;
  }

  return (
    <BaseProviderContextProvider
      components={{
        CmsContainer: AemCmsContainer,
        CmsSpot: AemCmsSpot
      }}
      value={{}}
      context={context}
      configuration={configuration}
    >
      <AemContainerContentContext.Provider value={ModelManager?.modelStore?.getData()}>
        {children}
      </AemContainerContentContext.Provider>
    </BaseProviderContextProvider>
  );
};

CmsContextProvider.globalCmsInit = config => {
  if (!config.featureConfig.content || !config.featureConfig.content.aem) return;

  const aemConfig = config.featureConfig.content!.aem;

  registerComponent(
    'components/structure/page',
    withComponentMappingContext(Page),
    aemConfig!.siteName!,
    undefined
  );
  for (const entry of config.featureConfig.content.components) {
    const component = withErrorBoundary(entry.name, entry.component);

    registerComponent(entry?.aem?.name || entry.name, component, aemConfig!.siteName!, entry);
  }

  if (PathUtils.isBrowser()) {
    const ssrStateTag = document.getElementById('__AEM_STATE__');
    if (ssrStateTag) {
      ModelManager.initialize({
        model: JSON.parse(ssrStateTag?.innerHTML!).rootModel
      });
      ssrStateTag.remove();
    } else {
      ModelManager.initializeAsync(aemConfig.path!);
    }
  }
};

CmsContextProvider.ssrInit = async (config, requestedUrl) => {
  console.assert(config.featureConfig.content!.aem);

  const pagePath = `${config.featureConfig.content!.aem!.path!}${
    new URL(`http://dummy${requestedUrl}`).pathname
  }`;
  const path = pagePath;
  const url = `${config.featureConfig.content!.aem!.apiHost!}${path}.model.json`;
  const res = await fetch(url, { credentials: 'same-origin' });
  const resAsJson = await res.json();

  await ModelManager.initialize({
    path,
    model: resAsJson
  });

  return () => {
    const state = {
      rootModel: resAsJson,
      rootModelUrl: ModelManager.rootPath,
      pagePath
    };
    const stateStr = JSON.stringify(state);
    return `<script type="application/json" id="__AEM_STATE__">${stateStr}</script>`;
  };
};

CmsContextProvider.ssrInitAdditionalRoutes = (config, app) => {
  // TODO: We might want to add additional patterns here...
  //       But it's important that it doesn't overlap with the /content feature
  const contentProxy = createProxyMiddleware(
    [config.featureConfig.content?.aem?.path!, '/content/dam'],
    {
      target: config.featureConfig.content?.aem?.apiHost!
    }
  );
  app.use(contentProxy);
};
