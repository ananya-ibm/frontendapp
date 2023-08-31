/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { DeploymentCreateInputForm } from '../../components/DeploymentCreateInputForm/DeploymentCreateInputForm';

export const DeploymentCreateInputPage = ({}: Props) => {
  return (
    <div>
      <h1>Create Deployment</h1>
      <DeploymentCreateInputForm />
    </div>
  );
};

type Props = {};
