/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './Thumbnails.styles';

export const Thumbnails = ({ images, activeImage, onThumbnailClick }: Props) => {
  return (
    <S.Container>
      <S.Carousel>
        {images.map((img, idx) => (
          <S.Thumbnail isActive={activeImage === img || (activeImage === undefined && idx === 0)} key={img} onClick={() => onThumbnailClick(img)}>
            <S.Image src={img} alt="FPO 1" />
          </S.Thumbnail>
        ))}
      </S.Carousel>
    </S.Container>
  );
};

type Props = {
  images: string[];
  activeImage: string | undefined;
  onThumbnailClick: (img: string) => void;
};
