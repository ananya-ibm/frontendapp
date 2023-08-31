/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import 'cross-fetch/polyfill';
import { ShoppingBag, Store, DataReference } from '@carbon/react/icons';
import { SideNavMenu, SideNavMenuItem } from '@carbon/react';
import { EntityNavigationContainerRenderProps } from '@exo/frontend-features-studio-logic';

const ICONS = {
  commerce: ShoppingBag,
  marketplace: Store
};

export const Sidebar = ({ entities, selected, onClick }: EntityNavigationContainerRenderProps & Props) => {
  const groups = Object.keys(entities).sort();
  return (
    <>
      {groups.map((g) => (
        <SideNavMenu
          isActive={!!entities[g].find(d => d.type === selected)}
          renderIcon={ICONS[g] ?? DataReference}
          title={g[0].toUpperCase() + g?.slice(1)}
          defaultExpanded={!!entities[g].find(d => d.type === selected)}
          key={g}
        >
          {entities[g].map((d) => (
            <SideNavMenuItem isActive={d.type === selected} key={d.name} href="#" onClick={() => onClick(d.type)}>
              {d.name}
            </SideNavMenuItem>
          ))}
        </SideNavMenu>
      ))}
    </>
  );
};

type Props = {
  selected: string | undefined;
  onClick: (s: string) => void;
}