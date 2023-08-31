/* eslint-disable react/jsx-one-expression-per-line */
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
  SmartComponentProps
} from '@exo/frontend-common-utils';
import { useOrderHistory } from '../../hooks/useOrderHistory';

export const OrderHistoryContainer = ({
  render,
  renderLoading = renderDefaultLoading,
  renderError = renderDefaultError
}: Props) => {
  const { data, loading, error } = useOrderHistory<GQLResponse>({}, OrderHistoryContainer.fragment);

  if (loading) return renderLoading();
  if (error) return renderError(error);

  return render({ orders: data?.me?.orders?.edges?.map(o => o.node) ?? [] });
};

type Props = SmartComponentProps<{
  render: (args: OrderHistoryContainerRenderProps) => JSX.Element;
}>;

export type OrderHistoryContainerRenderProps = {
  orders: Order[];
};

OrderHistoryContainer.fragment = gql`
  fragment OrderHistoryContainer on CusMe {
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

type MonetaryAmount = {
  value: string | number;
  currency: string;
};

type GQLResponse = {
  orders: {
    edges: {
      node: Order;
    }[];
  };
};

type Order = {
  id: string;
  grandTotal: MonetaryAmount;
  placedDate: string;
  updateDate: string;
  status: string;
  statusCode: string;
  lineItems: {
    id: string;
    linePrice: MonetaryAmount;
    partnumber: string;
    quantity: number;
    item: {
      name: string;
      thumbnail?: string;
    };
  }[];
};
