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

export const SampleContainer = ({
  render,
  renderLoading = renderDefaultLoading,
  renderError = renderDefaultError
}: Props) => {
  // GENERATOR: This is a noop you need to replace
  const { loading, data, error } = { loading: true, data: {}, error: undefined };

  /*
  GENERATOR: ...with something like this
  const { loading, data, error } = useSample<SampleResponse>(
    SampleContainerContainer.fragment  
  );
  */

  if (loading || !data) return renderLoading();
  if (error) return renderError(error);

  return render({ data });
};

SampleContainer.fragment = gql`
  fragment SampleContainer on CatCategory {
    # TODO: Add additional fields
    id
  }
`;

type SampleResponse = {
  // TODO: Add additional fields
};

export type SampleContainerRenderProps = {
  data: SampleResponse;
};

type Props = SmartComponentProps<{
  render: (props: SampleContainerRenderProps) => JSX.Element;
}>;
