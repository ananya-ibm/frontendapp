/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme as render } from '@testUtils';
import { NotificationType } from '@exo/frontend-common-notification';
import { Notifications } from './Notifications';

const NOTIFICATIONS: NotificationType[] = [
  {
    kind: 'info',
    id: '1',
    title: 'Dismiss notification'
  },
  {
    kind: 'info',
    id: '2',
    title: 'Fade notification',
    close: 'manual'
  }
];

describe('<Notifications /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(
      <Notifications notifications={NOTIFICATIONS} onRemove={() => {}} />
    );

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
});
