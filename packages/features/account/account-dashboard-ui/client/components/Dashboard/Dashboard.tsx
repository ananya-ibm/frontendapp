/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { useLocation } from 'react-router-dom';
import { LogoutButtonContainer } from '@exo/frontend-features-authentication-logic';
import { Menu, LayoutSpacing } from '@exo/frontend-components-core';
import { Row, Column, Breadcrumb, Button, Grid } from '@exo/frontend-components-base';
import { useAppShellContext, isPermitted } from '@exo/frontend-common-app-shell';
import { useSessionContext } from '@exo/frontend-common-session-context';
import { useIntl } from '@exo/frontend-common-i18n';
import * as S from './Dashboard.styles';


// TODO: We should get all of this through props - not useLocation or useAppShellContext
export const Dashboard = ({ title, menus, children }: Props) => {
  const intl = useIntl('features.account.account-profile-ui.components');
  const appShellContext = useAppShellContext();
  const location = useLocation();
  const current = location.pathname.split('/')[1];
  const { roles } = useSessionContext();

  // TODO: we should move this to the navigation GQL service
  const accountMenus: MenuItem[] =
    appShellContext?.featureConfig?.account?.accounts?.map(menu => {
      return { ...menu, items: menu.items?.filter(item => isPermitted(item.id, roles)) ?? [] };
    }) ??
    menus ??
    [];
  const breadcrumbs = [
    { url: `/${current}`, label: current.split('-').join(' ') },
    { url: location.pathname, label: title }
  ];

  return (
    <S.Dashboard>
      <LayoutSpacing size="sm" />

      <Grid>
        <Row>
          <Column>
            <S.Header>
              <Breadcrumb path={breadcrumbs} />
              <S.Button>
                <LogoutButtonContainer
                  render={args => (
                    <>
                      <Button onClick={args.onLogout} label={intl.msg('Dashboard.LogoutButton', 'Logout')} />
                    </>
                  )}
                />
              </S.Button>
            </S.Header>
          </Column>
        </Row>

        <Row>
          <Column>
            <LayoutSpacing size="xs" />
          </Column>
        </Row>

        <Row>
          <Column md={'100%'} lg={'25%'}>
            {accountMenus && (
              <Menu
                activeUrl={location.pathname}
                items={accountMenus.map(a => ({
                  title: a.title,
                  isExpanded: a.id === current,
                  url: a.url,
                  items: a.items.map(b => ({
                    label: b.text,
                    url: b.url
                  }))
                }))}
              />
            )}
          </Column>
          <Column md={'100%'} lg={'75%'}>
            {title && <h1>{title}</h1>}
            <LayoutSpacing size="sm" />
            {children}
          </Column>
        </Row>
      </Grid>
    </S.Dashboard>
  );
};

type Props = {
  title: string;
  menus?: MenuItem[];
  children: any | any[];
};

type MenuItem = {
  title: string;
  id: string;
  url: string;
  items: {
    url: string;
    text: string;
  }[];
};
