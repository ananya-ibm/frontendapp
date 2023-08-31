/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql } from '@apollo/client';
import { useProductSearch } from '@exo/frontend-features-catalog-logic';
import { useCombobox } from 'downshift';
import { useEffect, useState } from 'react';

const fragment = gql`
  fragment SearchList on PrdResultConnection {
    edges {
      cursor
      node {
        id
        partnumber
        slug
        name
        thumbnail
        type
      }
    }
  }
`;

// TODO: Maybe move this to some logic package
export const useQuickOrderAutocomplete = ({ onSelectProduct }: Props) => {
  const [inputItems, setInputItems] = useState<any[]>([]);
  const [query, setQuery] = useState('');

  const { data, loading } = useProductSearch({ currency: 'USD', searchTerm: query }, fragment);

  useEffect(() => {
    if (loading) return;
    setInputItems((data?.products as any)?.edges?.map(e => e.node) ?? []);
  }, [data, loading]);

  const stateReducer = (state, actionAndChanges) => {
    const { type, changes } = actionAndChanges;
    switch (type) {
      case useCombobox.stateChangeTypes.InputChange:
        return {
          ...changes
        };
      case useCombobox.stateChangeTypes.ItemClick:
      case useCombobox.stateChangeTypes.InputKeyDownEnter:
        onSelectProduct({
          id: changes.selectedItem.id,
          partnumber: changes.selectedItem.partnumber
        });
        return {
          ...changes,
          ...(state.highlightedIndex > -1 && {
            inputValue: ''
          })
        };
      default:
        return changes;
    }
  };

  const { isOpen, getMenuProps, getInputProps, highlightedIndex, getItemProps } = useCombobox({
    stateReducer,
    items: inputItems,
    itemToString: (item: any) => item.name ?? '',
    onInputValueChange: ({ inputValue }) => {
      setQuery(inputValue!);
    }
  });

  return {
    getInputProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
    isOpen,
    items: inputItems
  };
};

type Props = {
  onSelectProduct: (props: { id: string; partnumber: string }) => void;
};
