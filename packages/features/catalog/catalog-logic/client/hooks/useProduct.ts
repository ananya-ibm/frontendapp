/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useQuery } from '@apollo/client';
import { assembleQuery, Fragments, handleApolloError, State } from '@exo/frontend-common-apollo';
import { asProductRef, ProductRef } from '../model/product-ref';

export const useProduct = <T>(
  { productId, currency, skip, count = 12 }: Args,
  fragments: Fragments
): Result<T> => {
  const refProduct = asProductRef(productId);

  const variables = {
    id: refProduct?.ref,
    count,
    currency
  };

  const { called, loading, data, error } = useQuery(
    assembleQuery(
      fragmentNames => `
        query ProductById($id: String, $currency: String) {
          product(${refProduct?.isSlug ? 'slug: $id' : 'partnumber: $id'}, currency: $currency) {
            ${fragmentNames}
          }
        }
      `,
      fragments
    ),
    { variables, skip: skip ?? !productId }
  );

  handleApolloError(__filename, error);

  return { called, loading, data, error };
};

type Args = {
  productId?: ProductRef | string;
  currency?: string;
  skip?: boolean;
  count?: number;
};

type Result<T> = {
  data?: { product: T };
  called: boolean;
} & State;
