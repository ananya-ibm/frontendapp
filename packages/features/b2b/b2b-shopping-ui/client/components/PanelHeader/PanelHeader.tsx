/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { SidePanel } from '@exo/frontend-components-core';
import { TableToolbar, TableSection } from '@exo/frontend-components-base';
import { Filter, Settings } from '@carbon/react/icons';
import { useHistory } from 'react-router-dom';
import * as S from './PanelHeader.styles';

export const PanelHeader = ({
  query,
  isFilterShown = false,
  onFilterClick,
  isFilterDisabled = false,
  filterCount = 0
}: Props) => {
  const history = useHistory();
  return (
    <SidePanel.Section>
      <S.Wrapper>
        <TableSection>
          <TableToolbar
            hasSearch
            value={query}
            onSearch={e => {
              history.push(`/shop/search/${encodeURIComponent(e ?? '')}`);
            }}
            onClearSearch={() => console.log('*******************')}
          >
            {!isFilterDisabled && (
              <S.ToolbarButton
                className="icons"
                isSelected={isFilterShown}
                onClick={() => onFilterClick?.()}
                isHighlighted={filterCount > 0}
              >
                {filterCount > 0 && <S.FilterCount>{filterCount}</S.FilterCount>}
                <Filter size={32} aria-label="Filter" />
              </S.ToolbarButton>
            )}
            <S.ToolbarButton className="icons">
              <Settings size={32} aria-label="Settings" />
            </S.ToolbarButton>
          </TableToolbar>
        </TableSection>
      </S.Wrapper>
    </SidePanel.Section>
  );
};

type Props = {
  isFilterDisabled?: boolean;
  isFilterShown?: boolean;
  filterCount?: number;
  onFilterClick?: () => void;
  query?: string;
};
