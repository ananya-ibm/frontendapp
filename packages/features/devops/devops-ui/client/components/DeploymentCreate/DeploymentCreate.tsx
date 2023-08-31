/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as S from './DeploymentCreate.styles';
import { DeploymentCreateInputForm } from '../../components/DeploymentCreateInputForm/DeploymentCreateInputForm';
import { Layer } from '@exo/frontend-components-base';
import { DeploymentCreateInput } from '@exo/frontend-features-devops-logic';

export const DeploymentCreate = ({data}: Props) => {
  return (
    <Layer>
      <S.DeploymentCreate>
        <S.DeploymentCreateTitle>Deploy this template</S.DeploymentCreateTitle>
        <S.DeploymentCreateDescription>
          Here you can deploy a new instance of this template. Complete the fields below and click
          create.
        </S.DeploymentCreateDescription>
        <DeploymentCreateInputForm data={data} />
      </S.DeploymentCreate>
    </Layer>
  );
};

type Props = {
  data: DeploymentCreateInput;
};
