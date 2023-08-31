/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Grid, Row, Column } from '@exo/frontend-components-base';
import { Information } from '@carbon/react/icons';
import * as S from './DealerDetails.styles';

export const DealerDetails = ({ title, img, name, surname, phoneNumber, emailAddress }: Props) => {
  return (
    <S.DealerDetails>
      <Grid>
        <Row className="row1">
          <Column sm={3} md={7} lg={11}>
            {title && <S.Title>{title}</S.Title>}
          </Column>
          <Column sm={1} md={1} lg={1} className="infoCol">
            <Information size={32} aria-label="More Information" className="information" />
          </Column>
        </Row>
        <Row>
          <Column sm={1} md={2} lg={3}>
            {img && (
              <S.Media>
                <S.Image img={img} />
              </S.Media>
            )}
          </Column>
          <Column sm={3} md={6} lg={9}>
            {name && <S.HeadingText>{name}</S.HeadingText>}
            {surname && <S.Text>{surname}</S.Text>}
            {phoneNumber && <S.Text>{phoneNumber}</S.Text>}
            {emailAddress && <S.Text>{emailAddress}</S.Text>}
          </Column>
        </Row>
      </Grid>
    </S.DealerDetails>
  );
};

type Props = {
  title?: string;
  img?: string;
  name?: string;
  surname?: string;
  phoneNumber?: number | string;
  emailAddress?: string;
};
