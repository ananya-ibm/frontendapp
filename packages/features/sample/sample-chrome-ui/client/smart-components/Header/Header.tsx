/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { useTheme } from 'styled-components';
import { ExtensionNode } from '@exo/frontend-common-app-shell';
import { Action } from '@exo/frontend-components-base';
import { User } from '@carbon/react/icons';
import { ChromeConfig } from '@exo/frontend-features-chrome-ui';
import { Masthead } from '@exo/frontend-components-core';

const DEFAULT_LINKS = [
  { href: '#1', label: 'Link 1' }, 
  { href: '#2', label: 'Link 2' }, 
  { href: '#3', label: 'Link 3' } 
];

export const Header = ({ config }: { config: ChromeConfig }) => {
  const currentTheme = useTheme() as any;

  const links = config.header.fixedLinks ?? DEFAULT_LINKS;

  return (
    <>
      <Masthead>
        <Masthead.Header
          logo={<Action href="/" icon={<currentTheme.static.Logo />} />}
          navigation={
            <>
              {links?.map(l => <Action key={l.href} href={l.href} label={l.label} />)}
            </>
          }
          actions={
            <>
              <ExtensionNode extensions={config.header.extensions.icons} />

              <Action icon={<User size={24} />} onClick={() => window.alert('To be implemented')} />
            </>
          }
        />
      </Masthead>

      <ExtensionNode extensions={config.header.extensions.extraHeaders} />
    </>
  );
};
