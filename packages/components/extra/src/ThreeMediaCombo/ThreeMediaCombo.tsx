/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Grid, Row, Column } from '@exo/frontend-components-base';
import * as S from './ThreeMediaCombo.styles';

export const ThreeMediaCombo = ({
  title,
  description,
  leftMedia,
  rightTopMedia,
  rightTopTitle,
  rightBottomMedia,
  rightBottomTitle
}: Props) => {
  return (
    <S.ThreeMediaCombo>
      <Grid>
        <S.Title>{title}</S.Title>
        <Row>
          <Column sm={'100%'}>
            <S.Text>{description}</S.Text>
          </Column>
        </Row>
        <Row>
          <Column sm={'50%'} lg={'70%'}>
            <div className="cds--aspect-ratio cds--aspect-ratio--16x9">
              <div className="cds--aspect-ratio--object">
                <S.Image src={leftMedia} alt={title} />
              </div>
            </div>
          </Column>
          <Column sm="50%" lg="30%">
            <div className="cds--aspect-ratio cds--aspect-ratio--2x1">
              <div className="cds--aspect-ratio--object">
                <S.Image src={rightTopMedia} alt={rightTopTitle} />
              </div>
            </div>
            <S.Text>{rightTopTitle}</S.Text>
            <div className="cds--aspect-ratio cds--aspect-ratio--2x1">
              <div className="cds--aspect-ratio--object">
                <S.Image src={rightBottomMedia} alt={rightBottomTitle} />
              </div>
            </div>
            <S.Text>{rightBottomTitle}</S.Text>
          </Column>
        </Row>
      </Grid>
    </S.ThreeMediaCombo>
  );
};

type Props = {
  title: string;
  description?: string;
  leftMedia: string;
  rightTopMedia: string;
  rightTopTitle: string;
  rightBottomMedia: string;
  rightBottomTitle: string;
};
