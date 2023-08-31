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

export const useCategory = <T>({ categoryId }: Args, fragments: Fragments): Result<T> => {
  const refCategory = asCategoryRef(categoryId);

  const variables = { categoryId: refCategory.ref };

  const { called, loading, data, error } = useQuery(
    assembleQuery(
      fragmentNames => `
        query Category($categoryId: String) {
          category(${refCategory.isSlug ? 'slug: $categoryId' : 'id: $categoryId'}) {
            ${fragmentNames}
          }
        }
      `,
      fragments
    ),
    { variables }
  );

  handleApolloError(__filename, error);

  return { called, loading, data: (data && data.category) ?? [], error };
};

type Args = {
  categoryId: CategoryRef | string;
};

type Result<T> = {
  data?: T;
  called: boolean;
} & State;
