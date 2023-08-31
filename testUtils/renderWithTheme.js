/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ThemeProvider } from 'styled-components';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Theme } from '../packages/themes/automotive-theme/src';
import 'jest-styled-components';

const renderWithTheme = component =>
  render(
    <ThemeProvider theme={Theme}>
      <MemoryRouter>{component}</MemoryRouter>
    </ThemeProvider>
  );

export { renderWithTheme };
