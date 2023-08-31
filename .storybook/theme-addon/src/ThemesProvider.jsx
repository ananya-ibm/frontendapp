/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import addons from '@storybook/addons';
import * as React from 'react';
import events from './events';

export const ThemesProvider = ({ children, themes, CustomThemeProvider, context }) => {
  const initialTheme =
    window.__theme ??
    themes.find(t => t.name === context.globals.theme) ??
    themes[0]; // );

  const [theme, setTheme] = React.useState(undefined);

  if (theme === undefined) {
    setTheme(initialTheme);
    addons.getChannel().emit(events.selectTheme, initialTheme);
  }

  const onUpdateTheme = t => {
    const theme = themes.find(th => th.name === t.name);

    t.GlobalStyles = theme.GlobalStyles;
    setTheme(t);

    window.__theme = t;
  };

  const onSelectThemeByName = (t, channel) => {
    const theme = themes.find(th => th.name === t);
    setTheme(theme);

    window.__theme = theme;
    channel.emit(events.selectTheme, theme);
  };

  React.useLayoutEffect(() => {
    const channel = addons.getChannel();
    channel.on('globalsUpdated', (t) => onSelectThemeByName(t.globals.theme, channel));
    channel.on(events.updateTheme, onUpdateTheme);
    channel.emit(events.setAvailableThemes, themes);
    return () => {
      const channel = addons.getChannel();
      channel.removeListener(events.updateTheme, onUpdateTheme);
    };
  });

  return <CustomThemeProvider theme={theme} children={children} />;
};
