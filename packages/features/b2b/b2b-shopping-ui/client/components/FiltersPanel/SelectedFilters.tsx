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

const getLabelText = (facetName: string, label: string) => `${facetName} : ${label}`;

export const SelectedFilters = ({ selected, removeFacet }: Props) => {
  return (
    <S.Tags>
      {selected.map(s => {
        return (
          <Tag
            onClick={() => removeFacet(s.code)}
            key={`tag-${s.code}`}
            variant="black-and-white"
            label={getLabelText(s.facet.name, s.label)}
          />
        );
      })}
    </S.Tags>
  );
};

type Props = {
  selected: {
    code: string;
    label: string;
    facet: {
      name: string;
    };
  }[];
  removeFacet: (facet: string) => void;
};
