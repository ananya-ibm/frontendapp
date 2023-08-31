/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql } from '@apollo/client';
import {
  cond,
  renderDefaultError,
  renderDefaultLoading,
  SmartComponentProps
} from '@exo/frontend-common-utils';
import { useCategoryWithProducts } from '../../hooks/useCategoryWithProducts';
import { processProductList } from '../../common/productListing';
import { Product } from '../../model/types';
import { CategoryRef } from '../../model/category-ref';

export const CategoryListingContainer = ({
  render,
  renderError = renderDefaultError,
  renderLoading = renderDefaultLoading,
  categoryId,
  currency,
  selectedFacets = [],
  sort,
  storeId,
  useReviews,
  useAvailability
}: Props) => {
  const { loading, error, data, onLoadMore } = useCategoryWithProducts<ProductResponse>(
    { categoryId, facets: selectedFacets, sort, currency },
    CategoryListingContainer.fragment(useAvailability, useReviews, storeId)
  );

  if (loading) return renderLoading();
  if (error) return renderError(error);

  const productData = processProductList(data?.products?.edges!);

  const hasMore = !!data?.products?.pageInfo?.hasNextPage;
  return render({ productData, onLoadMore, hasMore, totalResultsCount: data?.products?.pageInfo?.totalResultsCount });
};

type ProductResponse = {
  pageInfo: {
    hasNextPage: boolean;
    endCursor: string;
    totalResultsCount: number;
  };
  edges: {
    cursor: string;
    node: Product;
  }[];
};

CategoryListingContainer.fragment = (availability, reviews, storeId) => gql`
  fragment ProductListWithEverything on PrdResultConnection {
    pageInfo {
      hasNextPage
      endCursor
      totalResultsCount
    }
    edges {
      cursor
      node {
        id
        partnumber
        slug
        name
        thumbnail
        type
        price {
          list {
            value
            currency
          }
          offer {
            value
            currency
          }
        }

        ${cond(
          reviews,
          `
          reviews {
            averageRating
            reviewCount
          }
        `
        )}

        ${cond(
          availability && availability !== 'none',
          `
          availability(
            distributionGroupIds: [${cond(availability?.includes('online'), '"online"')}], 
            shipNodeIds: [${cond(availability?.includes('store') && storeId, `"${storeId}"`)}]
          ) {
            status
            shipNode {
              id
              name
            }
            distributionGroup {
              id
            }
          }
        `
        )}
      }
    }
  }
`;

type Props = SmartComponentProps<{
  categoryId: CategoryRef;
  currency: string;
  useReviews?: boolean;
  useAvailability?: 'online' | 'store' | 'online+store';
  storeId?: string;
  selectedFacets?: string[];
  sort?: string;
  render: (props: CategoryListingContainerRenderProps) => JSX.Element;
}>;

export type CategoryListingContainerRenderProps = {
  onLoadMore: () => void;
  hasMore: boolean;
  totalResultsCount?: number;
  productData: ReturnType<typeof processProductList>;
};
