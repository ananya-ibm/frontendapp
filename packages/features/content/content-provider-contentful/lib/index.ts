/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { ContentfulClientApi } from 'contentful';

export * from './ContentfulCmsContext';

declare global {
  interface EXOCmsContext {
    contentful?: {
      api: ContentfulClientApi;
    };
  }

  interface EXOCmsConfig {
    contentful?: {
      space: string;
      accessToken: string;
      pageTypes: {
        contentTypeId: string;
        matchFn: (spec: Record<string, string>) => boolean;
        queryFn: (spec: Record<string, string>) => Record<string, string>;

        // TOOD: Add ability to handle full page (without slots)
        // isFullPage?: boolean;
      }[];
    };
  }

  interface EXOCmsComponentConfig {
    contentful?: {
      contentTypeId?: string;
      propFn?: (a: any) => any;
    };
  }
}
