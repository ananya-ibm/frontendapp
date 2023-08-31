/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { DynamicVehicleImage } from './DynamicVehicleImage';

export default {
  title: 'Components/Automotive/DynamicVehicleImage',
  component: DynamicVehicleImage
};

const basePath = '/static/automotive/products/configurator/dynamic-images/Landspeeder/';

const storyProps = {
  images: [`${basePath}Paint/YavinRed-front.png`, `${basePath}Armament/BlasterTurret-front.png`],
  backgroundImage: 'https://img.wallpapersafari.com/desktop/1680/1050/86/72/KqaJvP.jpg',
  percentSize: 80
};

export const imageBackground = args => <DynamicVehicleImage {...args} />;
imageBackground.args = storyProps;

const colourStoryProps = {
  images: [`${basePath}Paint/HothBlue-front.png`, `${basePath}Armament/LaserCannon-front.png`],
  backgroundColour: '#0261eb'
};

export const colourBackground = args => <DynamicVehicleImage {...args} />;
colourBackground.args = colourStoryProps;

const noBackgroundStoryProps = {
  images: [
    `${basePath}Paint/TatooineYellow-front.png`,
    `${basePath}Armament/BlasterTurret-front.png`
  ]
};

export const noBackground = args => <DynamicVehicleImage {...args} />;
noBackground.args = noBackgroundStoryProps;
