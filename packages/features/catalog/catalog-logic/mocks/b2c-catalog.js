/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import faker from 'faker';

import img1 from './b2c-images/IBMEMB001_EMB001_514.jpg';
import img2 from './b2c-images/IBMLGBT004_Diversity Tee_368.jpg';
import img3 from './b2c-images/IBMRBS100_IBM_rebusshirt1_400.jpg';
import img3a from './b2c-images/IBMRBS100_IBM_rebusshirt2_401.jpg';
import img4 from './b2c-images/IBMCLOUD001_Cloud1_394.jpg';
import img5 from './b2c-images/IBMWEAR003_Hoodie_437.jpg';
import img6 from './b2c-images/IBMWEAR005_lf_516.jpg';

const category = () => ({
  Query: {
    category: () => ({
      id: 'abc',
      slug: 'abc',
      name: 'Shirts',
      childCategories: [
        {
          id: 'Shirts',
          slug: 'Shirts',
          identifier: 'Shirts',
          name: 'Shirts',
          childCategories: []
        },
        {
          id: 'Trousers',
          slug: 'Trousers',
          identifier: 'Trousers',
          name: 'Trousers',
          childCategories: [
            {
              id: 'Jeans',
              slug: 'Jeans',
              identifier: 'Jeans',
              name: 'Jeans'
            },
            {
              id: 'Slacks',
              slug: 'Slacks',
              identifier: 'Slacks',
              name: 'Slacks'
            }
          ]
        }
      ],
      products: () => ({
        edges: [
          { cursor: '1',
            node: {
              id: 'IBMEMB001',
              partnumber: 'IBMEMB001',
              slug: 'IBMEMB001',
              name: 'Emb(race) T-shirt',
              thumbnail: img1,
              fullImage: img1,
              price: {
                list: {
                  currency: 'EUR',
                  value: faker.commerce.price()
                },
                offer: {
                  currency: 'EUR',
                  value: faker.commerce.price()
                }
              }
            }
          },

          { cursor: '2',
            node: {
              id: 'IBMLGBT004',
              partnumber: 'IBMLGBT004',
              slug: 'IBMLGBT004',
              name: 'Diversity T-Shirt',
              thumbnail: img2,
              fullImage: img2,
              price: {
                list: {
                  currency: 'EUR',
                  value: faker.commerce.price()
                },
                offer: {
                  currency: 'EUR',
                  value: faker.commerce.price()
                }
              }
            }
          },

          { cursor: '3',
            node: {
              id: 'IBMRBS100',
              partnumber: 'IBMRBS100',
              slug: 'IBMRBS100',
              name: 'Eye-Bee-M T-Shirt',
              thumbnail: img3,
              fullImage: img3,
              price: {
                list: {
                  currency: 'EUR',
                  value: faker.commerce.price()
                },
                offer: {
                  currency: 'EUR',
                  value: faker.commerce.price()
                }
              }
            }
          },

          { cursor: '4',
            node: {
              id: 'IBMCLOUD001',
              partnumber: 'IBMCLOUD001',
              slug: 'IBMCLOUD001',
              name: 'IBM Cloud T-Shirt Black',
              thumbnail: img4,
              fullImage: img4,
              price: {
                list: {
                  currency: 'EUR',
                  value: faker.commerce.price()
                },
                offer: {
                  currency: 'EUR',
                  value: faker.commerce.price()
                }
              }
            }
          },

          { cursor: '5',
            node: {
              id: 'IBMWEAR003',
              partnumber: 'IBMWEAR003',
              slug: 'IBMWEAR003',
              name: 'IBM Hoodie Black (B&C)',
              thumbnail: img5,
              fullImage: img5,
              price: {
                list: {
                  currency: 'EUR',
                  value: faker.commerce.price()
                },
                offer: {
                  currency: 'EUR',
                  value: faker.commerce.price()
                }
              }
            }
          },

          { cursor: '6',
            node: {
              id: 'IBMWEAR005',
              partnumber: 'IBMWEAR005',
              slug: 'IBMWEAR005',
              name: 'The Pan-African Collection',
              thumbnail: img6,
              fullImage: img6,
              price: {
                list: {
                  currency: 'EUR',
                  value: faker.commerce.price()
                },
                offer: {
                  currency: 'EUR',
                  value: faker.commerce.price()
                }
              }
            }
          }
        ],
        facets: [
          { 
            multiSelect: true,
            name: 'Colour',
            label: 'Colour',
            code: 'c',
            entries: [
              { code: 'red', name: 'red', label: 'Red', count: 15, type: 'select' },
              { code: 'green', name: 'green', label: 'Green', count: 12, type: 'select' },
              { code: 'blue', name: 'blue', label: 'Blue', count: 7, type: 'select' },
              { code: 'pink', name: 'pink', label: 'Pink', count: 3, type: 'select' }
            ]
          },

          { 
            multiSelect: false,
            name: 'Size',
            label: 'Size',
            code: 's',
            entries: [
              { code: 'xs', name: 'xs', label: 'Extra Small', count: 12, type: 'select' },
              { code: 's', name: 's', label: 'Small', count: 8, type: 'select' },
              { code: 'm', name: 'm', label: 'Medium', count: 7, type: 'select' },
              { code: 'l', name: 'l', label: 'Large', count: 1, type: 'select' }
            ]
          }
        ]
      }),
      parentCategory: {
        id: 'cde',
        name: 'Apparel',
        slug: 'Apparel'
      }
    })
  }
});

