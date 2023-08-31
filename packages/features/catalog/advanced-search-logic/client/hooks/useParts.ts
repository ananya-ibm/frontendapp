/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useQuery, useLazyQuery } from '@apollo/client';
import { State } from '@exo/frontend-common-apollo';
import { useHistory } from 'react-router-dom';

const GET_PARTS = gql`
  query GET_PARTS($code: String, $facets: [String]) {
    parts(code: $code, facets: $facets) {
      facets {
        code
        name
        multiSelect
        entries {
          label
          count
          code
          state
          type
        }
      }
    }
  }
`;

export const useParts = (): Result => {
  const history = useHistory();

  const { data, error, loading } = useQuery(GET_PARTS);

  const [runPartsQuery] = useLazyQuery(GET_PARTS, {
    // gets advanced search input and transforms it into facets understandable by BE
    onCompleted: ({ parts }) => {
      const sessionFacets =
        parts?.facets.reduce((acc, facet) => {
          facet.entries.map(e => acc.push(`${facet.code}:${e.code}`));
          return acc;
        }, []) || [];

      const stringParams =
        sessionFacets
          ?.map(f => {
            const facetArr = f.split(':');
            return `${facetArr[0]}=%${facetArr[1]}`;
          })
          .join('&') || '';

      history.push(`/catalog/search/advanced?${stringParams}`);
    }
  });

  return {
    getAllParts: () => ({ data, error, loading }),
    getParts: inputs => runPartsQuery({ variables: inputs })
  };
};

type Result = {
  getAllParts: () => {
    data: { parts: Parts };
  } & State;
  getParts: (inputs: any) => void;
};

type Parts = {
  facets: {
    code: string;
    name: string;
    multiSelect: boolean;
    entries: {
      label: string;
      count: string;
      code: string;
      state: string;
      type: string;
    }[];
  }[];
};
