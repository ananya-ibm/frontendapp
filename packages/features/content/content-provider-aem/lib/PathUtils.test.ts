/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { getAemAssetPathFromURL } from './PathUtils';

const AEM_ROOT = '/content/exo/en/site_root';

describe('PathUtils', () => {
  describe('getAemAssetPathFromURL', () => {
    test('it converts EXO public URL', () => {
      expect(getAemAssetPathFromURL('/content/pages/hello', AEM_ROOT)).toEqual(
        `${AEM_ROOT}/content/pages/hello`
      );
      expect(getAemAssetPathFromURL('/home/homepage', AEM_ROOT)).toEqual(
        `${AEM_ROOT}/home/homepage`
      );
      expect(getAemAssetPathFromURL('/catalog/category/Apparel', AEM_ROOT)).toEqual(
        `${AEM_ROOT}/catalog/category/Apparel`
      );
    });

    test('it handles regular content URLs in AEM', () => {
      expect(getAemAssetPathFromURL(`${AEM_ROOT}/home/homepage.html`, AEM_ROOT)).toEqual(
        `${AEM_ROOT}/home/homepage`
      );
    });

    test('it handles template URLs in AEM', () => {
      expect(
        getAemAssetPathFromURL(
          '/conf/carbon-commerce-ssr/settings/wcm/templates/carbon-commer-ssr-item-page-template/structure.html',
          AEM_ROOT
        )
      ).toEqual(
        '/conf/carbon-commerce-ssr/settings/wcm/templates/carbon-commer-ssr-item-page-template/structure'
      );
    });
  });
});
