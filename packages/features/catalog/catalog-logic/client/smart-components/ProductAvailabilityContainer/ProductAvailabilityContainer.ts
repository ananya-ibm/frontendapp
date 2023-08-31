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
import { gql } from '@apollo/client';
import { useProductAvailability } from '../../hooks/useProductAvailability';
import { ProductRef } from '../../model/product-ref';

export const ProductAvailabilityContainer = ({
  productId,
  storeId,
  isStoreEnabled = false,
  isOnlineEnabled = false,
  render,
  renderError = renderDefaultError,
  renderLoading = renderDefaultLoading
}: Props) => {
  const { loading, error, data } = useProductAvailability<AvailabilityResponse>(
    { productId, storeIds: storeId ? [storeId] : [] },
    ProductAvailabilityContainer.fragment
  );

  if (!isStoreEnabled && !isOnlineEnabled) return null;

  if (loading) return renderLoading();
  if (error) return renderError(error);

  return render({
    availability: data?.product?.availability ?? [],
    partnumber: data?.product?.partnumber!,
    isOnlineEnabled,
    isStoreEnabled
  });
};

type AvailabilityResponse = {
  status: string;
  availableDate?: string;
  shipNode?: {
    id: string;
    name: string;
  };
  distributionGroup?: {
    id: string;
    name: string;
  };
};

ProductAvailabilityContainer.fragment = gql`
  fragment Availability on AvAvailability {
    status
    availableDate
    shipNode {
      id
      name
    }
    distributionGroup {
      id
      name
    }
  }
`;

type Props = SmartComponentProps<{
  productId: ProductRef;
  storeId?: string;
  isOnlineEnabled?: boolean;
  isStoreEnabled?: boolean;
  render: (props: ProductAvailabilityContainerRenderProps) => JSX.Element;
}>;

export type ProductAvailabilityContainerRenderProps = {
  availability: AvailabilityResponse[];
  partnumber: string;
  isOnlineEnabled: boolean;
  isStoreEnabled: boolean;
};
