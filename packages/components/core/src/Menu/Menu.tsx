/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from '@carbon/react/icons';
import * as S from './Menu.styles';

export const Menu = ({ items, activeUrl }: Props) => {
  const expandedItems = items.filter(i => i.isExpanded).map(i => i.url) ?? [];

  const [expanded, setExpanded] = useState<string[]>(expandedItems);

  useEffect(() => {
    if (expanded.toString() === expandedItems.toString()) return;
    setExpanded(expandedItems);
  }, [activeUrl]);

  const isExpanded = (s: Level1Item) => expanded.includes(s.url);

  const toggle = (s: Level1Item) => {
    setExpanded(ex => (isExpanded(s) ? ex.filter(e => e !== s.url) : [...ex, s.url]));
  };

  return (
    <>
      {items.map(l1 => (
        <S.Menu key={l1.url}>
          <S.Header>
            {l1.url ? <S.Title to={l1.url}>{l1.title ?? l1.url}</S.Title> : l1.title}
            <S.Icon onClick={() => toggle(l1)}>
              {isExpanded(l1) ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
            </S.Icon>
          </S.Header>
          <S.Content isExpanded={isExpanded(l1)}>
            <S.Items>
              {l1.items?.map(item => (
                <S.Link
                  className={item.url === activeUrl ? 'isActive' : undefined}
                  to={item.url}
                  key={item.url}
                >
                  {item.label}
                </S.Link>
              ))}
            </S.Items>
          </S.Content>
        </S.Menu>
      ))}
    </>
  );
};

type Level1Item = {
  title: React.ReactElement | string;
  url: string;
  isExpanded?: boolean;
  items: {
    url: string;
    label: string;
  }[];
};

type Props = {
  activeUrl?: string;
  items: Level1Item[];
};