const product = (type, random) => ({
  Query: {
    product: () => {
      const p = {
        id: random ? faker.random.number() : '4123124',
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        longDescription: faker.lorem.paragraph(),
        partnumber: 'IBMAC014',
        slug: 'IBMAC014',
        type: 'sku',
        fullImage: random ? faker.image.image() : img3,
        thumbnail: random ? faker.image.image() : img3,
        attachments: [
          { type: 'image', url: img3 },
          { type: 'image', url: img3a }
        ],
        price: {
          list: {
            currency: 'EUR',
            value: faker.commerce.price()
          },
          offer: {
            currency: 'EUR',
            value: faker.commerce.price()
          }
        },
        parentCategory: {
          id: 'abc',
          name: 'Shirts',
          slug: 'Shirts',
          parentCategory: {
            id: 'cde',
            name: 'Apparel',
            slug: 'Apparel'
          }
        },
        attributes: [
          { id: '1', name: 'Basematerial', value: { value: 'Particleboard, Paper foil, Plastic edging', id: 'a' } },
          { id: '2', name: 'Side panel', value: { value: 'Particleboard, Paper foil, Melamine foil, Plastic edging', id: 'b' } },
          { id: '3', name: 'Plinth front', value: { value: 'Particleboard, Paper foil', id: 'c' } },
          { id: '4', name: 'Back', value: { value: 'Fibreboard, Paint, Paper foil', id: 'd' } }
        ],
        availability: [
          { status: 'Available',
            distributionGroup: {
              id: 'online',
              name: 'Online'
            }
          },
          { status: 'Available',
            shipNode: {
              id: 'armonk',
              name: 'Armonk'
            }
          },
          { status: 'Unavailable',
            shipNode: {
              id: 'yorktown_heights',
              name: 'Yorktown Heights'
            }
          }
        ]
      };

      if (type === 'bundleOfSkus') {
        p.type = 'bundleOfSkus';
        p.children = category().Query.category().products().edges.map(e => e.node)
      }

      if (type === 'product') {
        p.type = 'product';
        p.selection = [
          {
            id: '10040',
            criteria: [
              {
                criteriaId: 'swatchSize',
                sequence: '1',
                name: 'Available Sizes',
                value: { id: 'XS', value: 'XS', sequence: '1' }
              },
              {
                criteriaId: 'swatchcolor',
                sequence: '2',
                name: 'Color',
                value: { id: 'Red', value: 'Red', sequence: '1' }
              }
            ]
          },
          {
            id: '10041',
            criteria: [
              {
                criteriaId: 'swatchSize',
                sequence: '1',
                name: 'Available Sizes',
                value: { id: 'M', value: 'M', sequence: '3' }
              },
              {
                criteriaId: 'swatchcolor',
                sequence: '2',
                name: 'Color',
                value: { id: 'Red', value: 'Red', sequence: '1' }
              }
            ]
          },
          {
            id: '10042',
            criteria: [
              {
                criteriaId: 'swatchcolor',
                sequence: '2',
                name: 'Color',
                value: { id: 'Green', value: 'Green', sequence: '2' }
              },
              {
                criteriaId: 'swatchSize',
                sequence: '1',
                name: 'Available Sizes',
                value: { id: 'XS', value: 'XS', sequence: '1' }
              }
            ]
          },
          {
            id: '10043',
            criteria: [
              {
                criteriaId: 'swatchSize',
                sequence: '1',
                name: 'Available Sizes',
                value: { id: 'XL', value: 'XL', sequence: '5' }
              },
              {
                criteriaId: 'swatchcolor',
                sequence: '2',
                name: 'Color',
                value: { id: 'Green', value: 'Green', sequence: '2' }
              }
            ]
          }
        ];
      }

      return p;
    }
  }
});

export default {
  category,

  categoriesTop: () => ({
    Query: {
      categoriesTop: () => [
        category().Query.category()
      ]
    }
  }),

  product,

  search: () => ({
    Query: {
      products: () => category().Query.category().products()
    }
  })
};