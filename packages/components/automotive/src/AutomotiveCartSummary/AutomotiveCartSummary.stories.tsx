/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { AutomotiveCartSummary } from './AutomotiveCartSummary';

export default {
  title: 'Components/Automotive/AutomotiveCartSummary',
  component: AutomotiveCartSummary
};

const storyProps = {
  image: '/static/automotive/exterior.png',
  summaryText:
    'The original DMC Delorean from the Back to the Future franchise, with the real ability to travel in time and Michael J Fox’s phone number included.',
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
    },
    {
      text: 'Amount payable now',
      amount: {
        currency: 'GBP',
        value: 35500
      }
    }
  ],
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
};

export const normal = args => <AutomotiveCartSummary {...args} />;
normal.args = storyProps;

export const confirmationPage = args => <AutomotiveCartSummary {...args} />;
confirmationPage.args = {
  ...storyProps,
  isConfirmation: true,
  title: 'DMC Delorean'
};
