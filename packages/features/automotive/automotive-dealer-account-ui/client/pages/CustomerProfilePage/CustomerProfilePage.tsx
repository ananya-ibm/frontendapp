/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { CustomerProfileContainer } from '@exo/frontend-features-automotive-dealer-account-logic';
import { CustomerProfile } from '../../components/CustomerProfile';
import { Configuration } from '@exo/frontend-features-automotive-account-logic';
import { CustomerConfigurationsContainer } from '@exo/frontend-features-automotive-dealer-account-logic';
import { CustomerConfiguration } from '@exo/frontend-components-automotive';
import { getClientImagePath } from '@exo/frontend-common-utils';
import { Grid, Row, Column } from '@exo/frontend-components-base';
import { CmsContainer, CmsSpot } from '@exo/frontend-content-api';
import { Add } from '@carbon/react/icons';
import * as S from './CustomerProfilePage.styles';
import { LoadingIndicator } from '@exo/frontend-components-base';

// TODO - to uncomment after demo and continue development

type ConfigurationSummary = {
  id: string;
  description?: string;
  image: string;
  productId: string;
};

// @ts-ignore
const getSelectedOptions = (cfg: Configuration) =>
  cfg.optionCategories
    .flatMap(oca => oca.optionClassifications)
    .flatMap(ocl => ocl.options)
    .filter(o => o.selected)
    .map(o => ({ product: o.product }));
    
const mapConfiguration = (conf: Configuration): ConfigurationSummary => ({
  id: conf.id,
  description: conf.baseProduct?.description || conf.baseProduct?.longDescription,
  image: getClientImagePath(conf.baseProduct?.thumbnail),
  productId: conf.baseProduct?.id
});

export const CustomerProfilePage = () => {
  return (
    <S.AutoDealerHomePage>
      <Grid>
        <S.TabletRow>
          <Column>
            <S.TabWrapper>
              <S.Title>Customer Profile</S.Title>
              <CustomerProfileContainer
                render={args => <CustomerProfile {...args} />}
                renderLoading={() => <LoadingIndicator />}
              />
              <S.Subtitle>Saved Configuration and Financial Package </S.Subtitle>
              <CustomerConfigurationsContainer
                render={({ configurations }) => (
                  <S.SavedConfigurations>
                    {configurations?.length === 0 && (
                      <>You do not have any saved configurations yet.</>
                    )}
                    {configurations?.map(conf => (
                      <CustomerConfiguration key={conf.id} configuration={mapConfiguration(conf)} />
                    ))}
                  </S.SavedConfigurations>
                )}
              />
              <S.Button
                label={'New Product Configuration'}
                onClick={() => {}}
                icon={<Add />}
              ></S.Button>
            </S.TabWrapper>
          </Column>
        </S.TabletRow>
        <Row>
          <Column>
            <CmsContainer name="autodealerhomepage">
              <CmsSpot name="auto-hero" />
            </CmsContainer>
          </Column>
        </Row>
      </Grid>
    </S.AutoDealerHomePage>
  );
};
