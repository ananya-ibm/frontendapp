/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme as render } from '@testUtils';
import { ConfigurationSummary } from './ConfigurationSummary';

const testProps = {
  summaryText:
    'The original DMC Delorean from the Back to the Future franchise, with the real ability to travel in time and Michael J Fox’s phone number included.',
  configurationCode: 'waitaminutedoc',
  deliveryDate: 'June 2021',
  priceBreakdownText: 'Lorem ipsum dolor sit amet',
  priceBreakdown: [
    {
      text: 'Base Price',
      amount: {
        prefix: '+',
        currency: 'GBP',
        value: 500
      }
    }
  ],
  onSaveConfiguration: () => {},
  onDeleteConfiguration: () => {},
  summarySelections: [
    {
      title: 'Your chosen exterior',
      options: [
        {
          title: 'Colour 1',
          text: 'Blue',
          amount: {
            prefix: '+',
            currency: 'GBP',
            value: 300
          },
          thumbnail: '/yellow.png',
          onProductSelectionChange: () => {},
          changeButtonText: 'Change selection'
        },
        {
          title: 'Colour 2',
          text: 'Yellow',
          amount: {
            prefix: '+',
            currency: 'GBP',
            value: 300
          },
          thumbnail: '/yellow.png',
          onProductSelectionChange: () => {},
          changeButtonText: 'Change selection'
        }
      ]
    }
  ]
};

describe('<ConfigurationSummary /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<ConfigurationSummary {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
});
