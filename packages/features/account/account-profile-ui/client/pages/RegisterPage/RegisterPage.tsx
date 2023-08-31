/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { useIntl } from '@exo/frontend-common-i18n';
import { LayoutSpacing } from '@exo/frontend-components-core';
import { Grid, Row, Column, Breadcrumb } from '@exo/frontend-components-base';
import { ProfileRegistrationContainer } from '@exo/frontend-features-account-profile-logic';
import * as S from './RegisterPage.styles';
import { RegistrationPane } from '../../components/RegistrationPane/RegistrationPane';
import { AccountProfileConfig } from '../../acountProfileConfig';

export const RegisterPage = ({ config }: Props) => {
  const intl = useIntl('features.account.account-profile-ui.pages');
  return (
    <>
      <LayoutSpacing size="sm" />
      <Grid>
        <Row>
          <Column>
            <Breadcrumb path={[{ url: '/account-profile/profile', label: 'Register' }]} />
            <LayoutSpacing size="sm" />
          </Column>
        </Row>

        <S.RegisterPage>
          <S.Title>{intl.msg('RegisterPage.Title', 'Register')}</S.Title>
          <ProfileRegistrationContainer
            render={args => (
              <RegistrationPane {...args} addressSearch={config.feature.addressSearch} />
            )}
          />
        </S.RegisterPage>
      </Grid>
    </>
  );
};

type Props = {
  config: AccountProfileConfig;
};
