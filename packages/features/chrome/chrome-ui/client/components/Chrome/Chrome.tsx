/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/**
 * Chrome component wraps main application content
 * at the top-most level
 */

import React from 'react';
import loadable from '@loadable/component';
import { IntlProvider } from '@exo/frontend-common-i18n';
import { AppErrorBoundary, ChromeContainerRenderProps } from '@exo/frontend-features-chrome-logic';
import * as S from './Chrome.styles';
import { Notifications } from '../Notifications/Notifications';
import { AppErrorRenderer } from '../AppErrorRenderer/AppErrorRenderer';
import { Header } from '../../smart-components/Header/Header';
import { Footer } from '../../smart-components/Footer/Footer';
import { ChromeConfig } from '../../chromeConfig';
import { ChromeCSS } from '../ChromeCSS/ChromeCSS';
import { Helmet } from 'react-helmet-async';

export const Chrome = ({
  notifications,
  onRemoveNotification,
  config,
  styleLinks,
  renderHeader=(cfg) => <Header config={cfg} />,
  renderFooter=(cfg) => <Footer config={cfg} />,
  children
}: ChromeContainerRenderProps<ChromeConfig> & Props) => {
  return (
    <>
      <ChromeCSS />

      <Helmet>
        <title>{config.meta.title}</title>
        <meta name="description" content={config.meta.title} />
        <meta name="charSet" charSet="utf-8" />
        <meta
          name="viewport"
          content="minimum-scale=1,initial-scale=1, width=device-width, shrink-to-fit=no"
        />
        <meta name="theme-color" content="black" />
        <link rel="icon" href={config.meta.icon} />
        {styleLinks.map(s => (
          <link rel="stylesheet" href={s} />
        ))}
      </Helmet>

      <AppErrorBoundary fallbackComponent={AppErrorRenderer}>
        <S.Chrome>
          <S.HeaderSection>
            <IntlProvider
              translations={[
                { lang: 'de', messages: loadable.lib(() => import('../../translations/de')) },
                { lang: 'es', messages: loadable.lib(() => import('../../translations/es')) },
                { lang: 'hi', messages: loadable.lib(() => import('../../translations/hi')) },
                { lang: 'it', messages: loadable.lib(() => import('../../translations/it')) },
                { lang: 'sv', messages: loadable.lib(() => import('../../translations/sv')) }
              ]}
            >
              {renderHeader(config)}
              <S.Notifications className="notifications-wrapper">
                <Notifications notifications={notifications} onRemove={onRemoveNotification} />
              </S.Notifications>
            </IntlProvider>
          </S.HeaderSection>
          <S.Main>
            <AppErrorBoundary fallbackComponent={AppErrorRenderer}>{children}</AppErrorBoundary>
          </S.Main>
          <S.Footer>
            <IntlProvider
              translations={[
                { lang: 'de', messages: loadable.lib(() => import('../../translations/de')) },
                { lang: 'es', messages: loadable.lib(() => import('../../translations/es')) },
                { lang: 'hi', messages: loadable.lib(() => import('../../translations/hi')) },
                { lang: 'it', messages: loadable.lib(() => import('../../translations/it')) },
                { lang: 'sv', messages: loadable.lib(() => import('../../translations/sv')) }
              ]}
            >
              {renderFooter(config)}
            </IntlProvider>
          </S.Footer>
        </S.Chrome>
      </AppErrorBoundary>
    </>
  );
};

type Props = {
  renderHeader?: (cfg: ChromeConfig) => React.ReactElement;
  renderFooter?: (cfg: ChromeConfig) => React.ReactElement;
  children: any;
}