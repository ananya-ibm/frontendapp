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
import { useTemplates } from '../../hooks/useTemplates';

export const TemplatesContainer = ({
  render,
  renderLoading = renderDefaultLoading,
  renderError = renderDefaultError
}: Props) => {
  const { loading, data, error } = useTemplates<TemplatesResponse[]>(TemplatesContainer.fragment);

  if (loading || !data) return renderLoading();
  if (error) return renderError(error);

  return render({ data });
};

TemplatesContainer.fragment = gql`
  fragment TemplatesContainer on OpsTemplate {
    # TODO: Add additional fields
    id
    name
    description
    frontend
    adapter
    keywords
  }
`;

type TemplatesResponse = {
  // TODO: Add additional fields
  id: string;
  name: string;
  description: string;
  frontend: string;
  adapter: string;
  keywords: string;
};

export type TemplatesContainerRenderProps = {
  data: TemplatesResponse[];
};

type Props = SmartComponentProps<{
  render: (props: TemplatesContainerRenderProps) => JSX.Element;
}>;
