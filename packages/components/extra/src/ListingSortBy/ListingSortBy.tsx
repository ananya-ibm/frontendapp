/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { useIntl } from '@exo/frontend-common-i18n';
import { Dropdown } from '@exo/frontend-components-base';
import * as S from './ListingSortBy.styles';

export const ListingSortBy = ({ sort, onChange }: Props) => {
  const intl = useIntl('features.catalog.catalog-ui.components.ListingSortBy');
  const DEFAULT_SORT_OPTIONS = [
    { id: 'RELEVANCE', text: intl.msg('sortoption.relevance', 'Relevance') as string },
    {
      id: 'PRICE_ASCENDING',
      text: intl.msg('sortoption.pricelowtohigh', 'Price (Low to High)') as string
    },
    {
      id: 'PRICE_DESCENDING',
      text: intl.msg('sortoption.pricehightolow', 'Price (High to Low)') as string
    },
    { id: 'NAME', text: intl.msg('sortoption.name', 'Name') as string }
  ];
  const sortOptionslist = DEFAULT_SORT_OPTIONS;
  return (
    <S.ListingSortBy>
      <Dropdown
        id="Sort By"
        variant="inline"
        items={sortOptionslist}
        itemToString={item => (item ? item.text : '')}
        dropdownLabel={intl.msg('list.addtocart', 'Choose option') as string}
        selectedItem={sortOptionslist.find(so => so.id === sort) ?? sortOptionslist[0]}
        labelText={intl.msg('list.sortby', 'Sort by:') as string}
        onChange={a => onChange(a?.id!)}
      />
    </S.ListingSortBy>
  );
};

type Props = {
  sort?: string;
  sortOptions?: {
    id: string;
    text: string;
  }[];
  onChange: (sort: string) => void;
};
