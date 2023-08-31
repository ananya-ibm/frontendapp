/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useState } from 'react';
import { Button, TextInput } from '@exo/frontend-components-base';
import * as S from './Header.styles';
import { useScroll, useDocumentEventListener } from '@exo/frontend-common-hooks';
import { CaretLeft, CaretRight } from '@carbon/react/icons';

export const Header = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>();

  const [navigationRef, { canScrollRight, canScrollLeft, scrollRight, scrollLeft }] = useScroll<HTMLDivElement>();

  useDocumentEventListener('keypress', (e) => {
    if (e.key === 'Enter' && props.isSearchVisible) props.onSearch?.(searchTerm!);
  });

  return (
    <S.HeaderWrapper>
      <S.HeaderRow>
        <S.MenuToggle>{props.menuToggle}</S.MenuToggle>
        <S.Logo hasMenuToggle={!!props.menuToggle}>{props.logo}</S.Logo>
        {props.title && <S.Title>{props.title}</S.Title>}
        {props.navigation && (
          <S.NavigationWrapper>
            <S.ScrollPane canScrollLeft={canScrollLeft}>
              {canScrollLeft ? <Button variant="light" icon={<CaretLeft size="20" />} onClick={scrollLeft} /> : <div></div>}
              <S.ScrollArea>
                <S.Navigation ref={navigationRef}>{props.navigation}</S.Navigation>
              </S.ScrollArea>
              {canScrollRight ? <Button variant="light" icon={<CaretRight size="20" />} onClick={scrollRight} /> : <div></div>}
            </S.ScrollPane>
          </S.NavigationWrapper>
        )}
        <S.Search>
          {props.isSearchVisible ? (
            <TextInput
              placeholder={'Search'}
              id="search-in-header"
              name="search-in-header"
              size="lg"
              labelText="Search"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              type="search"
              onBlur={() => props.onHideSearch?.()}
              autoFocus
            />
          ) : undefined}
        </S.Search>
        <S.Actions>{props.actions}</S.Actions>
      </S.HeaderRow>
    </S.HeaderWrapper>
  );
};

type Props = {
  menuToggle?: React.ReactElement;
  logo?: React.ReactElement;
  title?: React.ReactElement;
  actions?: React.ReactElement;
  navigation?: React.ReactElement;

  isSearchVisible?: boolean;
  onSearch?: (val: string) => any;
  onHideSearch?: () => any;
};
