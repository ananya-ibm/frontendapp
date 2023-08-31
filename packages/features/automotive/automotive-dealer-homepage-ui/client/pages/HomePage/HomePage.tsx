/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { CmsContainer, CmsSpot } from '@exo/frontend-content-api';
import { WelcomeCard } from '../../components/WelcomeCard/WelcomeCard';
import { useEventContext } from '@exo/frontend-features-events-logic';
import { Row, Column } from '@exo/frontend-components-base';
import * as S from './HomePage.styles';
import { useEffectOnce } from '@exo/frontend-common-hooks';

// ToDo: There is a bug where CMS container should in fact not be used like this, it should wrap the whole page and use CMSSpot
export const HomePage = () => {
  const eventContext = useEventContext();
  useEffectOnce(() => {
    eventContext?.createEvent({ name: 'page_load', pageName: 'Home page' });
  });
  return (
    <S.AutoDealerHomePage>
      <S.TabletGrid>
        <S.TabletRow>
          <S.TabletCol>
            <WelcomeCard />
          </S.TabletCol>
        </S.TabletRow>
        <Row>
          <Column>
            <CmsContainer name="autodealerhomepage">
              <CmsSpot name="auto-hero" />
            </CmsContainer>
          </Column>
        </Row>
      </S.TabletGrid>
    </S.AutoDealerHomePage>
  );
};
