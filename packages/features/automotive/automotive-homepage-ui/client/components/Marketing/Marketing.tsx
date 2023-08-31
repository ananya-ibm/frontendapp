/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { MarketingInfoTabs as MarketingInfoTabsComp } from '@exo/frontend-components-automotive/src/MarketingInfoTabs/MarketingInfoTabs';
import { getClientImagePath } from '@exo/frontend-common-utils';

export const Marketing = () => {
  const imgPath = '/static/content/homepage/marketing/';

  const tabs = [
    {
      title: 'Our mission',
      image: getClientImagePath(`${imgPath}1.jpg`),
      description:
        'It is our mission to make the impossible journeys possible, with the simple click of a few buttons on your phone, tablet, or laptop, and in matter of days. We pride ourselves in being able to provide you with the unique mobility experiences that cannot be found anywhere else. We are able to meet, and exceed your expectations for adventure through space, time, dimensions and galaxies. Be it futuristic or retro, be it fighting crime or escaping capture, be it across deserts or underwater... you can find our answers here, with us.'
    },
    {
      title: 'Environmental Awareness',
      image: getClientImagePath(`${imgPath}2.jpg`),
      description:
        'As citizens of planet Earth, we are collectively facing an ever increasing threat: an environmental crisis. We understand this problem is bigger than just reducing our carbon footprint, but this is where we will start. We are committed to be 100% carbon neutral by 2035, with the ambition to be carbon positive thereafter. As a first step, we are on track to meeting EU requirements on CO2 ahead of time (before 2022). The environment is one of the biggest existential threats facing this generation, one that must demand our attention and efforts, so together, we will bring the future back to the automotive industry.'
    },
    {
      title: 'Our services',
      left: {
        subtitle: 'Book a Test Drive',
        description:
          'Get behind the driving wheel and experience the thrill yourself. Click below to arrange a test drive.'
      },
      middle: {
        subtitle: 'Book a service',
        description:
          'We can help you get back on track and stay safe on the road. Click below to arrange a check up.'
      },
      right: {
        subtitle: 'Contact us',
        description:
          'What can we help you with? Click below to find the ways in which you can get assistance.'
      }
    }
  ];
  return <MarketingInfoTabsComp tabs={tabs} />;
};
