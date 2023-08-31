/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import Theme from './Theme';

export const ThemeProvider = ({ children }: Props) => (
  <SCThemeProvider theme={Theme}>
    <>{children}</>
  </SCThemeProvider>
);

type Props = {
  children: React.ReactElement;
};
