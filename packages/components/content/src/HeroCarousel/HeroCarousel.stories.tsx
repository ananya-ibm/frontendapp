/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { HeroCarousel } from './HeroCarousel';

export default {
  title: 'Components/Content/HeroCarousel',
  component: HeroCarousel
};

const storyProps = {
  items: [
    {
      link: '#a',
      title: 'Desert off-roading',
      body:
        'Enjoy cruising in anti-gravity across desert-scapes. Now with newly fitted viewing dome for you to appreciate the night sky and 3 moons.',
      backgroundImage: '/static/content/heroCarousel/beach.jpg'
    },
    {
      link: '#c',
      title: 'Travel through time',
      body:
        "Ever fancied travelling through time? Of course you have. With our DeLorean range that provides the ultimate mobility, you can do just that. Strap in ladies and gents, you're in for a wild ride.",
      backgroundImage: 'static/content/heroCarousel/canyon.jpg'
    },
    {
      link: '#b',
      title: 'Take back the streets',
      body:
        'Holy sweet deal! Ideal for city sightseeing, helping you to speed through narrow roads whether you are hunting down bargains or baddies. Pow!',
      backgroundImage: './static/content/heroCarousel/forest.jpg'
    }
  ]
};

const storyPropsAuto = {
  items: [
    {
      link: '#a',
      title: 'Desert off-roading',
      body:
        'Enjoy cruising in anti-gravity across desert-scapes. Now with newly fitted viewing dome for you to appreciate the night sky and 3 moons.',
      backgroundImage:
        'https://res.cloudinary.com/di20gbxq3/image/upload/v1596728571/automotive/content/homepage/carousel/Landspeeder.jpg',
      foregroundImage:
        'http://res.cloudinary.com/di20gbxq3/image/upload/v1596728568/automotive/content/homepage/carousel/starwarsCar.png'
    },
    {
      link: '#c',
      title: 'Travel through time',
      body:
        "Ever fancied travelling through time? Of course you have. With our DeLorean range that provides the ultimate mobility, you can do just that. Strap in ladies and gents, you're in for a wild ride.",
      backgroundImage:
        'https://res.cloudinary.com/di20gbxq3/image/upload/v1596728569/automotive/content/homepage/carousel/Delorean2.jpg',
      foregroundImage:
        'https://res.cloudinary.com/di20gbxq3/image/upload/v1596728568/automotive/content/homepage/carousel/DeloreanRed.png'
    },
    {
      link: '#b',
      title: 'Take back the streets',
      body:
        'Holy sweet deal! Ideal for city sightseeing, helping you to speed through narrow roads whether you are hunting down bargains or baddies. Pow!',
      backgroundImage:
        'https://res.cloudinary.com/di20gbxq3/image/upload/v1596728570/automotive/content/homepage/carousel/Batmobile2.jpg',
      foregroundImage:
        'https://res.cloudinary.com/di20gbxq3/image/upload/v1596728568/automotive/content/homepage/carousel/Batmobile.png'
    }
  ]
};

export const normal = args => <HeroCarousel {...args} />;
normal.args = storyProps;

export const auto = args => <HeroCarousel {...args} />;
auto.args = storyPropsAuto;
