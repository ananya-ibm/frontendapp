/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { getClientImagePath } from '@exo/frontend-common-utils';
import { HeroCarousel as AutomotiveHeroCarousel } from '@exo/frontend-components-content';

export const HeroCarousel = () => {
  const imgPath = '/static/content/homepage/carousel/';

  const data = [
    {
      title: 'Desert off-roading',
      body:
        'Enjoy cruising in anti-gravity across desert-scapes. Now with newly fitted viewing dome for you to appreciate the night sky and 3 moons.',
      backgroundImage: getClientImagePath(`${imgPath}Landspeeder.jpg`),
      foregroundImage: getClientImagePath(`${imgPath}starwarsCar.png`),
      link: '/catalog/category/Vehicles_Vehicles/Landspeeder_Landspeeder?'
    },
    {
      title: 'Travel through time',
      body:
        "Ever fancied travelling through time? Of course you have. With our DeLorean range that provides the ultimate mobility, you can do just that. Strap in ladies and gents, you're in for a wild ride.",
      backgroundImage: getClientImagePath(`${imgPath}Delorean1.jpg`),
      foregroundImage: getClientImagePath(`${imgPath}DeloreanRed.png`),
      link: '/catalog/category/Vehicles_Vehicles/DeLorean_DeLorean?'
    },
    {
      title: 'Take back the streets',
      body:
        'Holy sweet deal! Ideal for city sightseeing, helping you to speed through narrow roads whether you are hunting down bargains or baddies. Pow!',
      backgroundImage: getClientImagePath(`${imgPath}Batmobile1.jpg`),
      foregroundImage: getClientImagePath(`${imgPath}Batmobile.png`),
      link: '/catalog/category/Vehicles_Vehicles/Batmobile_Batmobile?'
    }
  ];

  return <AutomotiveHeroCarousel items={data} height="70vh" />;
};
