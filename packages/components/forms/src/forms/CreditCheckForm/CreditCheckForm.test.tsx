/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Router } from 'react-router-dom';
import { act } from 'react-dom/test-utils';
import { renderWithTheme } from '@testUtils';
import { CreditCheckForm } from './CreditCheckForm';


window.scrollTo = jest.fn();

const testProps = {
    onSubmit: jest.fn()
  };

describe('<CreditCheckForm /> component', () => {
    const historyMock: any = {
      push: jest.fn(),
      location: jest.fn(),
      listen: jest.fn()
    };
  
    // @ts-ignore
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({})
      })
    );
  
    test('its snapshot matches', async () => {
      let container;
      await act(async () => {
        // eslint-disable-next-line prefer-destructuring
        container = renderWithTheme(
          <Router history={historyMock}>
            <CreditCheckForm {...testProps} />
          </Router>
        ).container;
      });
  
      expect(container).toBeDefined();
      expect(container.firstChild).toMatchSnapshot();
    });
  });