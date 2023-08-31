/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { act } from 'react-dom/test-utils';
import { cleanup, fireEvent, waitFor, screen } from '@testing-library/react';
import { renderWithTheme as render } from '@testUtils';
import { ContentCard } from '@exo/frontend-components-content';
import { axe } from 'jest-axe';
import { MobileCarousel } from './MobileCarousel';

afterEach(() => cleanup());

const testItems = [
  {
    title: 'New Offer 1',
    subtitle: 'Check out the latest offer',
    text: "Isn't it a great offer. I bet you've never seen one like it.",
    img:
      'https://images.unsplash.com/photo-1476286768413-e7051cdb2179?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    linkText: 'Learn More',
    link: '#',
    hasAlwaysShadow: true
  },
  {
    title: 'New Offer 2',
    subtitle: 'Check out the latest offer',
    text: "Isn't it a great offer. I bet you've never seen one like it.",
    img:
      'https://images.unsplash.com/photo-1476286768413-e7051cdb2179?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    linkText: 'Learn More',
    link: '#',
    hasAlwaysShadow: true
  },
  {
    title: 'New Offer 3',
    subtitle: 'Check out the latest offer',
    text: "Isn't it a great offer. I bet you've never seen one like it.",
    img:
      'https://images.unsplash.com/photo-1476286768413-e7051cdb2179?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
    linkText: 'Learn More',
    link: '#',
    hasAlwaysShadow: true
  }
];

describe('<MobileCarousel /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(
      <MobileCarousel>
        {testItems.map(item => (
          <div key={item.title} style={{ padding: '.5rem 0' }}>
            <ContentCard {...item} />
          </div>
        ))}
      </MobileCarousel>
    );

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('it passes an axe accesibility check', async () => {
    let container;
    let results;
    await act(async () => {
      // eslint-disable-next-line prefer-destructuring
      container = render(
        <MobileCarousel>
          {testItems.map(item => (
            <div key={item.title} style={{ padding: '.5rem 0' }}>
              <ContentCard {...item} />
            </div>
          ))}
        </MobileCarousel>
      ).container;

      results = await axe(container);
    });

    expect(results).toHaveNoViolations();
  });

  test('clicking on a button changes the slide', () => {
    const { getByTitle, getByText } = render(
      <MobileCarousel>
        {testItems.map(item => (
          <div key={item.title} style={{ padding: '.5rem 0' }}>
            <ContentCard {...item} />
          </div>
        ))}
      </MobileCarousel>
    );

    const button = getByTitle('Slide 2');
    fireEvent.click(button);

    // buttons indexes 0-based whereas slide titles are 1-based
    const thirdSlide = getByText('New Offer 3');
    expect(thirdSlide).toBeDefined();
  });

  test('slides can change automatically with auto play', async () => {
    const { getByText } = render(
      <MobileCarousel hasAutoPlay>
        {testItems.map(item => (
          <div key={item.title} style={{ padding: '.5rem 0' }}>
            <ContentCard {...item} />
          </div>
        ))}
      </MobileCarousel>
    );

    await waitFor(() => {
      expect(getByText('New Offer 2')).toBeInTheDocument();
    });
  });

  test('progress buttons can be hidden', async () => {
    render(
      <MobileCarousel hasProgressButtons={false}>
        {testItems.map(item => (
          <div key={item.title} style={{ padding: '.5rem 0' }}>
            <ContentCard {...item} />
          </div>
        ))}
      </MobileCarousel>
    );

    const button1 = screen.queryByLabelText('Slide 1');
    const button2 = screen.queryByLabelText('Slide 2');
    const button3 = screen.queryByLabelText('Slide 3');

    expect(button1).toBeNull();
    expect(button2).toBeNull();
    expect(button3).toBeNull();
  });
});
