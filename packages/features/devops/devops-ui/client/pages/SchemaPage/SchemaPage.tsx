/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { SchemaContainer } from '@exo/frontend-features-devops-logic';
import { Schema } from '../../components/Schema/Schema';
import { Grid } from '@exo/frontend-components-base';

export const SchemaPage = ({ id }: Props) => {
  return (
    <Grid>
      <SchemaContainer id={id} render={props => <Schema {...props} />} />
    </Grid>
  );
};

type Props = {
  id?: string;
};
