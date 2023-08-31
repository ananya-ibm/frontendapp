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
import { useTemplate } from '../../hooks/useTemplate';

export const TemplateContainer = ({
  id,
  render,
  renderLoading = renderDefaultLoading,
  renderError = renderDefaultError
}: Props) => {
  const { loading, data, error } = useTemplate<TemplateResponse>(
    { id },
    TemplateContainer.fragment
  );

  if (loading || !data) return renderLoading();
  if (error) return renderError(error);

  return render({ data });
};

TemplateContainer.fragment = gql`
  fragment TemplateContainer on OpsTemplate {
    # TODO: Add additional fields
    id
    name
    description
    frontend
    adapter
    keywords
  }
`;

type TemplateResponse = {
  // TODO: Add additional fields
  id: string;
  name: string;
  description: string;
  frontend: string;
  adapter: string;
  keywords: string;
};

export type TemplateContainerRenderProps = {
  data: TemplateResponse;
};

type Props = SmartComponentProps<{
  id?: string;
  render: (props: TemplateContainerRenderProps) => JSX.Element;
}>;
