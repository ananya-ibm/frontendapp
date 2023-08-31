/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import { gql } from '@apollo/client';
import { useCart } from '@exo/frontend-features-cart-logic';
import {
  renderDefaultError,
  renderDefaultLoading,
  SmartComponentProps
} from '@exo/frontend-common-utils';

export const DeliveryContainer = ({
  cartId,
  render,
  renderError = renderDefaultError,
  renderLoading = renderDefaultLoading
}: Props) => {
  const { data, error, loading } = useCart<AvailableDeliveryMethods>(
    { cartId },
    DeliveryContainer.fragment
  );

  if (loading) return renderLoading();
  if (error) return renderError(error);

  return render({ availableShippingModes: data?.me?.carts[0]?.availableShippingModes ?? [] });
};

type Props = SmartComponentProps<{
  cartId: string;
  render: (props: DeliveryContainerRenderProps) => JSX.Element | null;
}>;

export type DeliveryContainerRenderProps = AvailableDeliveryMethods;

type AvailableDeliveryMethods = {
  availableShippingModes: {
    id: string;
    identifier: string;
    description: string;
    type: string;
    shippingRate: {
      value: string;
      currency: string;
    };
  }[];
};

DeliveryContainer.fragment = gql`
  fragment PaymentMethodsContainer on CrtCart {
    id
    availableShippingModes {
      id
      identifier
      description
      type
      shippingRate {
        value
        currency
      }
    }
  }
`;
