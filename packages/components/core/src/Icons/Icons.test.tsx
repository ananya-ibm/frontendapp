/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable array-callback-return */
import React from 'react';
import { render } from '@testing-library/react';
import { axe } from 'jest-axe';
import * as Icons from './Icons';

const testProps = {
  color: '#000',
  width: '24px'
};

Object.values(Icons).map(Icon => {
  describe('<Icon /> component', () => {
    test('its snapshot matches', () => {
      const { container } = render(<Icon {...testProps} />);

      expect(container.firstChild).toMatchSnapshot();
    });
    test('it passes an axe accesibility check', async () => {
      const { container } = render(<Icon {...testProps} />);
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
