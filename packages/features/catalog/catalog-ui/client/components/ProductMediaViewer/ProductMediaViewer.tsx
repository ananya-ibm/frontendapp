/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useState } from 'react';
import { ProductImage } from './ProductImage';
import { Thumbnails } from './Thumbnails';
import * as S from './ProductMediaViewer.styles';

const prefix = (n: number) => (n === 0 ? '' : ` ${prefix(n - 1)}`);

export const ProductMediaViewer = ({ fullImage, additionalImages }: Props) => {
  const [selectedThumbnail, setSelectedThumbnail] = useState<string | undefined>(undefined);

  return (
    <S.Container>
      <ProductImage selectedThumbnail={selectedThumbnail ?? fullImage} />
      {additionalImages && additionalImages.length > 1 && (
        <Thumbnails
          activeImage={selectedThumbnail}
          images={additionalImages}
          onThumbnailClick={setSelectedThumbnail}
        />
      )}
    </S.Container>
  );
};

ProductMediaViewer.Skeleton = () => {
  return (
    <S.Container>
      <ProductImage.Skeleton />

      {/* A trick to get around duplicate keys which are based on the URL */}
      <Thumbnails
        onThumbnailClick={() => {}}
        activeImage={''}
        images={[0, 1, 2, 3].map(
          n =>
            `${prefix(
              n
            )}data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP88B8AAuUB8e2ujYwAAAAASUVORK5CYII=`
        )}
      />
    </S.Container>
  );
};

type Props = {
  fullImage: string;
  additionalImages: string[];
};
