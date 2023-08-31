/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useQuery, gql } from '@apollo/client';
import { handleApolloError, State } from '@exo/frontend-common-apollo';
import { asProductRef, ProductRef } from '../model/product-ref';
import { CategoryHierarchy } from './useCategoryPath';

const makePath = (category?: ProductResponse | CategoryHierarchy) => {
  if (!category) {
    return [];
  }
  return makePath(category.parentCategory).concat([category]);
};

export const useProductPath = ({ productId }: { productId: ProductRef | string }): Result => {
  const refProduct = asProductRef(productId);

  const variables = {
    id: refProduct.ref
  };

  const { loading, error, data } = useQuery(
    gql`
      query ProductPath($id: String) {
        product(${refProduct.isSlug ? 'slug: $id' : 'partnumber: $id'}) {
          id
          name
          slug
          parentCategory {
            id
            identifier
            name
            slug
            parentCategory {
              id
              identifier
              name
              slug
              parentCategory {
                id
                identifier
                name
                slug
                parentCategory {
                  id
                  identifier
                  name
                  slug
                }
              }
            }
          }
        }
      }
    `,
    { variables }
  );

  handleApolloError(__filename, error);

  return { error, loading, data: (data && makePath(data.product)) ?? [] };
};

type ProductResponse = {
  id: string;
  name: string;
  slug: string;
  parentCategory: CategoryHierarchy;
};

type Result = {
  data?: (ProductResponse | CategoryHierarchy)[];
} & State;
