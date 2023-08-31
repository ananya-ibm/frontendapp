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

export const PaymentMethodsContainer = ({
  cartId,
  render,
  renderError = renderDefaultError,
  renderLoading = renderDefaultLoading
}: Props) => {
  const { data, error, loading } = useCart<AvailablePaymentMethods>(
    { cartId },
    PaymentMethodsContainer.fragment
  );

  if (loading) return renderLoading();
  if (error) return renderError(error);

  return render({ availablePaymentMethods: data?.me?.carts[0]?.availablePaymentMethods ?? [] });
};

type Props = SmartComponentProps<{
  cartId: string;
  render: (props: PaymentMethodsContainerRenderProps) => JSX.Element | null;
}>;

export type PaymentMethodsContainerRenderProps = AvailablePaymentMethods;

type AvailablePaymentMethods = {
  availablePaymentMethods: {
    id: string;
    identifier: string;
    description?: string;
    type: string;
  }[];
};

PaymentMethodsContainer.fragment = gql`
  fragment PaymentMethodsContainer on CrtCart {
    id
    availablePaymentMethods {
      id
      identifier
      description
      type
    }
  }
`;
