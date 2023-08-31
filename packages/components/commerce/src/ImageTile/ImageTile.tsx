/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';

export const ImageTile = ({ src, alt, className = 'image' }: Props) => (
  <img
    className={className}
    src={src}
    alt={alt}
    onError={(e) => {
      (e.target as HTMLImageElement).onerror = null;
      (e.target as HTMLImageElement).src =
        process.env.PRODUCT_PLACEHOLDER! ?? 'https://via.placeholder.com/400x400';
    }}
  />
);

type Props = {
  src: string;
  alt?: string;
  className?: string;
};
