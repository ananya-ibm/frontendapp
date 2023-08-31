/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql } from '@apollo/client';
import { ReactElement } from 'react';
import {
  renderDefaultError,
  renderDefaultLoading,
  SmartComponentProps
} from '@exo/frontend-common-utils';
import { useSampleData } from '../../hooks/useSampleData';

export const SampleDataContainer = ({
  render,
  renderError = renderDefaultError,
  renderLoading = renderDefaultLoading
}: Props) => {
  const { loading, error, data } = useSampleData<SampleData>({}, SampleDataContainer.fragment);

  if (loading) return renderLoading();
  if (error) return renderError(error);

  return render({
    data: data ?? []
  });
};

export type SampleDataContainerRenderProps = {
  data: SampleData[];
};

type Props = SmartComponentProps<{
  render: (args: SampleDataContainerRenderProps) => ReactElement | null;
}>;

SampleDataContainer.fragment = gql`
  fragment SampleDataContainer_name on CatCategory {
    id
    identifier
    name
  }
`;

export type SampleData = {
  id: string;
  identifier: string;
  name: string;
};
