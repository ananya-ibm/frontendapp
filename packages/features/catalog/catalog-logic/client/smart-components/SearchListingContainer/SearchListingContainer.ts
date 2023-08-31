/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql } from '@apollo/client';
import {
  renderDefaultError,
  renderDefaultLoading,
  cond,
  SmartComponentProps
} from '@exo/frontend-common-utils';
import { useProductSearch } from '../../hooks/useProductSearch';
import { processProductList } from '../../common/productListing';
import { Product } from '../../model/types';

export const SearchListingContainer = ({
  render,
  renderError = renderDefaultError,
  renderLoading = renderDefaultLoading,
  currency,
  term,
  selectedFacets,
  sort,
  storeId,
  useReviews,
  useAvailability
}: Props) => {
  const { loading, error, data, onLoadMore } = useProductSearch<ProductResponse>(
    { searchTerm: term, facets: selectedFacets, sort, currency },
    SearchListingContainer.fragment(useAvailability, useReviews, storeId)
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

SearchListingContainer.fragment = (availability, reviews, storeId) => gql`
  fragment SearchList on PrdResultConnection {
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
  term: string;
  currency: string;
  useReviews?: boolean;
  useAvailability?: 'online' | 'store' | 'online+store';
  storeId?: string;
  selectedFacets?: string[];
  sort?: string;
  render: (props: SearchListingContainerRenderProps) => JSX.Element;
}>;

export type SearchListingContainerRenderProps = {
  onLoadMore: () => void;
  hasMore: boolean;
  totalResultsCount?: number;
  productData: ReturnType<typeof processProductList>;
};
