/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

export { default as ThemeProvider } from './ThemeProvider';
export { default as themeList } from './themeList';
export { default as setTheme } from './setTheme';
export { default as Theme } from './Theme';

declare global {
  interface Window {
    exo_theme: any;
  }
}
