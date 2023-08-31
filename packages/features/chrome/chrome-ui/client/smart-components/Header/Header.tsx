/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/jsx-props-no-spreading */

import React, { useState } from 'react';
import { ExtensionNode } from '@exo/frontend-common-app-shell';
import { useSessionContext } from '@exo/frontend-common-session-context';
// eslint-disable-next-line node/no-restricted-import
import { useTheme } from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Masthead } from '@exo/frontend-components-core';
import { NavigationContainer } from '@exo/frontend-features-chrome-logic';
import { Search } from '@carbon/react/icons';
import { Action } from '@exo/frontend-components-base';
import { UserAvatar, Earth } from '@carbon/react/icons';
import { ChromeConfig } from '../../chromeConfig';
import loadable from '@loadable/component';


export const Header = ({ config }: { config: ChromeConfig }) => {
  const history = useHistory();
  const session = useSessionContext();
  const currentTheme = useTheme() as any;
  const [showSearch, setShowSearch] = useState(false);
  const [changeLangModal, setChangeLangModal] = useState(false);

  const language = session.language ?? 'en'

  const LocalePreferenceModal = loadable(() => import('@exo/frontend-features-locale-selector-ui'), {
    resolveComponent: loaded => loaded.LocalePreferenceModal,
    fallback: <div></div>
  })

  if (config.header.fixedLinks) {
    return (
      <>
        <Masthead>
          <Masthead.Header
            logo={<Action href="/" icon={<currentTheme.static.Logo />} />}
            navigation={
              <>
                {config.header.fixedLinks?.map((ni) => (
                  <Action key={ni.href} href={ni.href} label={ni.label} />
                ))}
              </>
            }
            actions={
              <ExtensionNode extensions={config.header.extensions.icons} />
            }
            menuToggle={
              <Masthead.MenuToggle
                render={(isOpen, onClose) => (
                  <Masthead.NavMobile
                    isOpen={isOpen}
                    onClose={onClose}
                    logo={<Action name="Logo" href="/" icon={<currentTheme.static.Logo />} />}
                    actions={
                      <>
                        {config.header.fixedLinks?.map((ni) => (
                          <Action key={ni.href} href={ni.href} label={ni.label} />
                        ))}
                      </>
                    }
                  />
                )}
              />
            }
          />
        </Masthead>

        <ExtensionNode extensions={config.header.extensions.extraHeaders} />
      </>
    );
  }

  // TODO: We can make this nicer with a proper Skeleton state
  return (
    <>
      <NavigationContainer
        depth={1}
        navigationKey={config.header.navigationKey!}
        navigationUrlType={config.header.navigationUrlType!}
        // TODO: Improve loading state of Masthead
        renderLoading={() => (
          <Masthead>
            <Masthead.Header logo={<Action href="/" icon={<currentTheme.static.Logo />} />} />
          </Masthead>
        )}
        render={({ navItems }) => (
          <>
            <Masthead>
              <Masthead.Header
                logo={<Action name="Logo" href="/" icon={<currentTheme.static.Logo />} />}
                actions={
                  <>
                    {!showSearch && (
                      <Action
                        onClick={() => setShowSearch(true)}
                        icon={<Search size={20} />}
                      />
                    )}
                    <Action
                      // TODO: Add translation for this
                      label={session?.username ?? 'Sign in'}
                      href={session?.type === 'USER' ? '/account-profile/profile' : '/auth/login'}
                      icon={<UserAvatar size={20} />}
                    />
                    <Action
                      label={language.replace(/[-_][a-z]+$/i, '').toUpperCase()}
                      onClick={() => setChangeLangModal(true)}
                      icon={<Earth size={20} />} 
                    />
                    {changeLangModal && <LocalePreferenceModal onClose={() => setChangeLangModal(false)} />}
                    <ExtensionNode extensions={config.header.extensions.icons} />
                  </>
                }
                menuToggle={
                  <Masthead.MenuToggle
                    render={(isOpen, onClose) => (
                      <Masthead.NavMobile
                        isOpen={isOpen}
                        onClose={onClose}
                        logo={<Action name="Logo" href="/" icon={<currentTheme.static.Logo />} />}
                        actions={
                          <>
                            {navItems.map((ni) => (
                              <Action key={ni.url} href={ni.url} label={ni.text} />
                            ))}
                          </>
                        }
                      />
                    )}
                  />
                }
                isSearchVisible={showSearch}
                onHideSearch={() => setShowSearch(false)}
                onSearch={(term) => history.push(`/catalog/search/${term}`)}
                navigation={
                  !showSearch ? (
                    <>
                      {navItems.map((ni) => (
                        <Action key={ni.url} href={ni.url} label={ni.text} />
                      ))}
                    </>
                  ) : undefined
                }
              />
            </Masthead>

            <ExtensionNode extensions={config.header.extensions.extraHeaders} />
          </>
        )}
      />
    </>
  );
};
