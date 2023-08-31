/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Tile } from '@exo/frontend-components-automotive';
import { Column, Grid, Row } from '@exo/frontend-components-base';
import React from 'react';
import * as S from './CreditCheckDetails.styles';

export const CreditCheckDetails = ({
  decision
}: Props) => {
  return (
    <S.CreditCheckDetails>
      <Tile title="Credit Check Score" />
      <Grid>
        <Row className="row">
          <Column className="left" sm={2}>Status:</Column>
          <Column sm={2}>{decision?.decisionStatusText}</Column>
        </Row>
        <Row className="row">
          <Column className="left" sm={2}>Decision Id:</Column>
          <Column sm={2}>{decision?.decisionId}</Column>
        </Row>
        <Row className="row">
          <Column className="left" sm={2}>Application Date:</Column>
          <Column sm={2}>{decision?.applicationDate}</Column>
        </Row>
        <Row className="row">
          <Column className="left" sm={2}>Application Time:</Column>
          <Column sm={2}>{decision?.applicationTime}</Column>
        </Row>
      </Grid>
    </S.CreditCheckDetails>
  );
};

type Props = {
  decision: {
    decisionId?: string;
    decisionStatusText?: string;
    applicationDate?: string;
    applicationTime?: string;
  };
};
