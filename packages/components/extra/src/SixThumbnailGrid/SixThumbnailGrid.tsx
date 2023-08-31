/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Grid, Row, Column } from '@exo/frontend-components-base';
import * as S from './SixThumbnailGrid.styles';

export const SixThumbnailGrid = ({ cards }: Props) => {
  return (
    <S.SixThumbnailGrid>
      {cards?.length === 6 && (
        <Grid isFluid>
          <Row>
            <Column sm="100%" lg="3" xl="5">
              <div className="cds--aspect-ratio cds--aspect-ratio--1x1">
                <div className="cds--aspect-ratio--object">
                  <S.Image src={cards[0].image} />
                </div>
              </div>

              <S.Title>{cards[0].title}</S.Title>
            </Column>
            <Column sm="100%" lg="3" xl="5">
              <div className="cds--aspect-ratio cds--aspect-ratio--1x1">
                <div className="cds--aspect-ratio--object">
                  <S.Image src={cards[1].image} />
                </div>
              </div>
              <S.Title>{cards[1].title}</S.Title>
            </Column>
            <Column sm="100%" lg="3" xl="5">
              <div className="cds--aspect-ratio cds--aspect-ratio--1x1">
                <div className="cds--aspect-ratio--object">
                  <S.Image src={cards[2].image} />
                </div>
              </div>
              <S.Title>{cards[2].title}</S.Title>
            </Column>
          </Row>
          <Row>
            <Column sm="100%" lg="3" xl="5">
              <div className="cds--aspect-ratio cds--aspect-ratio--1x1">
                <div className="cds--aspect-ratio--object">
                  <S.Image src={cards[3].image} />
                </div>
              </div>

              <S.Title>{cards[3].title}</S.Title>
            </Column>
            <Column sm="100%" lg="3" xl="5">
              <div className="cds--aspect-ratio cds--aspect-ratio--1x1">
                <div className="cds--aspect-ratio--object">
                  <S.Image src={cards[4].image} />
                </div>
              </div>
              <S.Title>{cards[4].title}</S.Title>
            </Column>
            <Column sm="100%" lg="3" xl="5">
              <div className="cds--aspect-ratio cds--aspect-ratio--1x1">
                <div className="cds--aspect-ratio--object">
                  <S.Image src={cards[5].image} />
                </div>
              </div>
              <S.Title>{cards[5].title}</S.Title>
            </Column>
          </Row>
        </Grid>
      )}
    </S.SixThumbnailGrid>
  );
};

type Props = {
  cards: {
    title: string;
    image: string;
  }[];
};
