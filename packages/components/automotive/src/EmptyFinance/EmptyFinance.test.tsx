/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme as render } from '@testUtils';
import { EmptyFinance } from './EmptyFinance';

const testProps = {
  chooseFinanceText: 'Choose Your Finance',
  onClickChooseFinance: jest.fn(),
  text: 'You have no finance option selected at the moment'
};

describe('<EmptyFinance /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<EmptyFinance {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
});
