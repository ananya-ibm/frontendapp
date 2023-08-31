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

export const useCategoryFilters = <T>(
  { categoryId, currency, facets, skip }: Args,
  fragments: Fragments
): Result<T> => {
  const refCategory = asCategoryRef(categoryId);

  const variables = {
    categoryId: refCategory.ref,
    cursor: null,
    count: 1,
    facets,
    currency
  };

  const { called, loading, data, error } = useQuery(
    assembleQuery(
      fragmentNames => `
        query CategoryFilters($categoryId: String, $cursor: String, $count: Int, $sort: ProductOrderBy, $facets: [String!], $currency: String) {
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
    { variables, skip }
  );

  handleApolloError(__filename, error);

  return { called, loading, data: data && data.category, error };
};

type Args = {
  categoryId: CategoryRef | string;
  currency?: string;
  facets?: string[];
  skip?: boolean;
};

type Result<T> = {
  data?: { products: T };
  called: boolean;
} & State;
