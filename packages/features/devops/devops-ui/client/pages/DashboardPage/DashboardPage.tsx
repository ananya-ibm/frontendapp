/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { useIntl } from '@exo/frontend-common-i18n';
import * as S from './DashboardPage.styles';
import { LayoutSpacing } from '@exo/frontend-components-core';
import { Grid } from '@exo/frontend-components-base';
import { DashboardActions } from '../../components/DashboardActions/DashboardActions';

export const DashboardPage = ({}: Props) => {
  const intl = useIntl('features.devops.devops-ui.pages.DashboardPage');
  return (
    <>
      <LayoutSpacing size="sm" />
      <Grid>
        <S.Title>{intl.msg('page.title', 'Dashboard')}</S.Title>
        <DashboardActions />
      </Grid>
    </>
  );
};

type Props = {};
