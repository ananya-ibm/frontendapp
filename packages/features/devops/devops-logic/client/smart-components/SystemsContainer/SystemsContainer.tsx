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
import { useSystems } from '../../hooks/useSystems';

export const SystemsContainer = ({
  render,
  renderLoading = renderDefaultLoading,
  renderError = renderDefaultError
}: Props) => {
  const { loading, data, error } = useSystems<SystemsResponse[]>(
    SystemsContainer.fragment
  );

  if (loading || !data) return renderLoading();
  if (error) return renderError(error);

  return render({ data });
};

SystemsContainer.fragment = gql`
  fragment SystemsContainer on OpsSystem {
    # TODO: Add additional fields
    id
    name
    description
    category
    features {
      name
    }
  }
`;

type SystemsResponse = {
  id: string;
  name: string;
  description: string;
  category: string;
  features: any;
};

export type SystemsContainerRenderProps = {
  data: SystemsResponse[];
};

type Props = SmartComponentProps<{
  render: (props: SystemsContainerRenderProps) => JSX.Element;
}>;
