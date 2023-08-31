/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Configurator } from './Configurator';

export default {
  title: 'Components/Automotive/Configurator',
  component: Configurator
};

const storyProps = {
  onBackButtonClick: () => {},
  categories: [
    {
      id: 'exterior',
      name: 'Exterior',
      title: 'Customise your Exterior',
      image: '/static/automotive/exterior.png',
      subcategories: [
        {
          id: 'color',
          title: 'Choose a color',
          name: 'Color',
          products: [
            {
              name: 'Yellow',
              id: 'yellow',
              isAvailable: true,
              isSelected: false,
              thumbnail: '/static/automotive/thumbnails/Yellow-Car.png',
              price: {
                prefix: '+',
                currency: 'GBP',
                value: '500'
              }
            },
            {
              name: 'Blue',
              id: 'blue',
              thumbnail: '/static/automotive/thumbnails/Nicer-Blue.png',
              isSelected: true,
              isAvailable: true,
              price: {
                prefix: '+',
                currency: 'GBP',
                value: '500'
              }
            },
            {
              name: 'Shiny Black',
              id: 'black',
              isAvailable: false,
              isSelected: false,
              thumbnail: '/static/automotive/thumbnails/Shiny-Black.png'
            },
            {
              name: 'Cream',
              id: 'cream',
              isAvailable: true,
              isSelected: false,
              thumbnail: '/static/automotive/thumbnails/Soft-Cream-Wheel.png'
            }
          ]
        },
        {
          id: 'wheels',
          title: 'Wheels',
          name: 'Wheels',
          products: [
            {
              name: 'Big',
              id: 'big',
              isAvailable: true,
              isSelected: false,
              thumbnail: '/static/automotive/thumbnails/Nicer-Blue.png',
              price: {
                prefix: '+',
                currency: 'GBP',
                value: '500'
              }
            },
            {
              name: 'Small',
              id: 'small',
              isAvailable: true,
              isSelected: false,
              thumbnail: '/static/automotive/thumbnails/Nicer-Blue.png'
            }
          ]
        }
      ]
    },
    {
      id: 'interior',
      name: 'Interior',
      title: 'Customise your interior',
      image: '/static/automotive/interior.png',
      subcategories: [
        {
          id: 'seat-material',
          title: 'Seat material',
          url: '#',
          name: 'seat-material',
          products: [
            {
              name: 'leather',
              id: 'leather',
              isAvailable: true,
              isSelected: false,
              thumbnail: '/static/automotive/thumbnails/Wafer-white-seat.png'
            },
            {
              name: 'velvet',
              id: 'velvet',
              isAvailable: true,
              isSelected: false,
              thumbnail: '/static/automotive/thumbnails/Nice-Pattern-seat.png'
            }
          ]
        }
      ]
    },
    {
      id: 'extras',
      name: 'Extras',
      title: 'Add your optional extras',
      image: '/static/automotive/car-on-road.jpeg',
      subcategories: [
        {
          id: 'packages',
          title: 'Packages',
          url: '#',
          name: 'packages',
          products: [
            {
              name: 'Charging',
              id: 'charging',
              isAvailable: true,
              isSelected: false,
              thumbnail: '/static/automotive/thumbnails/Time-Travel-GPS.png'
            },
            {
              name: 'Subscription',
              id: 'subscription',
              isAvailable: true,
              isSelected: false,
              thumbnail: '/static/automotive/thumbnails/Time-Travel-GPS.png'
            }
          ]
        },
        {
          id: 'accessories',
          title: 'Accessories',
          url: '#',
          name: 'accessories',
          products: [
            {
              name: 'Flux capacator',
              id: 'flux-capacator',
              isAvailable: true,
              isSelected: false,
              thumbnail: '/static/automotive/thumbnails/Time-Travel-GPS.png'
            },
            {
              name: 'Lightning rod',
              id: 'lightning-rod',
              isAvailable: true,
              isSelected: false,
              thumbnail: '/static/automotive/thumbnails/Time-Travel-GPS.png'
            }
          ]
        }
      ]
    }
  ],
  configuratorSummary: {
    summaryText:
      'The original DMC Delorean from the Back to the Future franchise, with the real ability to travel in time and Michael J Fox’s phone number included.',
    configurationCode: 'waitaminutedoc',
    deliveryDate: 'June 2021',
    priceBreakdownText:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    priceBreakdown: [
      {
        text: 'Base Price',
        amount: {
          prefix: '+',
          currency: 'GBP',
          value: 500
        }
      },
      {
        text: 'Exterior Additions',
        amount: {
          prefix: '+',
          currency: 'GBP',
          value: 300
        }
      },
      {
        text: 'Interior Additions',
        amount: {
          prefix: '+',
          currency: 'GBP',
          value: 50000
        }
      },
      {
        text: 'Other Stuff',
        amount: {
          prefix: '+',
          currency: 'GBP',
          value: 300
        }
      },
      {
        text: 'Total cost',
        amount: {
          prefix: '+',
          currency: 'GBP',
          value: 35500
        }
      }
    ],
    onSaveConfiguration: () => {},
    onDeleteConfiguration: () => {},
    summarySelections: [
      {
        title: 'Your chosen exterior',
        options: [
          {
            title: 'Colour',
            text: 'Blue',
            amount: {
              prefix: '+',
              currency: 'GBP',
              value: 300
            },
            thumbnail: '/static/automotive/thumbnails/Nicer-Blue.png',
            onProductSelectionChange: () => {},
            changeButtonText: 'Change selection'
          },
          {
            title: 'Wheels',
            text: 'Big',
            amount: {
              prefix: '+',
              currency: 'GBP',
              value: 300
            },
            thumbnail: '/static/automotive/thumbnails/Shiny-Black.png',
            onProductSelectionChange: () => {},
            changeButtonText: 'Change selection'
          }
        ]
      },
      {
        title: 'Your chosen interior',
        options: [
          {
            title: 'Seat',
            text: 'Leather',
            amount: {
              prefix: '+',
              currency: 'GBP',
              value: 300
            },
            thumbnail: '/static/automotive/thumbnails/Leather-Seat.png',
            onProductSelectionChange: () => {},
            changeButtonText: 'Change selection'
          },
          {
            title: 'Seat',
            text: 'Texture',
            amount: {
              prefix: '+',
              currency: 'GBP',
              value: 300
            },
            thumbnail: '/static/automotive/thumbnails/Waffle-Seat.png',
            onProductSelectionChange: () => {},
            changeButtonText: 'Change selection'
          },
          {
            title: 'Tyre',
            text: 'Round',
            version: 'R16 Hot Wheel',
            thumbnail: '/static/automotive/thumbnails/Forest-Green-Wheel.png',
            onProductSelectionChange: () => {},
            changeButtonText: 'Change selection'
          }
        ]
      },
      {
        title: 'Your chosen optionals',
        options: [
          {
            text: 'Winter Package',
            amount: {
              prefix: '+',
              currency: 'GBP',
              value: 300
            },
            thumbnail: '/static/automotive/thumbnails/Time-Travel-GPS.png',
            onProductSelectionChange: () => {},
            changeButtonText: 'Change selection'
          },
          {
            title: 'Colour',
            text: 'Yellow',
            amount: {
              prefix: '+',
              currency: 'GBP',
              value: 300
            },
            thumbnail: '/static/automotive/thumbnails/yellow.png',
            onProductSelectionChange: () => {},
            changeButtonText: 'Change selection'
          }
        ]
      }
    ]
  },
  priceBar: {
    addToCartText: 'Add to Cart',
    addToCartUrl: '#',
    financeLinkText: 'Calculate Finance',
    financeUrl: '#',
    price: {
      value: '25000',
      currency: 'GBP',
      prefix: ''
    },
    subscriptionCost: {
      value: '800',
      currency: 'GBP',
      rate: '/month'
    },
    testDriveText: 'Book Test Drive',
    testDriveUrl: '#'
  }
};

export const normal = args => <Configurator {...args} />;
normal.args = storyProps;
