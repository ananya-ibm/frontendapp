/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme } from '@testUtils';
import { act } from 'react-dom/test-utils';

import { LoginPane } from './LoginPane';

describe('<LoginPane /> component', () => {
  test('its snapshot matches when logged in', async () => {
    let container;
    await act(async () => {
      // eslint-disable-next-line prefer-destructuring
      container = renderWithTheme(
        <LoginPane isLoggedIn onLogin={() => {}} onLogout={() => {}} onRegister={() => {}} />
      ).container;
    });

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
  test('its snapshot matches when logged out', async () => {
    let container;
    await act(async () => {
      // eslint-disable-next-line prefer-destructuring
      container = renderWithTheme(
        <LoginPane
          isLoggedIn={false}
          onLogin={() => {}}
          onLogout={() => {}}
          onRegister={() => {}}
        />
      ).container;
    });

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
});
