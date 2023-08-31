/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme as render } from '@testUtils';
import { TradeInForm } from './TradeInForm';

const testProps = {
  carCondition: {
    label: 'Car Condition',
    options: ['Excellent', 'Good', 'Fair', 'Poor']
  },
  formProps: {
    onSubmit: () => {}
  }
};

describe('<TradeInForm /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<TradeInForm {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
});
