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

export const useCmsContainer = ({ url, name, specs }: Props, fragments: Fragments) => {
  const { called, loading, data, error, fetchMore } = useQuery(
    assembleQuery(
      fragmentNames => `
        query CmsContainer($url: String!, $name: String!, $specs: [CmsKeyValuePairInput]) {
          cmsContainer(url: $url, name: $name, specs: $specs) {
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
        specs: Object.entries(specs ?? {}).map(([k, v]) => ({ key: k, value: v }))
      }
    }
  );

  handleApolloError(__filename, error);

  return {
    called,
    loading,
    fetchMore,
    data: data?.cmsContainer ?? []
  };
};

type Props = {
  url: string;
  name: string;
  specs?: Record<string, string>;
};
