/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { renderWithTheme as render } from '@testUtils';
import { axe } from 'jest-axe';
import { ThreeMediaCombo } from './ThreeMediaCombo';

const testProps = {
  title: 'Subheading',
  description:
    'Minim non ex aliqua aliquip nisi excepteur qui est consequat duis ut duis excepteur. Culpa nisi reprehenderit reprehenderit ea exercitation cupidatat nisi aute ex dolor nisi. Sit culpa voluptate id proident elit reprehenderit id. Incididunt nisi do in dolor veniam incididunt anim consectetur pariatur nostrud.',
  leftMedia: 'https://images.unsplash.com/photo-1578586524259-489a03948798',
  rightTopMedia: 'https://images.unsplash.com/photo-1575280768165-038666f3a978',
  rightTopTitle: 'rightTopTitle',
  rightBottomMedia: 'https://images.unsplash.com/photo-1519752594763-2633d8d4ea29',
  rightBottomTitle: 'rightBottomTitle'
};

describe('<ThreeMediaCombo /> component', () => {
  test('its snapshot matches', () => {
    const { container } = render(<ThreeMediaCombo {...testProps} />);

    expect(container).toBeDefined();
    expect(container.firstChild).toMatchSnapshot();
  });
  test('it passes an axe accesibility check', async () => {
    const { container } = render(<ThreeMediaCombo {...testProps} />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
