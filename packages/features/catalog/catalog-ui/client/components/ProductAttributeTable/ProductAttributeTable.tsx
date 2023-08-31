/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { SkeletonLine } from '@exo/frontend-components-core';
import * as S from './ProductAttributeTable.styles';

export const ProductAttributeTable = ({ attributes }: Props) => {
  const categoryNames = new Set(attributes.map(a => a.categoryName));
  if (categoryNames.size > 1) {
    return (
      <>
        {[...categoryNames].map(cn => (
          <S.Section key={cn}>
            <S.Title>{cn}</S.Title>
            <S.Table>
              {attributes
                .filter(a => a.categoryName === cn)
                .map(attribute => (
                  <S.Row key={attribute.id}>
                    {attribute.name && <S.Text>{attribute.name}</S.Text>}
                    {attribute.value && <S.Text>{attribute.value?.value}</S.Text>}
                  </S.Row>
                ))}
            </S.Table>
          </S.Section>
        ))}
      </>
    );
  } else {
    return (
      <S.Table>
        {attributes.map(attribute => (
          <S.Row key={attribute.id}>
            {attribute.name && <S.Text>{attribute.name}</S.Text>}
            {attribute.value && <S.Text>{attribute.value?.value}</S.Text>}
          </S.Row>
        ))}
      </S.Table>
    );
  }
};

ProductAttributeTable.Skeleton = () => {
  return (
    <S.Table>
      {[0, 1, 2].map(s => (
        <S.Row key={`sk_${s}`}>
          <S.Text>
            <SkeletonLine />
          </S.Text>
          <S.Text>
            <SkeletonLine />
          </S.Text>
        </S.Row>
      ))}
    </S.Table>
  );
};

type Props = {
  attributes: {
    id: string;
    name: string;
    categoryName?: string;
    value: {
      value: string;
      id: string;
    };
  }[];
};
