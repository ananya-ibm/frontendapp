/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Button } from '@exo/frontend-components-base';
import React from 'react';
import * as S from './ContentTiles.styles';

export const ContentTile = ({ subTitle, title, body, image, ctaText, ctaLink }: Tile) => {
  return (
    <S.ContentTile>
      <S.Image>
        <img src={image} />
      </S.Image>
      {subTitle && <S.Subtitle>{subTitle}</S.Subtitle>}
      <S.Title>{title}</S.Title>
      <S.Body>{body}</S.Body>
      <S.CTA>
        <Button label={ctaText} href={ctaLink} variant="tertiary" />
      </S.CTA>
    </S.ContentTile>
  );
};

export const ContentTiles = ({ tiles }: Props) => {
  return (
    <S.ContentTiles tileCount={tiles.length}>
      {tiles.map((tile) => (
        <ContentTile key={`${tile.title}_${tile.image}`} {...tile} />
      ))}
    </S.ContentTiles>
  );
};

type Tile = {
  subTitle?: string;
  title: string;
  body: string;
  image: string;
  ctaText: string;
  ctaLink: string;
};

type Props = {
  tiles: Tile[];
};
