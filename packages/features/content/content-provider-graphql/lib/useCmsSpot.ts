/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable import/no-extraneous-dependencies */

import { useQuery } from '@apollo/client';
import { assembleQuery, Fragments, handleApolloError } from '@exo/frontend-common-apollo';

export const useCmsSpot = ({ url, name, containerName, specs }: Props, fragments: Fragments) => {
  const { called, loading, data, error } = useQuery(
    assembleQuery(
      fragmentNames => `
        query CmsSpot($url: String!, $containerName: String!, $name: String!, $specs: [CmsKeyValuePairInput]) {
          cmsSpot(url: $url, name: $name, containerName: $containerName, specs: $specs) {
            ${fragmentNames}
          }
        }
      `,
      fragments
    ),
    {
      variables: {
        url,
        name,
        specs: Object.entries(specs ?? {}).map(([k, v]) => ({ key: k, value: v })),
        containerName
      }
    }
  );

  handleApolloError(__filename, error);

  return {
    called,
    loading,
    data: data?.cmsSpot ?? []
  };
};

type Props = {
  url: string;
  name: string;
  containerName: string;
  specs?: Record<string, string>;
};
