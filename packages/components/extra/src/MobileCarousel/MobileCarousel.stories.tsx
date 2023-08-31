/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import styled from 'styled-components';
import { ContentCard } from '@exo/frontend-components-content';
import { MobileCarousel } from './MobileCarousel';

export default {
  title: 'Components/Extra/MobileCarousel',
  component: MobileCarousel
};

const storyItems = [
  {
    title: 'New Offer 1',
    subtitle: 'Check out the latest offer',
    text: 'Isn\'t it a great offer. I bet you\'ve never seen one like it.',
    img:
      'https://images.unsplash.com/photo-1476286768413-e7051cdb2179?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    linkText: 'Learn More',
    link: '#',
    hasAlwaysShadow: true
  },
  {
    title: 'New Offer 2',
    subtitle: 'Check out the latest offer',
    text: 'Isn\'t it a great offer. I bet you\'ve never seen one like it.',
    img:
      'https://images.unsplash.com/photo-1476286768413-e7051cdb2179?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    linkText: 'Learn More',
    link: '#',
    hasAlwaysShadow: true
  },
  {
    title: 'New Offer 3',
    subtitle: 'Check out the latest offer',
    text: 'Isn\'t it a great offer. I bet you\'ve never seen one like it.',
    img:
      'https://images.unsplash.com/photo-1476286768413-e7051cdb2179?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    linkText: 'Learn More',
    link: '#',
    hasAlwaysShadow: true
  }
];

export const normal = args => (
  <MobileCarousel {...args}>
    {storyItems.map(item => (
      <div key={item.title} style={{ padding: '.5rem 0' }}>
        <ContentCard {...item} />
      </div>
    ))}
  </MobileCarousel>
);

export const withCustomSlideStyles = args => (
  <MobileCarousel {...args}>
    {storyItems.map(item => (
      <div key={item.title} style={{ padding: '.5rem 0' }}>
        <ContentCard {...item} />
      </div>
    ))}
  </MobileCarousel>
);

withCustomSlideStyles.args = {
  carouselStyles: {
    slideContainer: {
      padding: '0 3rem'
    }
  }
};

const Container = styled('div')`
  & .storybook-carousel {
    background: lightgrey;
    border: 0.0625rem solid black;
    padding: 1rem;
  }

  & .storybook-carousel-progress {
    justify-content: flex-start;

    & div {
      box-shadow: 0 0 0.5rem black;
    }
  }
`;

export const withCustomStyles = args => (
  <Container>
    <MobileCarousel {...args}>
      {storyItems.map(item => (
        <div key={item.title} style={{ background: 'white' }}>
          <ContentCard {...item} />
        </div>
      ))}
    </MobileCarousel>
  </Container>
);

withCustomStyles.args = {
  className: 'storybook-carousel'
};

export const withCustomProgressStyles = args => (
  <Container>
    <MobileCarousel {...args}>
      {storyItems.map(item => (
        <div key={item.title} style={{ padding: '.5rem 0' }}>
          <ContentCard {...item} />
        </div>
      ))}
    </MobileCarousel>
  </Container>
);

withCustomProgressStyles.args = {
  progressClassName: 'storybook-carousel-progress'
};

export const imageCarousel = args => (
  <MobileCarousel {...args}>
    {storyItems.map(item => (
      <img key={item.title} src={item.img} alt={item.title} />
    ))}
  </MobileCarousel>
);

imageCarousel.args = {
  carouselStyles: {
    slideContainer: {
      padding: '0'
    }
  }
};

export const withAutoPlay = args => (
  <MobileCarousel {...args}>
    {storyItems.map(item => (
      <div key={item.title} style={{ padding: '.5rem 0' }}>
        <ContentCard {...item} />
      </div>
    ))}
  </MobileCarousel>
);

withAutoPlay.args = {
  hasAutoPlay: true
};

export const withoutProgressButtons = args => (
  <MobileCarousel {...args}>
    {storyItems.map(item => (
      <div key={item.title} style={{ padding: '.5rem 0' }}>
        <ContentCard {...item} />
      </div>
    ))}
  </MobileCarousel>
);

withoutProgressButtons.args = {
  hasProgressButtons: false
};
