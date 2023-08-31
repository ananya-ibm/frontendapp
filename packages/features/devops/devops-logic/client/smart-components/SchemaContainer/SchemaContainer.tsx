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
import { useSchema } from '../../hooks/useSchema';

export const SchemaContainer = ({
  id,
  render,
  renderLoading = renderDefaultLoading,
  renderError = renderDefaultError
}: Props) => {
  const { loading, data, error } = useSchema<SchemaResponse>(
    { id },
    SchemaContainer.fragment
  );

  if (loading || !data) return renderLoading();
  if (error) return renderError(error);

  return render({ data });
};

SchemaContainer.fragment = gql`
  fragment SchemaContainer on OpsSchema {
    id
    name
    description
    feature
    path
    adapters {
      id
      name
      shortname
    }
    # types
    # inputTypes
    # mutations
    schemas {
      description
      queryType {
        fields {
          name
          description
          args {
            name
            description
            defaultValue
          }
          type {
            kind
            name
            description
            fields {
              name
              description
            }
            ofType {
              kind
              name
              description
              fields {
                name
                description
              }
            }
          }
        }
      }
    }
  }
`;

type SchemaResponse = {
  id: string;
  name: string;
  description: string;
  feature: string;
  path: string;
  adapters: any;
  schemas: any;
};

export type SchemaContainerRenderProps = {
  data: SchemaResponse;
};

type Props = SmartComponentProps<{
  id?: string;
  render: (props: SchemaContainerRenderProps) => JSX.Element;
}>;
