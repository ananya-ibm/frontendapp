/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { useIntl } from '@exo/frontend-common-i18n';
import * as S from './DeploymentsPage.styles';
import { DeploymentsContainer } from '@exo/frontend-features-devops-logic';
import { Deployments } from '../../components/Deployments/Deployments';
import { Grid } from '@exo/frontend-components-base';
import { LayoutSpacing } from '@exo/frontend-components-core';

export const DeploymentsPage = ({}: Props) => {
  const intl = useIntl('features.devops.devops-ui.pages.DeploymentsPage');
  return (
    <>
      <LayoutSpacing size="sm" />
      <Grid>
        <S.Title>{intl.msg('page.title', 'Deployments')}</S.Title>
        <DeploymentsContainer render={props => <Deployments {...props} />} />
      </Grid>
    </>
  );
};

type Props = {};
