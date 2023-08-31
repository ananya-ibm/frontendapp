/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import {
  renderDefaultError,
  renderDefaultLoading,
  SmartComponentProps
} from '@exo/frontend-common-utils';
import { Fragments } from '@exo/frontend-common-apollo';
import { gql } from '@apollo/client';
import { useProduct } from '../../hooks/useProduct';
import { ProductRef } from '../../model/product-ref';

export const ProductInformationContainer = <T>({
  productId,
  fragments = [ProductInformationContainer.basicInformation],
  render,
  renderLoading = renderDefaultLoading,
  renderError = renderDefaultError
}: Props<T>) => {
  const { loading, data, error } = useProduct({ productId }, fragments);

  if (loading || !data) return renderLoading();
  if (error) return renderError(error);
  return render({ product: data?.product as T });
};

ProductInformationContainer.basicInformation = gql`
  fragment ProductInformationContainer_Basic on PrdItem {
    id
    name
    description
    longDescription
    partnumber
    type
  }
`;

ProductInformationContainer.detailedInformation = gql`
  fragment ProductInformationContainer_Details on PrdItem {
    id
    name
    description
    longDescription
    partnumber
    type
    attributes {
      id
      name
      categoryName
      value {
        id
        value
        sequence
      }
    }
  }
`;

ProductInformationContainer.childProducts = gql`
  fragment ProductInformationContainer_ChildProducts on PrdItem {
    id
    type
    children {
      id
      thumbnail
      name
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
    }
  }
`;

ProductInformationContainer.reviews = gql`
  fragment ProductInformationContainer_Reviews on PrdItem {
    id
    type
    partnumber
    reviews {
      edges {
        node {
          id
          title
          text
          rating
          featured
          recommeded
          userLocation
          updateDate
          name
          avatar
        }
      }
    }
  }
`;

type Props<T> = SmartComponentProps<{
  productId: ProductRef;
  fragments: Fragments;
  render: (props: ProductInformationContainerRenderProps<T>) => JSX.Element;
}>;

export type ProductInformationContainerRenderProps<T> = {
  product: T;
};
