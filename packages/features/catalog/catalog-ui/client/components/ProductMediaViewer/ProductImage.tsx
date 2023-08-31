/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './ProductImage.styles';

export const ProductImage = ({ selectedThumbnail }: { selectedThumbnail: string }) => {
  return (
    <S.Media>
      <S.Image src={selectedThumbnail} alt="ALT" />
    </S.Media>
  );
};

ProductImage.Skeleton = () => {
  return (
    <S.Media>
      <S.Image
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP88B8AAuUB8e2ujYwAAAAASUVORK5CYII="
        alt="ALT"
      />
    </S.Media>
  );
};
