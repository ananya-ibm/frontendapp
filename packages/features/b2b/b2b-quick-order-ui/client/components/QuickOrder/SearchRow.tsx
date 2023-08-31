/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useState } from 'react';
import { LoadingIndicator, TextInput } from '@exo/frontend-components-base';
import * as S from './QuickOrder.styles';

export const SearchRow = ({ onSearch, placeholder, errorMessage, isLoading }: Props) => {
  const [value, setValue] = useState('');

  return (
    <tr>
      <S.Td>
        <form
          id="quickorder-search"
          onSubmit={e => {
            e.preventDefault();
            onSearch(value);
            setValue('');
          }}
        >
          <TextInput
            labelText="Search Product SKU"
            type="text"
            id="quick-search-id"
            placeholder={placeholder}
            onChange={e => setValue(e.target.value)}
            errorText={errorMessage}
            value={value}
          />
          {isLoading && (
            <S.Loading>
              <LoadingIndicator type="inline" label="Searching..." />
            </S.Loading>
          )}
        </form>
      </S.Td>
      <S.Td />
      <S.Td />
      <S.Td />
      <S.Td />
      <S.Td />
    </tr>
  );
};

type Props = {
  onSearch: (s: string) => any;
  placeholder: string;
  errorMessage: string;
  isLoading: boolean;
};
