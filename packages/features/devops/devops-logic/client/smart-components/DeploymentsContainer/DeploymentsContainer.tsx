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
import { useDeployments } from '../../hooks/useDeployments';

export const DeploymentsContainer = ({
  render,
  renderLoading = renderDefaultLoading,
  renderError = renderDefaultError
}: Props) => {

  const { loading, data, error } = useDeployments<DeploymentStatusResponse[]>(
    DeploymentsContainer.fragment
  );

  if (error) return renderError(error);
  if (loading || !data) return renderLoading();

  return render({ data });
};

DeploymentsContainer.fragment = gql`
  fragment DeploymentsContainer on OpsDeployment {
    # TODO: Add additional fields
    id
    name
    deploymentStatus
    created_date
    template
    frontend_url
  }
`;

type DeploymentStatusResponse = {
  // TODO: Add additional fields
  id: string;
  name: string;
  deploymentStatus: string;
  created_date: string;
  template: string;
  frontend_url: string;
};
export type DeploymentsContainerRenderProps = {
  data: DeploymentStatusResponse[];
};

type Props = SmartComponentProps<{
  render: (props: DeploymentsContainerRenderProps) => JSX.Element;
}>;