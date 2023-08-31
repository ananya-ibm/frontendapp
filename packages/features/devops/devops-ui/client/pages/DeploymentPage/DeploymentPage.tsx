/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { DeploymentContainer } from '@exo/frontend-features-devops-logic';
import { Deployment } from '../../components/Deployment/Deployment';

export const DeploymentPage = ({ id }: Props) => {
  return (
    <>
      <h1>DeploymentPage</h1>

      <DeploymentContainer id={id} render={props => <Deployment {...props} />} />
    </>
  );
};

type Props = {
  id?: string;
};
