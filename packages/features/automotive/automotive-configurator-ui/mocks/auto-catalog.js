/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import faker from 'faker';

import img1 from '../../../../apps/automotive/client/static/content/homepage/products/batmobile.jpg';
import img2 from '../../../../apps/automotive/client/static/content/homepage/products/interceptor.jpg';
import img3 from '../../../../apps/automotive/client/static/content/homepage/products/starwarsCar.jpg';
import img4 from '../../../../apps/automotive/client/static/content/homepage/products/submarineCar.jpg';

const img3a = img4;

const category = () => ({
  Query: {
    category: () => ({
      id: 'abc',
      name: 'XD-400',
      childCategories: [
        { id: 'a', identifier: '1', name: 'Electric', childCategories: [] },
        { id: 'b', identifier: '2', name: 'Diesel',
          childCategories: [
            { id: '1', identifier: '3', name: 'SUV', childCategories: [] },
            { id: '2', identifier: '4', name: 'Compact', childCategories: [] },
            { id: '3', identifier: '5', name: 'Sedan', childCategories: [] }
          ]
        },
        { id: 'c', identifier: '6', name: 'Petrol', childCategories: [] }        
      ],
      products: () => ({
        edges: [
          { cursor: '1',
            node: {
              id: 'IBMEMB001',
              partnumber: 'IBMEMB001',
              name: 'Batmobile',
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
              name: 'Interceptor',
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
              name: 'Star Wars Car',
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
              name: 'Submarine Car',
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
        name: 'SUV'
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
        type: 'sku',
        fullImage: random ? faker.image.image() : img3,
        thumbnail: random ? faker.image.image() : img3,
        attachments: [
          { type: 'image', url: img3 },
          { type: 'image', url: img3a }
        ],
        children: [],
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
          name: 'SUV',
          parentCategory: {
            id: 'cde',
            name: 'Electrical'
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

const configuredItem = () => ({
  Query: {
    configuredItem: () => ({
      id: '1',
      baseProduct: {
        description: faker.commerce.productName(),
        longDescription: faker.commerce.productDescription(),
        price: {
          list: {
            value: faker.commerce.price(),
            currency: 'EUR'
          }
        }
      },
      optionCategories: [
        {
          id: 1,
          name: 'Exterior',
          description: 'Customise your car exterior',
          view: '/static/images/products/configurator/exterior.png',
          optionClassifications: [
            {
              id: 20,
              description: 'Choose a colour',
              name: 'Colour',
              view: '/static/images/products/configurator/exterior.png',
              options: [
                {
                  id: 'option_1',
                  selected: true,
                  available: true,
                  product: {
                    id: 'yellow-color',
                    partnumber: 'yellow-color',
                    name: 'Yellow',
                    thumbnail:
                      '/static/images/products/configurator/yellow.png',
                    price: {
                      list: {
                        value: '500',
                        currency: 'GBP'
                      }
                    }
                  }
                },
                {
                  id: 'option_2',
                  selected: false,
                  available: true,
                  product: {
                    id: 'blue-color',
                    partnumber: 'blue-color',
                    name: 'Blue',
                    thumbnail:
                      '/static/images/products/configurator/Nicer-Blue.png',
                    price: {
                      list: {
                        value: '500',
                        currency: 'GBP'
                      }
                    }
                  }
                },
                {
                  id: 'option_3',
                  selected: false,
                  available: true,
                  product: {
                    id: 'blue-color',
                    partnumber: 'cream-color',
                    name: 'Cream',
                    thumbnail:
                      '/static/images/products/configurator/Soft-Cream-Wheel.png',
                    price: {
                      list: {
                        value: '500',
                        currency: 'GBP'
                      }
                    }
                  }
                },
                {
                  id: 'option_4',
                  selected: false,
                  available: false,
                  product: {
                    id: 'shiny-black-color',
                    partnumber: 'shiny-black-color',
                    name: 'Shiny Black',
                    thumbnail:
                      '/static/images/products/configurator/Shiny-Black.png',
                    price: {
                      list: {
                        value: '500',
                        currency: 'GBP'
                      }
                    }
                  }
                }
              ]
            },
            {
              id: 21,
              description: 'Upgrade your wheels',
              name: 'Wheels',
              view: '/static/images/products/configurator/exterior.png',
              options: [
                {
                  id: 'option_5',
                  selected: false,
                  available: true,
                  product: {
                    id: 'big',
                    partnumber: 'big',
                    name: 'Big',
                    thumbnail:
                      '/static/images/products/configurator/Forest-Green-Wheel.png',
                    price: {
                      list: {
                        value: '500',
                        currency: 'GBP'
                      }
                    }
                  }
                },
                {
                  id: 'option_6',
                  selected: false,
                  available: true,
                  product: {
                    id: 'small',
                    partnumber: 'small',
                    name: 'Small',
                    thumbnail:
                      '/static/images/products/configurator/Matte-Grey-Wheel.png',
                    price: {
                      list: {
                        value: '500',
                        currency: 'GBP'
                      }
                    }
                  }
                }
              ]
            }
          ]
        },
        {
          id: 2,
          name: 'Interior',
          description: 'Customise your car interior',
          view: 'interior',
          optionClassifications: [
            {
              id: 10,
              description: 'Choose your upholstry',
              name: 'Upholstry',
              view: 'interior-seat',
              options: [
                {
                  id: 'option_7',
                  selected: true,
                  available: true,
                  product: {
                    id: 'yellow-color-i',
                    partnumber: 'yellow-color',
                    name: 'Yellow',
                    thumbnail:
                      '/static/images/products/configurator/yellow.png',
                    price: {
                      list: {
                        value: '500',
                        currency: 'GBP'
                      }
                    }
                  }
                },
                {
                  id: 'option_8',
                  selected: false,
                  available: true,
                  product: {
                    id: 'blue-color-i',
                    partnumber: 'blue-color',
                    name: 'Blue',
                    thumbnail:
                      '/static/images/products/configurator/Nicer-Blue.png',
                    price: {
                      list: {
                        value: '500',
                        currency: 'GBP'
                      }
                    }
                  }
                },
                {
                  id: 'option_9',
                  selected: false,
                  available: true,
                  product: {
                    id: 'cream-color-i',
                    partnumber: 'cream-color',
                    name: 'Cream',
                    thumbnail:
                      '/static/images/products/configurator/Soft-Cream-Wheel.png',
                    price: {
                      list: {
                        value: '500',
                        currency: 'GBP'
                      }
                    }
                  }
                },
                {
                  id: 'option_10',
                  selected: false,
                  available: false,
                  product: {
                    id: 'shiny-black-color-i',
                    partnumber: 'shiny-black-color',
                    name: 'Shiny Black',
                    thumbnail:
                      '/static/images/products/configurator/Shiny-Black.png',
                    price: {
                      list: {
                        value: '500',
                        currency: 'GBP'
                      }
                    }
                  }
                }
              ]
            },
            {
              id: 11,
              description: 'Choose your interior trim',
              name: 'Interior trim',
              view: 'interior-dash',
              options: [
                {
                  id: 'option_11',
                  selected: false,
                  available: true,
                  product: {
                    id: 'big',
                    partnumber: 'big',
                    name: 'Big',
                    thumbnail:
                      '/static/images/products/configurator/Forest-Green-Wheel.png',
                    price: {
                      list: {
                        value: '500',
                        currency: 'GBP'
                      }
                    }
                  }
                },
                {
                  id: 'option_12',
                  selected: false,
                  available: true,
                  product: {
                    id: 'small',
                    partnumber: 'small',
                    name: 'Small',
                    thumbnail:
                      '/static/images/products/configurator/Matte-Grey-Wheel.png',
                    price: {
                      list: {
                        value: '500',
                        currency: 'GBP'
                      }
                    }
                  }
                }
              ]
            }
          ]
        }
      ]
    })
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
  }),

  products: () => ({
    Query: {
      products: () => category().Query.category().products()
    }
  }),

  configuredItem,

  all: () => ({
    Query: {
      categoriesTop: () => [
        category().Query.category()
      ],
      products: () => category().Query.category().products(),
      category: category().Query.category,
      product: product().Query.product,
      configuredItem: configuredItem().Query.configuredItem
    }
  })
};