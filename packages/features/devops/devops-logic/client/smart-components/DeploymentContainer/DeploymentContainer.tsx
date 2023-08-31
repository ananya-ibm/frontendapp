/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql } from '@apollo/client';
import {
  renderDefaultError,
  renderDefaultLoading,
  SmartComponentProps
} from '@exo/frontend-common-utils';
import { useDeployment } from '../../hooks/useDeployment';

export const DeploymentContainer = ({
  id,
  render,
  renderLoading = renderDefaultLoading,
  renderError = renderDefaultError
}: Props) => {
  const { loading, data, error } = useDeployment<DeploymentResponse>(
    { id },
    DeploymentContainer.fragment
  );

  if (loading || !data) return renderLoading();
  if (error) return renderError(error);

  return render({ data });
};

DeploymentContainer.fragment = gql`
  fragment DeploymentContainer on OpsDeployment {
    # TODO: Add additional fields
    id
    name
    status
  }
`;

type DeploymentResponse = {
  // TODO: Add additional fields
  id: string;
  name: string;
  deploymentStatus: string;
};

export type DeploymentContainerRenderProps = {
  data: DeploymentResponse;
};

type Props = SmartComponentProps<{
  id?: string;
  render: (props: DeploymentContainerRenderProps) => JSX.Element;
}>;
