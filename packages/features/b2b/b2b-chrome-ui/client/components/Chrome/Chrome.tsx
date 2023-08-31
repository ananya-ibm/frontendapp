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
import { AppErrorBoundary, ChromeContainerRenderProps } from '@exo/frontend-features-chrome-logic';
import { Helmet } from 'react-helmet-async';
import {
  ChromeConfig,
  ChromeCSS,
  AppErrorRenderer,
  Notifications
} from '@exo/frontend-features-chrome-ui';
import * as S from './Chrome.styles';
import { Header } from '../../smart-components/Header/Header';
import { Footer } from '../../smart-components/Footer/Footer';

export const Chrome = ({
  notifications,
  onRemoveNotification,
  config,
  styleLinks,
  children
}: ChromeContainerRenderProps<ChromeConfig> & { children: any }) => {
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

      <S.Chrome>
        <S.HeaderSection>
          <Header config={config} />
          <S.Notifications className="notifications-wrapper">
            <Notifications notifications={notifications} onRemove={onRemoveNotification} />
          </S.Notifications>
        </S.HeaderSection>
        <S.Main>
          <AppErrorBoundary fallbackComponent={AppErrorRenderer}>{children}</AppErrorBoundary>
        </S.Main>
        <S.Footer>
          <Footer config={config} />
        </S.Footer>
      </S.Chrome>
    </>
  );
};
