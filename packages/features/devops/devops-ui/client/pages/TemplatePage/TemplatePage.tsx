/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { TemplateContainer } from '@exo/frontend-features-devops-logic';
import { Template } from '../../components/Template/Template';
import { DeploymentCreate } from '../../components/DeploymentCreate/DeploymentCreate';
import { Grid } from '@exo/frontend-components-base';

export const TemplatePage = ({ id }: Props) => {
  return (
    <Grid>
      <TemplateContainer
        id={id}
        render={props => (
          <>
            <Template {...props} />
            <DeploymentCreate data={{id: props.data.id}} />
          </>
        )}
      />
    </Grid>
  );
};

type Props = {
  id?: string;
  name?: string;
};
