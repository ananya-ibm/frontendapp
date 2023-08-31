/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Grid, Row, Column } from '@exo/frontend-components-base';
import * as S from './FourCardDisplay.styles';

export const FourCardDisplay = ({ cards }: Props) => {
  return (
    <S.FourCardDisplay>
      <Grid>
        {cards?.length === 4 && (
          <Row>
            <Column sm="25%">
              <div className="cds--aspect-ratio cds--aspect-ratio--1x1">
                <div className="cds--aspect-ratio--object">
                  <S.Image src={cards[0].image} />
                </div>
              </div>

              <S.Title>{cards[0].title}</S.Title>
            </Column>
            <Column sm="25%">
              <div className="cds--aspect-ratio cds--aspect-ratio--1x1">
                <div className="cds--aspect-ratio--object">
                  <S.Image src={cards[1].image} />
                </div>
              </div>
              <S.Title>{cards[1].title}</S.Title>
            </Column>
            <Column sm="25%">
              <div className="cds--aspect-ratio cds--aspect-ratio--1x1">
                <div className="cds--aspect-ratio--object">
                  <S.Image src={cards[2].image} />
                </div>
              </div>
              <S.Title>{cards[2].title}</S.Title>
            </Column>
            <Column sm="25%">
              <div className="cds--aspect-ratio cds--aspect-ratio--1x1">
                <div className="cds--aspect-ratio--object">
                  <S.Image src={cards[3].image} />
                </div>
              </div>
              <S.Title>{cards[3].title}</S.Title>
            </Column>
          </Row>
        )}
      </Grid>
    </S.FourCardDisplay>
  );
};

type Props = {
  cards: {
    title: string;
    image: string;
  }[];
};
