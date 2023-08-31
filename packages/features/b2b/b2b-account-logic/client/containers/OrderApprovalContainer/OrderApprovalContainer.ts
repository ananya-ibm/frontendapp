/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { SmartComponentProps } from '@exo/frontend-common-utils';
import { useOrdersToApprove } from '../../hooks/useOrdersToApprove';

export const OrderApprovalContainer = ({ orderId, render }: Props) => {
  const { getOrder, getOrders, updateOrder } = useOrdersToApprove();

  if (orderId) {
    return render({ order: getOrder(orderId), onUpdateOrder: updateOrder });
  } else {
    return render({ orders: getOrders(), onUpdateOrder: updateOrder });
  }
};

type Props = SmartComponentProps<{
  orderId?: string;
  render: (props: OrderApprovalContainerRenderProps) => JSX.Element;
}>;

export type OrderApprovalContainerRenderProps = {
  order?: Order;
  orders?: Order[];
  onUpdateOrder: (o: any) => void;
};

type Order = {
  id: string;
  date: string;
  user: string;
  total?: string;
  status: string;
};
