/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './Deployment.styles';
import { DeploymentContainerRenderProps } from '@exo/frontend-features-devops-logic';

export const Deployment = ({ data }: Props) => {
  return (
    <S.Deployment>
      <S.Id>{data.id}</S.Id>
      <S.Name>{data.name}</S.Name>
      <S.Status>{data.deploymentStatus}</S.Status>
    </S.Deployment>
  );
};

type Props = DeploymentContainerRenderProps & {
  // TODO: Add any additional props
};
