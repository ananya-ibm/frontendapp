/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme as render } from '@testUtils';
import { screen } from '@testing-library/react';
import user from '@testing-library/user-event';
import { AcknowledgeModal } from './AcknowledgeModal';

const testProps = {
  title: 'Landspeeder X34',
  monthlyPrice: {
    currency: 'GBP',
    value: '20000',
    prefix: 'From ',
    rate: ' per month'
  },
  modalHeading: null,
  open: true,
  okBtnClick: jest.fn,
  okBtnText: 'Ok',
  onRequestCloseClick: jest.fn,
  onClick: jest.fn
};

describe('<AcknowledgeModal /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<AcknowledgeModal {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });

  test('clicking OK calls the function', () => {
    const onClick = jest.fn();
    render(<AcknowledgeModal {...testProps} okBtnClick={onClick} />);

    const button = screen.getByText(/ok/i);
    user.click(button);

    expect(onClick).toHaveBeenCalled();
  });
});
