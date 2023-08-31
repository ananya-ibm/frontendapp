/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useQuery } from '@apollo/client';
import { assembleQuery, Fragments, handleApolloError, State } from '@exo/frontend-common-apollo';
import { asCategoryRef, CategoryRef } from '../model/category-ref';

export const useCategoryWithProducts = <T>(
  { categoryId, currency, facets, sort = 'RELEVANCE', count = 12 }: Args,
  fragments: Fragments
): Result<T> => {
  const refCategory = asCategoryRef(categoryId);

  const variables: any = {
    categoryId: refCategory.ref,
    cursor: null,
    facets,
    sort,
    count,
    currency
  };

  const { called, loading, data, error, fetchMore } = useQuery(
    assembleQuery(
      fragmentNames => `
        query CategoryWithProducts($categoryId: String, $cursor: String, $count: Int, $sort: ProductOrderBy, $facets: [String!], $currency: String) {
          category(${refCategory.isSlug ? 'slug: $categoryId' : 'id: $categoryId'}) {
            id
            products(first: $count, after: $cursor, facets: $facets, orderBy: $sort, currency: $currency) {
              ${fragmentNames}
            }
          }
        }
      `,
      fragments
    ),
    { variables }
  );

  const onLoadMore = () => {
    fetchMore({
      variables: {
        cursor: data.category.products.pageInfo.endCursor
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const newEdges = fetchMoreResult.category.products.edges;
        const { pageInfo } = fetchMoreResult.category.products;

        return newEdges.length
          ? {
              // Put the new comments at the end of the list and update `pageInfo`
              // so we have the new `endCursor` and `hasNextPage` values
              category: {
                id: previousResult.category.id,
                // eslint-disable-next-line no-underscore-dangle
                __typename: previousResult.category.__typename,
                products: {
                  // eslint-disable-next-line no-underscore-dangle
                  __typename: previousResult.category.products.__typename,
                  edges: [...previousResult.category.products.edges, ...newEdges],
                  pageInfo
                }
              }
            }
          : previousResult;
      }
    });
  };

  handleApolloError(__filename, error);

  return { called, loading, data: data && data.category, onLoadMore };
};

type Args = {
  categoryId: CategoryRef | string;
  currency?: string;
  facets?: string[];
  sort?: string;
  count?: number;
};

type Result<T> = {
  data?: { products: T };
  called: boolean;
  onLoadMore: () => void;
} & State;
