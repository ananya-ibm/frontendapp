/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useState } from 'react';
import { Search } from '@carbon/react/icons';
import { TextInput, Layer } from '@exo/frontend-components-base';
import * as S from './SearchInput.styles';
import { useDocumentEventListener } from '@exo/frontend-common-hooks';

export const SearchInput = ({ placeholder = 'Placeholder Text', onSearch }: Props) => {
  const [searchTerm, setSearchTerm] = useState<string>();
  const [isVisible, setIsVisible] = useState(false);

  useDocumentEventListener('keypress', (e) => {
    if (e.key === 'Enter' && isVisible) onSearch(searchTerm);
  });
  useDocumentEventListener('mouseover', (e) => {
    if ((e.target as any).id === 'search-section') setIsVisible(true);
  });
  useDocumentEventListener('mouseout', (e) => {
    if ((e.target as any).id !== 'search-section') setIsVisible(false);
  });

  // TODO: Move this <Layer> to Masthead somehow
  return (
    <Layer>
      <S.SearchInput id="search-section" visibleSearch={isVisible}>
        {!isVisible && <Search size={20} className="icon" />}
        <TextInput
          placeholder={placeholder}
          id="search-1"
          size="sm"
          name="search-in-header"
          labelText="Search"
          onChange={e => setSearchTerm(e.target.value)}
          type="search"
        />
      </S.SearchInput>
    </Layer>
  );
};

type Props = {
  placeholder?: string;
  onSearch: (q?: string) => void;
};
