/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { formatDate } from '@exo/frontend-common-i18n';
import { SmartComponentProps } from '@exo/frontend-common-utils';

const payments = [
  {
    refer: 'Payment Reference:  ',
    referNumber: '#32454636',
    order: 'Order Reference: ',
    orderNumber: '#149874134',
    title: 'Car Reservation Deposit  ',
    approveDate: `Payment approved:  ${formatDate(new Date('2020-10-10T11:01:58.135Z').toString(), 'dd/MM/yyyy')}`,
    cost: '£800',
    payment: 'Paid with Direct Debit'
  }
];

export const PaymentsContainer = ({ render }: Props) => {
  return render({
    payments
  });
};

export type PaymentsContainerRenderProps = {
  payments: {
    refer?: string;
    referNumber?: string;
    order?: string;
    orderNumber?: string;
    title?: string;
    approveDate?: string;
    cost?: string;
    payment?: string;
  }[];
};

type Props = SmartComponentProps<{
  render: (props: PaymentsContainerRenderProps) => JSX.Element;
}>;
