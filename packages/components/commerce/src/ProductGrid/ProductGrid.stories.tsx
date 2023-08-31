/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ProductGrid } from './ProductGrid';

export default {
  title: 'Components/Commerce/ProductGrid',
  component: ProductGrid
};

const storyProps = {
  products: [
    {
      img: {
        src: '/static/automotive/products/thumbnails/X34Landspeeder.png',
        alt: 'X34Landspeeder'
      },
      id: 'X34Landspeeder',
      name: 'X34Landspeeder',
      description:
        'The X-34 landspeeder was a model of civilian landspeeder manufactured by SoroSuub Corporation and available during the Galactic Civil War between the Galactic Empire and the Alliance to Restore the Republic.',
      price: {
        list: {
          value: '14000',
          currency: 'GBP'
        },
        offer: {
          value: '11000',
          currency: 'GBP'
        }
      },
      subscriptionCost: {
        prefix: 'From ',
        currency: 'GBP',
        price: '100',
        rate: 'per month'
      }
    },
    {
      img: {
        src: '/static/automotive/products/thumbnails/XP38Landspeeder.png',
        alt: 'XP38Landspeeder'
      },
      id: 'XP38Landspeeder',
      name: 'XP38Landspeeder',
      description:
        "Ever since the XP-38 came out, they just aren't in demand.<br/>― Luke Skywalker, after selling his X-34 landspeeder[src]",
      price: {
        list: {
          value: '14000',
          currency: 'GBP'
        }
      }
    },
    {
      img: {
        src: '/static/automotive/products/thumbnails/DMCDeLorean.png',
        alt: 'DMCDeLorean'
      },
      id: 'DMCDeLorean',
      name: 'DMCDeLorean',
      description:
        "The DMC DeLorean (often referred to simply as the DeLorean) is a sports car manufactured by John DeLorean's DeLorean Motor Company (DMC) for the American market from 1981 to 1983.",
      price: {
        list: {
          value: '14000',
          currency: 'GBP'
        }
      }
    },
    {
      img: {
        src: '/static/automotive/products/thumbnails/DeLoreanTimeMachine.png',
        alt: 'DeLoreanTimeMachine'
      },
      id: 'DeLoreanTimeMachine',
      name: 'DeLoreanTimeMachine',
      description:
        'The DeLorean time machine is a fictional automobile-based time travel vehicle device featured in the Back to the Future franchise.',
      price: {
        list: {
          value: '14000',
          currency: 'GBP'
        }
      }
    },
    {
      img: {
        src: '/static/automotive/products/thumbnails/OriginalBatMobile.png',
        alt: 'OriginalBatMobile'
      },
      id: 'OriginalBatMobile',
      name: 'OriginalBatMobile',
      description: 'The Batmobile is the fictional car driven by the superhero Batman',
      price: {
        list: {
          value: '14000',
          currency: 'GBP'
        }
      }
    }
  ]
};

export const normal = args => <ProductGrid {...args} />;
normal.args = storyProps;
