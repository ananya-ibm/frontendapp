/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react';
import { NavigationContainer } from '@exo/frontend-features-chrome-logic';
import { useTheme } from 'styled-components';
import { ExtensionNode } from '@exo/frontend-common-app-shell';
import { Button } from '@exo/frontend-components-base';
import { Menu, User, UserAdmin } from '@carbon/react/icons';
import { SidePanel } from '@exo/frontend-components-core';
import { useHistory } from 'react-router-dom';
import { useSessionContext } from '@exo/frontend-common-session-context';
import { ChromeConfig } from '@exo/frontend-features-chrome-ui';
import * as S from './Header.styles';

export const Header = ({ config }: { config: ChromeConfig }) => {
  const currentTheme = useTheme() as any;
  const session = useSessionContext();
  const history = useHistory();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <NavigationContainer
        depth={1}
        navigationKey={config.header.navigationKey!}
        navigationUrlType={config.header.navigationUrlType!}
        renderLoading={() => (
          <S.Header>
            <S.Logo href="/" className="logo" aria-label="Home Link">
              <currentTheme.static.Logo />
            </S.Logo>
          </S.Header>
        )}
        render={({ navItems }) => (
          <>
            {/* Responsive/mobile menu */}
            <SidePanel
              elevation={15}
              position="left"
              title="Menu"
              isOpen={menuOpen}
              onClose={() => setMenuOpen(false)}
            >
              <SidePanel.Section>
                {navItems.map((ni) => (
                  <div key={ni.title}>{ni.title}</div>
                ))}
              </SidePanel.Section>
            </SidePanel>

            <S.Header>
              <S.Logo href="/" className="logo" aria-label="Home Link">
                <currentTheme.static.Logo />
              </S.Logo>
              {navItems.map((ni) => (
                <div key={ni.title}>
                  <S.Link href={ni.url.replace('/catalog/', '/shop/')}>{ni.title}</S.Link>
                </div>
              ))}

              <S.Icons>
                <ExtensionNode extensions={config.header.extensions.icons} />

                <S.UserIcon>
                  <Button
                    variant="link"
                    icon={session?.type === 'USER' ? <UserAdmin size={24} /> : <User size={24} />}
                    onClick={() =>
                      session?.type === 'USER'
                        ? history.push('/account-profile/profile')
                        : history.push('/auth/login')
                    }
                  />
                </S.UserIcon>

                <S.MenuToggle>
                  <Button variant="link" icon={<Menu size={24} />} onClick={() => setMenuOpen(true)} />
                </S.MenuToggle>
              </S.Icons>
            </S.Header>
            <ExtensionNode extensions={config.header.extensions.extraHeaders} />
          </>
        )}
      />
    </>
  );
};
