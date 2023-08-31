/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useQuery, gql } from '@apollo/client';
import { handleApolloError, State } from '@exo/frontend-common-apollo';
import { asCategoryRef, CategoryRef } from '../model/category-ref';

type CategoryBreadcrumbEntry = {
  id: string;
  identifier: string;
  name: string;
  slug: string;
};

export type CategoryHierarchy = CategoryBreadcrumbEntry & { parentCategory?: CategoryHierarchy };

const makePath = (category?: CategoryHierarchy): CategoryBreadcrumbEntry[] => {
  if (!category) {
    return [];
  }
  return makePath(category.parentCategory).concat([category]);
};

type Args = {
  categoryId?: CategoryRef;
};

type Result = { data?: CategoryBreadcrumbEntry[] } & State;

export const useCategoryPath = (args: Args): Result => {
  const refCategory = asCategoryRef(args.categoryId);

  const variables = { categoryId: refCategory?.ref };

  const { loading, error, data } = useQuery(
    gql`
      query path($categoryId: String) {
        category(${refCategory?.isSlug ? 'slug: $categoryId' : 'id: $categoryId'}) {
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
    { variables, skip: !args.categoryId }
  );

  handleApolloError(__filename, error);

  return { error, loading, data: (data && makePath(data.category)) || [] };
};
