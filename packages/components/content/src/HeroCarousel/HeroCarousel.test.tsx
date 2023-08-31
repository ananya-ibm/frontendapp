/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme as render } from '@testUtils';
import { fireEvent, screen } from '@testing-library/react';
import { axe } from 'jest-axe';
import { HeroCarousel } from './HeroCarousel';

const testProps = {
  items: [
    {
      link: '#a',
      title: 'Desert off-roading',
      body:
        'Enjoy cruising in anti-gravity across desert-scapes. Now with newly fitted viewing dome for you to appreciate the night sky and 3 moons.',
      backgroundImage: '/static/content/heroCarousel/beach.jpg',
      foregroundImage: './static/content/heroCarousel/Starwars Car.png'
    },
    {
      link: '#c',
      title: 'Travel through time',
      body:
        "Ever fancied travelling through time? Of course you have. With our DeLorean range that provides the ultimate mobility, you can do just that. Strap in ladies and gents, you're in for a wild ride.",
      backgroundImage: 'static/content/heroCarousel/canyon.jpg',
      foregroundImage: './static/content/heroCarousel/Delorean Red.png'
    }
  ]
};

describe('<HeroCarousel /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<HeroCarousel {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
  // ToDo: Renable this test
  test.skip('clicking a progress pip advances to the next slide', () => {
    render(<HeroCarousel {...testProps} />);

    const dot2 = screen.getByTitle('Slide 1');
    const slide2 = screen.getByTitle('Travel through time');

    fireEvent.click(dot2);

    expect(dot2).toHaveStyle('opacity: 1;');
    expect(slide2).toHaveStyle('opacity: 1;');
  });
  test('it passes an axe accesibility check', async () => {
    const { container } = render(<HeroCarousel {...testProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
