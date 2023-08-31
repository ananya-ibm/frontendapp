/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { CmsContainer, CmsSpot } from '@exo/frontend-content-api';
import { Row, Column } from '@exo/frontend-components-base';
import * as S from './QRScannerPage.styles';
import  QRScanner  from '../../components/QRScanner/QRScanner';

// ToDo: There is a bug where CMS container should in fact not be used like this, it should wrap the whole page and use CMSSpot
export const QRScannerPage = () => {

  return (
    <S.QRScannerPage>
      <S.TabletGrid>
        <S.TabletRow>
          <S.TabletCol>
          <QRScanner/>
          </S.TabletCol>
        </S.TabletRow>
        <Row>
          <Column>
            <CmsContainer name="autodealerqrscanner">
              <CmsSpot name="auto-hero" />
            </CmsContainer>
          </Column>
        </Row>
      </S.TabletGrid>
    </S.QRScannerPage>
  );
};
