/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

export default {
  Query: {
    navRoot: () => {
      return {
        __typename: 'NavRoot',
        children: [
          {
            __typename: 'NavContentNode',
            title: 'Apparel',
            thumbnail:
              'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/apparel/women/category/catr_wcl_pants.png',
            description: 'The latest styles for the entire family.',
            type: null,
            link: {
              __typename: 'NavCategoryLink',
              label: 'Apparel',
              category: {
                id: '1',
                identifier: 'Apparel',
                slug: 'Apparel',
                __typename: 'CatCategory'
              }
            },
            children: [
              {
                __typename: 'NavContentNode',
                title: 'Men',
                thumbnail:
                  'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/apparel/men/category/catr_app_men.png',
                description: 'Men',
                type: null,
                link: {
                  __typename: 'NavCategoryLink',
                  label: 'Men',
                  category: {
                    id: '2',
                    identifier: 'Men',
                    slug: 'Men',
                    __typename: 'CatCategory'
                  }
                },
                children: [
                  {
                    __typename: 'NavContentNode',
                    title: 'Jackets',
                    thumbnail:
                      'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/apparel/men/category/catr_mcl_jackets.png',
                    description: 'Jackets',
                    type: null,
                    link: {
                      __typename: 'NavCategoryLink',
                      label: 'Jackets',
                      category: {
                        id: '10009',
                        identifier: 'Men Jackets',
                        slug: 'Men Jackets',
                        __typename: 'CatCategory'
                      }
                    }
                  },
                  {
                    __typename: 'NavContentNode',
                    title: 'Shirts',
                    thumbnail:
                      'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/apparel/men/category/catr_mcl_shirts.png',
                    description: 'Shirts',
                    type: null,
                    link: {
                      __typename: 'NavCategoryLink',
                      label: 'Shirts',
                      category: {
                        id: '10010',
                        identifier: 'Men Shirts',
                        slug: 'Men Shirts',
                        __typename: 'CatCategory'
                      }
                    }
                  },
                  {
                    __typename: 'NavContentNode',
                    title: 'Suits',
                    thumbnail:
                      'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/apparel/men/category/catr_mcl_suits.png',
                    description: 'Suits',
                    type: null,
                    link: {
                      __typename: 'NavCategoryLink',
                      label: 'Suits',
                      category: {
                        id: '10011',
                        identifier: 'Men Suits',
                        slug: 'Men Suits',
                        __typename: 'CatCategory'
                      }
                    }
                  },
                  {
                    __typename: 'NavContentNode',
                    title: 'Pants',
                    thumbnail:
                      'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/apparel/men/category/catr_mcl_pants.png',
                    description: 'Pants',
                    type: null,
                    link: {
                      __typename: 'NavCategoryLink',
                      label: 'Pants',
                      category: {
                        id: '10012',
                        identifier: 'Men Pants',
                        slug: 'Men Pants',
                        __typename: 'CatCategory'
                      }
                    }
                  },
                  {
                    __typename: 'NavContentNode',
                    title: 'Accessories',
                    thumbnail:
                      'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/apparel/men/category/catr_mac_accessories.png',
                    description: 'Accessories',
                    type: null,
                    link: {
                      __typename: 'NavCategoryLink',
                      label: 'Accessories',
                      category: {
                        id: '10013',
                        identifier: 'Men Accessories',
                        slug: 'Men Accessories',
                        __typename: 'CatCategory'
                      }
                    }
                  },
                  {
                    __typename: 'NavContentNode',
                    title: 'Shoes',
                    thumbnail:
                      'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/apparel/men/category/catr_msh_shoes.png',
                    description: 'Shoes',
                    type: null,
                    link: {
                      __typename: 'NavCategoryLink',
                      label: 'Shoes',
                      category: {
                        id: '10014',
                        identifier: 'Men Shoes',
                        slug: 'Men Shoes',
                        __typename: 'CatCategory'
                      }
                    }
                  }
                ]
              },
              {
                __typename: 'NavContentNode',
                title: 'Women',
                thumbnail:
                  'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/apparel/women/category/catr_app_women.png',
                description: 'Women',
                type: null,
                link: {
                  __typename: 'NavCategoryLink',
                  label: 'Women',
                  category: {
                    id: '3',
                    identifier: 'Women',
                    slug: 'Women',
                    __typename: 'CatCategory'
                  }
                },
                children: [
                  {
                    __typename: 'NavContentNode',
                    title: 'Dresses',
                    thumbnail:
                      'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/apparel/women/category/catr_wcl_dresses.png',
                    description: 'Dresses',
                    type: null,
                    link: {
                      __typename: 'NavCategoryLink',
                      label: 'Dresses',
                      category: {
                        id: '10001',
                        identifier: 'Dresses',
                        slug: 'Dresses',
                        __typename: 'CatCategory'
                      }
                    }
                  },
                  {
                    __typename: 'NavContentNode',
                    title: 'Blouses',
                    thumbnail:
                      'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/apparel/women/category/catr_wcl_blouses.png',
                    description: 'Blouses',
                    type: null,
                    link: {
                      __typename: 'NavCategoryLink',
                      label: 'Blouses',
                      category: {
                        id: '10002',
                        identifier: 'Women Shirts Blouses',
                        slug: 'Women Shirts Blouses',
                        __typename: 'CatCategory'
                      }
                    }
                  },
                  {
                    __typename: 'NavContentNode',
                    title: 'Sweaters',
                    thumbnail:
                      'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/apparel/women/category/catr_wcl_sweaters.png',
                    description: 'Sweaters',
                    type: null,
                    link: {
                      __typename: 'NavCategoryLink',
                      label: 'Sweaters',
                      category: {
                        id: '10003',
                        identifier: 'Women Sweaters',
                        slug: 'Women Sweaters',
                        __typename: 'CatCategory'
                      }
                    }
                  },
                  {
                    __typename: 'NavContentNode',
                    title: 'Skirts',
                    thumbnail:
                      'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/apparel/women/category/catr_wcl_skirts.png',
                    description: 'Skirts',
                    type: null,
                    link: {
                      __typename: 'NavCategoryLink',
                      label: 'Skirts',
                      category: {
                        id: '10004',
                        identifier: 'Women Skirts',
                        slug: 'Women Skirts',
                        __typename: 'CatCategory'
                      }
                    }
                  },
                  {
                    __typename: 'NavContentNode',
                    title: 'Pants',
                    thumbnail:
                      'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/apparel/women/category/catr_wcl_pants.png',
                    description: 'Pants',
                    type: null,
                    link: {
                      __typename: 'NavCategoryLink',
                      label: 'Pants',
                      category: {
                        id: '10005',
                        identifier: 'Women Pants',
                        slug: 'Women Pants',
                        __typename: 'CatCategory'
                      }
                    }
                  },
                  {
                    __typename: 'NavContentNode',
                    title: 'Shoes',
                    thumbnail:
                      'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/apparel/women/category/catr_wsh_shoes.png',
                    description: 'Shoes',
                    type: null,
                    link: {
                      __typename: 'NavCategoryLink',
                      label: 'Shoes',
                      category: {
                        id: '10006',
                        identifier: 'Women Shoes',
                        slug: 'Women Shoes',
                        __typename: 'CatCategory'
                      }
                    }
                  },
                  {
                    __typename: 'NavContentNode',
                    title: 'Handbags',
                    thumbnail:
                      'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/apparel/women/category/catr_wbg_handbags.png',
                    description: 'Handbags',
                    type: null,
                    link: {
                      __typename: 'NavCategoryLink',
                      label: 'Handbags',
                      category: {
                        id: '10007',
                        identifier: 'Women Handbags',
                        slug: 'Women Handbags',
                        __typename: 'CatCategory'
                      }
                    }
                  },
                  {
                    __typename: 'NavContentNode',
                    title: 'Accessories',
                    thumbnail:
                      'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/apparel/women/category/catr_wac_accessories.png',
                    description: 'Accessories',
                    type: null,
                    link: {
                      __typename: 'NavCategoryLink',
                      label: 'Accessories',
                      category: {
                        id: '10008',
                        identifier: 'Women Accessories',
                        slug: 'Women Accessories',
                        __typename: 'CatCategory'
                      }
                    }
                  }
                ]
              },
              {
                __typename: 'NavContentNode',
                title: 'Boys',
                thumbnail:
                  'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/apparel/boys/category/catr_app_boys.png',
                description: 'boys',
                type: null,
                link: {
                  __typename: 'NavCategoryLink',
                  label: 'Boys',
                  category: {
                    id: '4',
                    identifier: 'Boys',
                    slug: 'Boys',
                    __typename: 'CatCategory'
                  }
                },
                children: [
                  {
                    __typename: 'NavContentNode',
                    title: 'Pants',
                    thumbnail:
                      'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/apparel/boys/category/catr_bcl_pants.png',
                    description: 'Pants',
                    type: null,
                    link: {
                      __typename: 'NavCategoryLink',
                      label: 'Pants',
                      category: {
                        id: '10019',
                        identifier: 'Boys Pants',
                        slug: 'Boys Pants',
                        __typename: 'CatCategory'
                      }
                    }
                  },
                  {
                    __typename: 'NavContentNode',
                    title: 'Tops',
                    thumbnail:
                      'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/apparel/boys/category/catr_bcl_tops.png',
                    description: 'Tops',
                    type: null,
                    link: {
                      __typename: 'NavCategoryLink',
                      label: 'Tops',
                      category: {
                        id: '10020',
                        identifier: 'Boys Tops',
                        slug: 'Boys Tops',
                        __typename: 'CatCategory'
                      }
                    }
                  },
                  {
                    __typename: 'NavContentNode',
                    title: 'Shoes',
                    thumbnail:
                      'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/apparel/boys/category/catr_bsh_shoes.png',
                    description: 'Shoes',
                    type: null,
                    link: {
                      __typename: 'NavCategoryLink',
                      label: 'Shoes',
                      category: {
                        id: '10021',
                        identifier: 'Boys Shoes',
                        slug: 'Boys Shoes',
                        __typename: 'CatCategory'
                      }
                    }
                  }
                ]
              },
              {
                __typename: 'NavContentNode',
                title: 'Girls',
                thumbnail:
                  'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/apparel/girls/category/catr_app_girls.png',
                description: 'Girls',
                type: null,
                link: {
                  __typename: 'NavCategoryLink',
                  label: 'Girls',
                  category: {
                    id: '5',
                    identifier: 'Girls',
                    slug: 'Girls',
                    __typename: 'CatCategory'
                  }
                },
                children: [
                  {
                    __typename: 'NavContentNode',
                    title: 'Shoes',
                    thumbnail:
                      'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/apparel/girls/category/catr_gsh_shoes.png',
                    description: 'Shoes',
                    type: null,
                    link: {
                      __typename: 'NavCategoryLink',
                      label: 'Shoes',
                      category: {
                        id: '10015',
                        identifier: 'Girls Shoes',
                        slug: 'Girls Shoes',
                        __typename: 'CatCategory'
                      }
                    }
                  },
                  {
                    __typename: 'NavContentNode',
                    title: 'Pants',
                    thumbnail:
                      'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/apparel/girls/category/catr_gcl_pants.png',
                    description: 'Pants',
                    type: null,
                    link: {
                      __typename: 'NavCategoryLink',
                      label: 'Pants',
                      category: {
                        id: '10016',
                        identifier: 'Girls Pants',
                        slug: 'Girls Pants',
                        __typename: 'CatCategory'
                      }
                    }
                  },
                  {
                    __typename: 'NavContentNode',
                    title: 'Skirts',
                    thumbnail:
                      'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/apparel/girls/category/catr_gcl_skirts.png',
                    description: 'Skirts',
                    type: null,
                    link: {
                      __typename: 'NavCategoryLink',
                      label: 'Skirts',
                      category: {
                        id: '10017',
                        identifier: 'Girls Dresses Skirts',
                        slug: 'Girls Dresses Skirts',
                        __typename: 'CatCategory'
                      }
                    }
                  },
                  {
                    __typename: 'NavContentNode',
                    title: 'Tops',
                    thumbnail:
                      'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/apparel/girls/category/catr_gcl_tops.png',
                    description: 'Tops',
                    type: null,
                    link: {
                      __typename: 'NavCategoryLink',
                      label: 'Tops',
                      category: {
                        id: '10018',
                        identifier: 'Girls Tops',
                        slug: 'Girls Tops',
                        __typename: 'CatCategory'
                      }
                    }
                  }
                ]
              }
            ]
          },
          {
            __typename: 'NavContentNode',
            title: 'Electronics',
            thumbnail:
              'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/electronics/category/catr_cta_tablets.png',
            description: 'Electronics',
            type: null,
            link: {
              __typename: 'NavCategoryLink',
              label: 'Electronics',
              category: {
                id: '6',
                identifier: 'Electronics',
                slug: 'Electronics',
                __typename: 'CatCategory'
              }
            },
            children: [
              {
                __typename: 'NavContentNode',
                title: 'Accessories',
                thumbnail:
                  'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/electronics/category/catr_cac_accessories.png',
                description: 'Accessories',
                type: null,
                link: {
                  __typename: 'NavCategoryLink',
                  label: 'Accessories',
                  category: {
                    id: '10022',
                    identifier: 'Computers Accessories',
                    slug: 'Computers Accessories',
                    __typename: 'CatCategory'
                  }
                },
                children: []
              },
              {
                __typename: 'NavContentNode',
                title: 'Tablets',
                thumbnail:
                  'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/electronics/category/catr_cta_tablets.png',
                description: 'Tablets',
                type: null,
                link: {
                  __typename: 'NavCategoryLink',
                  label: 'Tablets',
                  category: {
                    id: '10023',
                    identifier: 'Computers Tablets',
                    slug: 'Computers Tablets',
                    __typename: 'CatCategory'
                  }
                },
                children: []
              },
              {
                __typename: 'NavContentNode',
                title: 'Laptops',
                thumbnail:
                  'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/electronics/category/catr_cla_laptops.png',
                description: 'Laptops',
                type: null,
                link: {
                  __typename: 'NavCategoryLink',
                  label: 'Laptops',
                  category: {
                    id: '10024',
                    identifier: 'Computers Laptops',
                    slug: 'Computers Laptops',
                    __typename: 'CatCategory'
                  }
                },
                children: []
              },
              {
                __typename: 'NavContentNode',
                title: 'Desktops',
                thumbnail:
                  'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/electronics/category/catr_cde_desktops.png',
                description: 'Desktops',
                type: null,
                link: {
                  __typename: 'NavCategoryLink',
                  label: 'Desktops',
                  category: {
                    id: '10025',
                    identifier: 'Computers Desktops',
                    slug: 'Computers Desktops',
                    __typename: 'CatCategory'
                  }
                },
                children: []
              },
              {
                __typename: 'NavContentNode',
                title: 'Components',
                thumbnail:
                  'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/electronics/category/catr_ccm_components.png',
                description: 'Components',
                type: null,
                link: {
                  __typename: 'NavCategoryLink',
                  label: 'Components',
                  category: {
                    id: '10026',
                    identifier: 'Computers Components',
                    slug: 'Computers Components',
                    __typename: 'CatCategory'
                  }
                },
                children: []
              }
            ]
          },
          {
            __typename: 'NavContentNode',
            title: 'Grocery',
            thumbnail:
              'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/grocery/category/catr_gda_dairy.png',
            description: 'Grocery',
            type: null,
            link: {
              __typename: 'NavCategoryLink',
              label: 'Grocery',
              category: {
                id: '7',
                identifier: 'Grocery',
                slug: 'Grocery',
                __typename: 'CatCategory'
              }
            },
            children: [
              {
                __typename: 'NavContentNode',
                title: 'Dairy',
                thumbnail:
                  'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/grocery/category/catr_gda_dairy.png',
                description: 'Dairy',
                type: null,
                link: {
                  __typename: 'NavCategoryLink',
                  label: 'Dairy',
                  category: {
                    id: '10027',
                    identifier: 'Dairy',
                    slug: 'Dairy',
                    __typename: 'CatCategory'
                  }
                },
                children: []
              },
              {
                __typename: 'NavContentNode',
                title: 'Fruit',
                thumbnail:
                  'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/grocery/category/catr_gfr_fruit.png',
                description: 'Fruit',
                type: null,
                link: {
                  __typename: 'NavCategoryLink',
                  label: 'Fruit',
                  category: {
                    id: '10028',
                    identifier: 'Fruit',
                    slug: 'Fruit',
                    __typename: 'CatCategory'
                  }
                },
                children: []
              },
              {
                __typename: 'NavContentNode',
                title: 'Meat',
                thumbnail:
                  'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/grocery/category/catr_gme_meat.png',
                description: 'Meat',
                type: null,
                link: {
                  __typename: 'NavCategoryLink',
                  label: 'Meat',
                  category: {
                    id: '10029',
                    identifier: 'Meat',
                    slug: 'Meat',
                    __typename: 'CatCategory'
                  }
                },
                children: []
              },
              {
                __typename: 'NavContentNode',
                title: 'Vegetables',
                thumbnail:
                  'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/grocery/category/catr_gve_vegetables.png',
                description: 'Vegetables',
                type: null,
                link: {
                  __typename: 'NavCategoryLink',
                  label: 'Vegetables',
                  category: {
                    id: '10030',
                    identifier: 'Vegetables',
                    slug: 'Vegetables',
                    __typename: 'CatCategory'
                  }
                },
                children: []
              }
            ]
          },
          {
            __typename: 'NavContentNode',
            title: 'Health',
            thumbnail:
              'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/health/category/catr_hme_medicine.png',
            description: 'Health',
            type: null,
            link: {
              __typename: 'NavCategoryLink',
              label: 'Health',
              category: {
                id: '8',
                identifier: 'Health',
                slug: 'Health',
                __typename: 'CatCategory'
              }
            },
            children: [
              {
                __typename: 'NavContentNode',
                title: 'Medicine',
                thumbnail:
                  'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/health/category/catr_hme_medicine.png',
                description: 'Medicine',
                type: null,
                link: {
                  __typename: 'NavCategoryLink',
                  label: 'Medicine',
                  category: {
                    id: '10031',
                    identifier: 'Medicine',
                    slug: 'Medicine',
                    __typename: 'CatCategory'
                  }
                },
                children: []
              },
              {
                __typename: 'NavContentNode',
                title: 'Vitamins',
                thumbnail:
                  'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/health/category/catr_hvt_vitamins.png',
                description: 'Vitamins',
                type: null,
                link: {
                  __typename: 'NavCategoryLink',
                  label: 'Vitamins',
                  category: {
                    id: '10032',
                    identifier: 'Vitamins',
                    slug: 'Vitamins',
                    __typename: 'CatCategory'
                  }
                },
                children: []
              }
            ]
          },
          {
            __typename: 'NavContentNode',
            title: 'Home & Furnishing',
            thumbnail:
              'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/homefurnishings/category/catr_hap_appliances.png',
            description: 'Home & Furnishing',
            type: null,
            link: {
              __typename: 'NavCategoryLink',
              label: 'Home & Furnishing',
              category: {
                id: '9',
                identifier: 'Home Furnishings',
                slug: 'Home Furnishings',
                __typename: 'CatCategory'
              }
            },
            children: [
              {
                __typename: 'NavContentNode',
                title: 'Bath Accessories',
                thumbnail:
                  'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/homefurnishings/category/catr_hba_bath.png',
                description: 'Bath Accessories',
                type: null,
                link: {
                  __typename: 'NavCategoryLink',
                  label: 'Bath Accessories',
                  category: {
                    id: '10033',
                    identifier: 'Bath Accessories',
                    slug: 'Bath Accessories',
                    __typename: 'CatCategory'
                  }
                },
                children: []
              },
              {
                __typename: 'NavContentNode',
                title: 'Furniture',
                thumbnail:
                  'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/homefurnishings/category/catr_hfu_furniture.png',
                description: 'Furniture',
                type: null,
                link: {
                  __typename: 'NavCategoryLink',
                  label: 'Furniture',
                  category: {
                    id: '10034',
                    identifier: 'Furniture',
                    slug: 'Furniture',
                    __typename: 'CatCategory'
                  }
                },
                children: []
              },
              {
                __typename: 'NavContentNode',
                title: 'Kitchenware',
                thumbnail:
                  'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/homefurnishings/category/catr_hkt_kitchenware.png',
                description: 'Kitchenware',
                type: null,
                link: {
                  __typename: 'NavCategoryLink',
                  label: 'Kitchenware',
                  category: {
                    id: '10035',
                    identifier: 'Kitchenware',
                    slug: 'Kitchenware',
                    __typename: 'CatCategory'
                  }
                },
                children: []
              },
              {
                __typename: 'NavContentNode',
                title: 'Lighting',
                thumbnail:
                  'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/homefurnishings/category/catr_hlg_lighting.png',
                description: 'Lighting',
                type: null,
                link: {
                  __typename: 'NavCategoryLink',
                  label: 'Lighting',
                  category: {
                    id: '10036',
                    identifier: 'Lighting',
                    slug: 'Lighting',
                    __typename: 'CatCategory'
                  }
                },
                children: []
              },
              {
                __typename: 'NavContentNode',
                title: 'Tableware',
                thumbnail:
                  'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/homefurnishings/category/catr_hta_tableware.png',
                description: 'Tableware',
                type: null,
                link: {
                  __typename: 'NavCategoryLink',
                  label: 'Tableware',
                  category: {
                    id: '10037',
                    identifier: 'Tableware',
                    slug: 'Tableware',
                    __typename: 'CatCategory'
                  }
                },
                children: []
              },
              {
                __typename: 'NavContentNode',
                title: 'Appliances',
                thumbnail:
                  'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/homefurnishings/category/catr_hap_appliances.png',
                description: 'Appliances',
                type: null,
                link: {
                  __typename: 'NavCategoryLink',
                  label: 'Appliances',
                  category: {
                    id: '10038',
                    identifier: 'Appliances',
                    slug: 'Appliances',
                    __typename: 'CatCategory'
                  }
                },
                children: []
              }
            ]
          },
          {
            __typename: 'NavContentNode',
            title: 'Newsletters & Magazines',
            thumbnail:
              'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/newslettersmagazines/category/catr_nma_magazines.png',
            description: 'Newsletters & Magazines',
            type: null,
            link: {
              __typename: 'NavCategoryLink',
              label: 'Newsletters & Magazines',
              category: {
                id: '10',
                identifier: 'NewslettersAndMagazines',
                slug: 'NewslettersAndMagazines',
                __typename: 'CatCategory'
              }
            },
            children: [
              {
                __typename: 'NavContentNode',
                title: 'Magazines',
                thumbnail:
                  'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/newslettersmagazines/category/catr_nma_magazines.png',
                description: 'Magazines',
                type: null,
                link: {
                  __typename: 'NavCategoryLink',
                  label: 'Magazines',
                  category: {
                    id: '10039',
                    identifier: 'Magazines',
                    slug: 'Magazines',
                    __typename: 'CatCategory'
                  }
                },
                children: []
              },
              {
                __typename: 'NavContentNode',
                title: 'Newsletters',
                thumbnail:
                  'https://wcs-dev1.kkckkchosts.com:8443/wcsstore/ExtendedSitesCatalogAssetStore/images/catalog/newslettersmagazines/category/catr_nne_newsletters.png',
                description: 'Newsletters',
                type: null,
                link: {
                  __typename: 'NavCategoryLink',
                  label: 'Newsletters',
                  category: {
                    id: '10040',
                    identifier: 'Newsletters',
                    slug: 'Newsletters',
                    __typename: 'CatCategory'
                  }
                },
                children: []
              }
            ]
          }
        ]
      };
    }
  }
};
