/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useIntl } from '@exo/frontend-common-i18n';
import { Button, TextInput } from '@exo/frontend-components-base';
import React, { useRef } from 'react';
import * as S from './SearchForm.styles';

export const SearchForm = ({ onChange, defaultValue }: Props) => {
  const intl = useIntl('features.catalog.catalog-ui.components.SearchForm');
  const searchFieldRef = useRef<HTMLInputElement>(null);
  const callback = () => {
    onChange(searchFieldRef.current?.value!);
  };

  return (
    <S.Wrapper onSubmit={callback} key={defaultValue}>
      <TextInput
        id="searchField"
        labelText=""
        ref={searchFieldRef}
        size="lg"
        placeholder={intl.msg('textinput.search', 'Search') as string}
        defaultValue={defaultValue}
      />

      <Button size="field" onClick={callback} label={intl.msg('textinput.search', 'Search') as string} />
    </S.Wrapper>
  );
};

type Props = {
  onChange: (v: string) => void;
  defaultValue: string;
};
