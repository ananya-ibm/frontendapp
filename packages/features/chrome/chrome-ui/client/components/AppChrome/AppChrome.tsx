/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { AppErrorBoundary, ChromeContainerRenderProps } from '@exo/frontend-features-chrome-logic';
import { Helmet } from 'react-helmet-async';
import {
  HeaderSideNavItems,
  SideNav,
  SideNavItems,
  HeaderGlobalBar,
  HeaderGlobalAction,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  Header,
  HeaderMenuButton,
  SkipToContent
} from '@carbon/react';
import * as S from './AppChrome.styles';
import { Notifications } from '../Notifications/Notifications';
import { ChromeCSS } from '../ChromeCSS/ChromeCSS';
import { AppErrorRenderer } from '../AppErrorRenderer/AppErrorRenderer';
import { Notification, Switcher, Search } from '@carbon/react/icons';
import { Layer } from '@exo/frontend-components-base';
import { useHistory } from 'react-router-dom';

export const AppChrome = ({
  notifications,
  onRemoveNotification,
  config,
  styleLinks,
  renderSideNav,
  isSideNavExpanded,
  onClickSideNavExpand,
  children
}: // TODO: Fix the any type here
ChromeContainerRenderProps<Required<EXOFeatureConfig>['chrome']> & Props) => {
  const history = useHistory();

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
        {styleLinks.map((s) => (
          <link rel="stylesheet" href={s} />
        ))}
      </Helmet>

      <AppErrorBoundary fallbackComponent={AppErrorRenderer}>
        <S.App>
          <>
            <Header aria-label="IBM Platform Name">
              <SkipToContent />

              <HeaderMenuButton
                aria-label="Open menu"
                onClick={onClickSideNavExpand}
                isActive={isSideNavExpanded}
              />

              {/* TODO: Add support for logo */}
              <HeaderName href="#" prefix='IBM'>
                EXO Studio
              </HeaderName>

              <HeaderNavigation aria-label="navigation">
                {config.header.fixedLinks?.map(li => (
                  <HeaderMenuItem key={li.href} href="#" onClick={() => history.push(li.href)}>{li.label}</HeaderMenuItem>
                ))}
              </HeaderNavigation>

              {/* TODO: Actions */}
              <HeaderGlobalBar>
                <HeaderGlobalAction aria-label="Search" onClick={() => {}}>
                  <Search size={20} />
                </HeaderGlobalAction>
                <HeaderGlobalAction aria-label="Notifications" onClick={() => {}}>
                  <Notification size={20} />
                </HeaderGlobalAction>
                <HeaderGlobalAction
                  aria-label="App Switcher"
                  onClick={() => {}}
                  tooltipAlignment="end"
                >
                  <Switcher size={20} />
                </HeaderGlobalAction>
              </HeaderGlobalBar>

              <SideNav aria-label="Side navigation" expanded={isSideNavExpanded} isPersistent={!!renderSideNav}>
                <SideNavItems>
                  <HeaderSideNavItems hasDivider={true}>
                    {config.header.fixedLinks?.map(li => (
                      <HeaderMenuItem key={li.href} href={li.href}>{li.label}</HeaderMenuItem>
                    ))}
                  </HeaderSideNavItems>

                  {renderSideNav?.()}
                </SideNavItems>
              </SideNav>
            </Header>

            <S.Notifications className="notifications-wrapper">
              <Notifications notifications={notifications} onRemove={onRemoveNotification} />
            </S.Notifications>

            <S.Main hasnavigation={(!!renderSideNav).toString()}>
              <Layer>
                {children}
              </Layer>
            </S.Main>
          </>
        </S.App>
      </AppErrorBoundary>
    </>
  );
};

type Props = {
  children: any;
  renderSideNav?: () => React.ReactElement;
  isSideNavExpanded: boolean;
  onClickSideNavExpand: () => void;
};

