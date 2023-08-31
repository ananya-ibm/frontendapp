/* eslint-disable react/jsx-one-expression-per-line */
/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql } from '@apollo/client';
import { useOrderHistory } from '@exo/frontend-features-account-profile-logic';
import {
  renderDefaultError,
  renderDefaultLoading,
  SmartComponentProps
} from '@exo/frontend-common-utils';
import { Order } from '../types';

export const OrderHistoryContainer = ({
  render,
  renderLoading = renderDefaultLoading,
  renderError = renderDefaultError
}: Props) => {
  const { data, loading, error } = useOrderHistory<GQLResponse>({}, OrderHistoryContainer.fragment);

  if (loading) return renderLoading();
  if (error) return renderError(error);

  const orders = data?.me?.orders?.edges ?? [];

  return render({
    orders: orders?.map(o => o.node) ?? []
  });
};

type GQLResponse = {
  orders: {
    edges: {
      node: Order;
    }[];
  };
};

OrderHistoryContainer.fragment = gql`
  fragment AutoOrderHistory on CusMe {
    id
    orders {
      edges {
        node {
          id
          grandTotal {
            value
            currency
          }
          placedDate
          updateDate
          status
          statusCode
          lineItems {
            id
            linePrice {
              value
              currency
            }
            partnumber
            quantity
            item {
              name
              thumbnail
            }
          }
        }
      }
    }
  }
`;

export type OrderHistoryContainerRenderProps = {
  orders: Order[];
};

type Props = SmartComponentProps<{
  render: (props: OrderHistoryContainerRenderProps) => JSX.Element;
}>;
