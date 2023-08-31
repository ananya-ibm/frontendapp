/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme as render } from '@testUtils';
import { OwnerOverview } from './OwnerOverview';

const testProps = {
  title: "Marty McFly's car",
  description: 'DMC',
  distance: '36000 km',
  reviewDate: '12/05/2020',
  insuranceDate: '12/05/2020',
  year: '2020',
  weight: '56.00 lb'
};

describe('<OwnerOverview /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<OwnerOverview {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
});
