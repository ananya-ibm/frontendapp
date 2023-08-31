/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { SystemContainer } from '@exo/frontend-features-devops-logic';
import { System } from '../../components/System/System';
import { Grid } from '@exo/frontend-components-base';

export const SystemPage = ({ id }: Props) => {
  return (
    <Grid>
      <SystemContainer id={id} render={props => <System {...props} />} />
    </Grid>
  );
};

type Props = {
  id?: string;
};
