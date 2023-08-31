/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useMutation } from '@apollo/client';

const DEPLOYMENT_CREATE = gql`
  mutation DeploymentCreate($id: String!) {
    opsDeploymentCreate(id: $id) {
      id
    }
  }
`;

export const useDevopsModification = () =>{
  const [deploymentCreate, {error }] = useMutation(DEPLOYMENT_CREATE); 
  if (error)
  {
    // eslint-disable-next-line no-console
    console.log('deployment error:', error);
  }
  return {
    deploymentCreate: (opsDeploymentCreateId : string) => deploymentCreate({ variables: { id: opsDeploymentCreateId } })
    }
};


export type DeploymentCreateInput = {
  // TODO: Add additional attributes
  name?: string;
  id?: string;
};
