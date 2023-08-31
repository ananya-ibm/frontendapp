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
import { useSystem } from '../../hooks/useSystem';

export const SystemContainer = ({
  id,
  render,
  renderLoading = renderDefaultLoading,
  renderError = renderDefaultError
}: Props) => {
  const { loading, data, error } = useSystem<SystemResponse>(
    { id },
    SystemContainer.fragment
  );

  if (loading || !data) return renderLoading();
  if (error) return renderError(error);

  return render({ data });
};

SystemContainer.fragment = gql`
  fragment SystemContainer on OpsSystem {
    id
    name
    description
    category
    features {
      name
      description
      features {
        name
        description
        features {
          name
          description
          features {
            name
            description
          }
        }
      }
    }
  }
`;

type SystemResponse = {
  id: string;
  name: string;
  description: string;
  category: string;
  features: any;
};

export type SystemContainerRenderProps = {
  data: SystemResponse;
};

type Props = SmartComponentProps<{
  id?: string;
  render: (props: SystemContainerRenderProps) => JSX.Element;
}>;
