/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme as render } from '@testUtils';
import { MegaMenu } from './MegaMenu';

const testProps = {
  isVisible: true,
  navItems: [
    {
      title: 'Men',
      text: 'Men',
      url: '/catalog/category/Men_2',
      type: undefined,
      thumbnail:
        'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSites…etStore/images/catalog/apparel/men/category/catr_app_men.png',
      description: 'Men',
      isDelimiter: false,
      children: [
        {
          title: 'Jackets',
          text: 'Jackets',
          url: '/catalog/category/Men-Jackets_10009',
          type: undefined,
          thumbnail:
            'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSites…ore/images/catalog/apparel/men/category/catr_mcl_jackets.png',
          description: 'Jackets',
          isDelimiter: false,
          children: []
        },
        {
          title: 'Shirts',
          text: 'Shirts',
          url: '/catalog/category/Men-Shirts_10010',
          type: undefined,
          thumbnail:
            'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSites…tore/images/catalog/apparel/men/category/catr_mcl_shirts.png',
          description: 'Shirts',
          isDelimiter: false,
          children: []
        },
        {
          title: 'Suits',
          text: 'Suits',
          url: '/catalog/category/Men-Suits_10011',
          type: undefined,
          thumbnail:
            'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSites…Store/images/catalog/apparel/men/category/catr_mcl_suits.png',
          description: 'Suits',
          isDelimiter: false,
          children: []
        },
        {
          title: 'Pants',
          text: 'Pants',
          url: '/catalog/category/Men-Pants_10012',
          type: undefined,
          thumbnail:
            'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSites…Store/images/catalog/apparel/men/category/catr_mcl_pants.png',
          description: 'Pants',
          isDelimiter: false,
          children: []
        },
        {
          title: 'Accessories',
          text: 'Accessories',
          url: '/catalog/category/Men-Accessories_10013',
          type: undefined,
          thumbnail:
            'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSites…images/catalog/apparel/men/category/catr_mac_accessories.png',
          description: 'Accessories',
          isDelimiter: false,
          children: []
        },
        {
          title: 'Shoes',
          text: 'Shoes',
          url: '/catalog/category/Men-Shoes_10014',
          type: undefined,
          thumbnail:
            'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSites…Store/images/catalog/apparel/men/category/catr_msh_shoes.png',
          description: 'Shoes',
          isDelimiter: false,
          children: []
        }
      ]
    },
    {
      title: 'Women',
      text: 'Women',
      url: '/catalog/category/Women_3',
      type: undefined,
      thumbnail:
        'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSites…ore/images/catalog/apparel/women/category/catr_app_women.png',
      description: 'Women',
      isDelimiter: false,
      children: [
        {
          title: 'Dresses',
          text: 'Dresses',
          url: '/catalog/category/Dresses_10001',
          type: undefined,
          thumbnail:
            'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSites…e/images/catalog/apparel/women/category/catr_wcl_dresses.png',
          description: 'Dresses',
          isDelimiter: false,
          children: []
        },
        {
          title: 'Blouses',
          text: 'Blouses',
          url: '/catalog/category/Women-Shirts-Blouses_10002',
          type: undefined,
          thumbnail:
            'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSites…e/images/catalog/apparel/women/category/catr_wcl_blouses.png',
          description: 'Blouses',
          isDelimiter: false,
          children: []
        },
        {
          title: 'Sweaters',
          text: 'Sweaters',
          url: '/catalog/category/Women-Sweaters_10003',
          type: undefined,
          thumbnail:
            'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSites…/images/catalog/apparel/women/category/catr_wcl_sweaters.png',
          description: 'Sweaters',
          isDelimiter: false,
          children: []
        },
        {
          title: 'Skirts',
          text: 'Skirts',
          url: '/catalog/category/Women-Skirts_10004',
          type: undefined,
          thumbnail:
            'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSites…re/images/catalog/apparel/women/category/catr_wcl_skirts.png',
          description: 'Skirts',
          isDelimiter: false,
          children: []
        },
        {
          title: 'Pants',
          text: 'Pants',
          url: '/catalog/category/Women-Pants_10005',
          type: undefined,
          thumbnail:
            'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSites…ore/images/catalog/apparel/women/category/catr_wcl_pants.png',
          description: 'Pants',
          isDelimiter: false,
          children: []
        },
        {
          title: 'Shoes',
          text: 'Shoes',
          url: '/catalog/category/Women-Shoes_10006',
          type: undefined,
          thumbnail:
            'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSites…ore/images/catalog/apparel/women/category/catr_wsh_shoes.png',
          description: 'Shoes',
          isDelimiter: false,
          children: []
        },
        {
          title: 'Handbags',
          text: 'Handbags',
          url: '/catalog/category/Women-Handbags_10007',
          type: undefined,
          thumbnail:
            'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSites…/images/catalog/apparel/women/category/catr_wbg_handbags.png',
          description: 'Handbags',
          isDelimiter: false,
          children: []
        },
        {
          title: 'Accessories',
          text: 'Accessories',
          url: '/catalog/category/Women-Accessories_10008',
          type: undefined,
          thumbnail:
            'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSites…ages/catalog/apparel/women/category/catr_wac_accessories.png',
          description: 'Accessories',
          isDelimiter: false,
          children: []
        }
      ]
    },
    {
      title: 'Boys',
      text: 'Boys',
      url: '/catalog/category/Boys_4',
      type: undefined,
      thumbnail:
        'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSites…Store/images/catalog/apparel/boys/category/catr_app_boys.png',
      description: 'boys',
      isDelimiter: false,
      children: [
        {
          title: 'Pants',
          text: 'Pants',
          url: '/catalog/category/Boys-Pants_10019',
          type: undefined,
          thumbnail:
            'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSites…tore/images/catalog/apparel/boys/category/catr_bcl_pants.png',
          description: 'Pants',
          isDelimiter: false,
          children: []
        },
        {
          title: 'Tops',
          text: 'Tops',
          url: '/catalog/category/Boys-Tops_10020',
          type: undefined,
          thumbnail:
            'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSites…Store/images/catalog/apparel/boys/category/catr_bcl_tops.png',
          description: 'Tops',
          isDelimiter: false,
          children: []
        },
        {
          title: 'Shoes',
          text: 'Shoes',
          url: '/catalog/category/Boys-Shoes_10021',
          type: undefined,
          thumbnail:
            'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSites…tore/images/catalog/apparel/boys/category/catr_bsh_shoes.png',
          description: 'Shoes',
          isDelimiter: false,
          children: []
        }
      ]
    },
    {
      title: 'Girls',
      text: 'Girls',
      url: '/catalog/category/Girls_5',
      type: undefined,
      thumbnail:
        'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSites…ore/images/catalog/apparel/girls/category/catr_app_girls.png',
      description: 'Girls',
      isDelimiter: false,
      children: [
        {
          title: 'Shoes',
          text: 'Shoes',
          url: '/catalog/category/Girls-Shoes_10015',
          type: undefined,
          thumbnail:
            'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSites…ore/images/catalog/apparel/girls/category/catr_gsh_shoes.png',
          description: 'Shoes',
          isDelimiter: false,
          children: []
        },
        {
          title: 'Pants',
          text: 'Pants',
          url: '/catalog/category/Girls-Pants_10016',
          type: undefined,
          thumbnail:
            'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSites…ore/images/catalog/apparel/girls/category/catr_gcl_pants.png',
          description: 'Pants',
          isDelimiter: false,
          children: []
        },
        {
          title: 'Skirts',
          text: 'Skirts',
          url: '/catalog/category/Girls-Dresses-Skirts_10017',
          type: undefined,
          thumbnail:
            'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSites…re/images/catalog/apparel/girls/category/catr_gcl_skirts.png',
          description: 'Skirts',
          isDelimiter: false,
          children: []
        },
        {
          title: 'Tops',
          text: 'Tops',
          url: '/catalog/category/Girls-Tops_10018',
          type: undefined,
          thumbnail:
            'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSites…tore/images/catalog/apparel/girls/category/catr_gcl_tops.png',
          description: 'Tops',
          isDelimiter: false,
          children: []
        }
      ]
    }
  ]
};

describe('<MegaMenu /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<MegaMenu {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
});
