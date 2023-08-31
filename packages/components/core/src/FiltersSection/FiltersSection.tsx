/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { LayoutSpacing } from '../LayoutSpacing/LayoutSpacing';
import { SidePanel } from '../SidePanel/SidePanel';
import * as S from './FiltersSection.styles';

export const FiltersSection = ({ children, isFilterVisible, onHideFilter, selectedFilters }: Props) => {
  return (
    <>
      <S.FiltersSectionDesktop>
        <LayoutSpacing size="sm" />
        <h4>Filters</h4>
        { selectedFilters && selectedFilters }
        <LayoutSpacing size="xs" />
        {children}
      </S.FiltersSectionDesktop>
      <S.FiltersSectionMobile>
        { selectedFilters && selectedFilters }
        <SidePanel isOpen={isFilterVisible} onClose={onHideFilter} title={"Filters"}>
          <SidePanel.Body isScrolling>
            {isFilterVisible && children}
          </SidePanel.Body>
        </SidePanel>
      </S.FiltersSectionMobile>
    </>
  );
};

type Props = {
  children: any;
  isFilterVisible: boolean;
  onHideFilter: () => void;
  selectedFilters?: React.ReactElement;
}