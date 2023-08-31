/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './ProductHero.styles';

export const ProductHero = ({ id, name, description, fullImage }: Props) => {
  return (
    <S.ProductHero>
      <S.Banner>
        <S.Image image={fullImage} alt={`${id}-${name} Hero`} />
        <S.Content>
          <S.Title>{name}</S.Title>
          {description && <S.Description>{description}</S.Description>}
        </S.Content>
      </S.Banner>
    </S.ProductHero>
  );
};

type Props = {
  id: string;
  description?: string;
  fullImage: string;
  name: string;
};
