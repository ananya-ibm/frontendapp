/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ProductItemCarousel } from './ProductItemCarousel';

export default {
  title: 'Components/Commerce/ProductItemCarousel',
  component: ProductItemCarousel
};

const storyProps = {
  productData: [
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
          value: '12000',
          currency: 'GBP'
        }
      },
      currency: 'GBP',
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
      },
      currency: 'GBP'
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
      },
      currency: 'GBP'
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
      },
      currency: 'GBP'
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
      },
      currency: 'GBP'
    }
  ]
};

export const normal = args => <ProductItemCarousel {...args} />;
normal.args = storyProps;

export const WithTitle = args => <ProductItemCarousel {...args} />;
WithTitle.args = {
  ...normal.args,
  title: 'Products'
};
