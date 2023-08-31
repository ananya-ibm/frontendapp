/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useQuery } from '@apollo/client';
import { handleApolloError, assembleQuery, Fragments, State } from '@exo/frontend-common-apollo';

export const useProductSearch = <T>(
  { currency, searchTerm, facets, sort = 'RELEVANCE' }: Args,
  fragments: Fragments
): Result<T> => {
  const variables: any = {
    searchTerm,
    cursor: null,
    facets,
    sort,
    currency,
    count: 12
  };

  const { called, loading, data, error, fetchMore } = useQuery(
    assembleQuery(
      fragmentNames => `
        query ProductSearch($searchTerm: String, $cursor: String, $count: Int, $sort: ProductOrderBy, $facets: [String!], $currency: String) {
          products(filter: { term: $searchTerm }, first: $count, after: $cursor, facets: $facets, orderBy: $sort, currency: $currency) {
            ${fragmentNames}
          }
        }
      `,
      fragments
    ),
    { variables, skip: !searchTerm || searchTerm === '' }
  );

  const onLoadMore = () => {
    fetchMore({
      variables: {
        cursor: data.products.pageInfo.endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.products.edges;
        const { pageInfo } = fetchMoreResult.products;

        return newEdges.length
          ? {
              products: {
                // eslint-disable-next-line no-underscore-dangle
                __typename: previousResult.products.__typename,
                edges: [...previousResult.products.edges, ...newEdges],
                pageInfo
              }
            }
          : previousResult;
      }
    });
  };

  handleApolloError(__filename, error);

  return { called, loading, data, error, onLoadMore };
};

type Args = {
  currency?: string;
  searchTerm: string;
  facets?: string[];
  sort?: string;
};

type Result<T> = {
  data?: { products?: T };
  called: boolean;
  onLoadMore: () => void;
} & State;
