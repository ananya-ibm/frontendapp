/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { Tag } from '@exo/frontend-components-base';
import * as S from './SelectedFilters.styles';

export const SelectedFilters = ({ selected, removeFacet }: Props) => {
  return selected.length > 0 ? (
    <S.Tags>
      {selected.map(s => {
        return (
          <Tag
            onClick={() => removeFacet(s.id)}
            variant="black-and-white"
            key={`tag-${s.id}`}
            label={s.label}
          />
        );
      })}
    </S.Tags>
  ) : null;
};

type Props = {
  selected: {
    id: string;
    label: string;
  }[];
  removeFacet: (facet: string) => void;
};
