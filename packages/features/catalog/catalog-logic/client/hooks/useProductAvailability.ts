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

export const useProductAvailability = <T>(
  { productId, storeIds = [] }: Args,
  fragments: Fragments
): Result<T> => {
  const refProduct = asProductRef(productId);

  const variables = {
    id: refProduct.ref,
    storeIds
  };

  const { called, loading, data, error } = useQuery(
    assembleQuery(
      fragmentNames => `
        query ProductAvailabilityById($id: String, $storeIds: [ID!]!) {
          product(${refProduct.isSlug ? 'slug: $id' : 'partnumber: $id'}) {
            id
            partnumber
            availability(distributionGroupIds:["online"], shipNodeIds:$storeIds) {
              ${fragmentNames}
            }
          }
        }
      `,
      fragments
    ),
    { variables }
  );

  handleApolloError(__filename, error);

  return { called, loading, data, error };
};

type Args = {
  productId: ProductRef | string;
  storeIds?: string[];
};

type Result<T> = {
  data?: { product?: { partnumber: string; availability: T[] } };
  called: boolean;
} & State;
