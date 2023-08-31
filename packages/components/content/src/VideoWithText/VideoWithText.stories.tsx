/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { VideoWithText } from './VideoWithText';

export default {
  title: 'Components/Content/VideoWithText',
  component: VideoWithText
};

type Props = React.ComponentProps<typeof VideoWithText>;

export const Default = args => <VideoWithText {...args} />;
Default.args = {
  title: 'Our commitment to the planet',
  videoURL: 'https://ibmretail.cdn.appdomain.cloud/images/homepage/sustainability.mp4',
  text: `<b>Our Future of Climate initiative</b> is designed to accelerate the discovery of products, solutions and services to address the changing climate and to reduce our environmental impact.
  <br /><br />
  <b>#product sold with:</b><br />
  Less water consumption: 76353<br />
  Reduce water pollution: 20073<br />
  Reduce used of Fossil Fuels:6353<br />
  Reduce impact on Global Warming: 626525<br />
  
  <br />

  #of shipments using: 	78787<br />
  #consolidated shipments: 	626276<br />

  <br />
  <b>Thank you for joining our quest!</b>`
} as Props;
