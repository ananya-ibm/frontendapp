import React, { useEffect } from 'react';
import faker from 'faker';
import { ThemeProvider } from 'styled-components';
import { withThemesProvider } from 'ixl-frontend-storybook-theme-addon';
import { i18nDecorator } from 'ixl-frontend-storybook-i18n-addon';
import { action } from '@storybook/addon-actions';

// Yes, this looks strange, but the only way to get Storybook webpack
// to include all user configurable themes in build
import { Theme as theme0 } from '@exo-provider/frontend-theme-0';
import { Theme as theme1 } from '@exo-provider/frontend-theme-1';
import { Theme as theme2 } from '@exo-provider/frontend-theme-2';
import { Theme as theme3 } from '@exo-provider/frontend-theme-3';
import { Theme as theme4 } from '@exo-provider/frontend-theme-4';
import { Theme as theme5 } from '@exo-provider/frontend-theme-5';
import { Theme as theme6 } from '@exo-provider/frontend-theme-6';
import { Theme as theme7 } from '@exo-provider/frontend-theme-7';
import { Theme as theme8 } from '@exo-provider/frontend-theme-8';
import { Theme as theme9 } from '@exo-provider/frontend-theme-9';

const themeList = [theme0, theme1, theme2, theme3, theme4, theme5, theme6, theme7, theme8, theme9];

const MyThemeProvider = ({ theme, children }) => {
  useEffect(() => {
    const id = 'carbon-style';

    const $existing = document.getElementById(id);
    if ($existing) {
      $existing.parentNode.removeChild($existing);
    }

    const $head = document.head || document.getElementsByTagName('head')[0];
    const $style = document.createElement('style');

    $style.id = id;

    $style.type = 'text/css';
    if (theme.globalStyles) {
      $style.appendChild(document.createTextNode(theme.globalStyles?.cssRules ?? ''));
    } else {
      // TODO: This is the old style theme
      $style.appendChild(document.createTextNode(theme.styles ?? ''));
    }

    $head.insertBefore($style, $head.firstChild);

    // TODO: Handle globalStyles.cssUrls
  });

  return (
    <ThemeProvider theme={theme}>
      <>
        {theme.GlobalStyles && <theme.GlobalStyles />}

        {theme.globalStyles?.cssComponent && <theme.globalStyles.cssComponent />}
        {theme.name !== 'Default'  
        ? (
          <div style={{ background: theme.colors.backgrounds.page }}>
            {children}
          </div>
        )
        : children}
      </>
    </ThemeProvider>
  );
};

const translations = [
  require.context('../packages/features/account/account-profile-ui/client/translations'),
  require.context('../packages/features/chrome/chrome-ui/client/translations'),
  require.context('../packages/features/checkout/checkout-ui/client/translations'),
  require.context('../packages/features/cart/cart-ui/client/translations'),
  require.context('../packages/features/authentication/authentication-ui/client/translations'),
  require.context('../packages/features/catalog/catalog-ui/client/translations')
];

export const decorators = [
  withThemesProvider(
    themeList.filter(t => t.name),
    MyThemeProvider
  ),
  Story => {
    faker.seed(123);
    return <Story />;
  },
  Story => {
    useEffect(() => {
      const listener = document.addEventListener('exo-event', e => {
        // @ts-ignore
        action('exoEvent')(e.detail);
      });
      return () => {
        document.removeEventListener('exo-event', listener);
      };
    });
    return <Story />;
  },
  i18nDecorator(translations)
];

export const parameters = {
  grid: { cellSize: 8 },
  a11y: {},
  locale: 'en',
  locales: {
    en: { title: 'English', left: '🇺🇸' },
    fr: { title: 'France - Français', left: '🇫🇷' },
    de: { title: 'Germany - German', left: '🇩🇪' },
    sv: { title: 'Sweden - Swedish', left: '🇸🇪' },
    it: { title: 'Italy - Italian', left: '🇮🇹' },
    es: { title: 'Spain - Spanish', left: '🇪🇸' },
    hi: { title: 'India - Hindi', left: '🇮🇳' }
  },
  backgrounds: {
    default: 'white',
    values: [
      {
        name: 'white',
        value: '#ffffff'
      },
      {
        name: 'gray 10',
        value: '#f4f4f4'
      },
      {
        name: 'gray 90',
        value: '#262626'
      },
      {
        name: 'gray 100',
        value: '#161616'
      },
      {
        name: 'black',
        value: '#000000'
      }
    ]
  }
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: themeList[0],
    toolbar: {
      icon: 'cog',
      // array of plain string values or MenuItem shape (see below)
      items: themeList.filter(t => t.name).map(t => t.name)
    }
  }
};
