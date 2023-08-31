/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

export * from './AemCmsContext';
export * from './components/CmsSpotComponent';

export * from './components/useChildComponents';
export * from './components/useAuthorPanelSwitch';
export * from './components/useEditorMode';

export * from './components/types';

declare global {
  interface EXOCmsConfig {
    aem?: {
      path?: string;
      siteName?: string;
      apiHost?: string;
      gridCss?: string;
      loadingDepth?: number;
    };
  }

  interface EXOCmsComponentConfig {
    aem?: {
      name: string;
      minimumProps: string[];
      emptyLabel?: string;
    };
  }
}
