/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import { SmartComponentProps } from '@exo/frontend-common-utils';

const title = 'Lease(Personal Contract Hire)';
const activeLease = [
  {
    name: 'Lease Agreement',
    expiry: 'Expires: 13/01/2021',
    cost: '£59.99/Month',
    payment: 'Paid with Direct Debit',
    mileageLimit: '100,000',
    termDuration: '5 years',
    upfrontPayment: '£2,000.00'
  }
];
const expiredLease = [
  {
    name: 'Lease Agreement',
    expiry: 'Expires: 13/01/2021',
    cost: '£59.99/Month',
    payment: 'Paid with Direct Debit',
    mileageLimit: '100,000',
    termDuration: '5 years',
    upfrontPayment: '£2,000.00'
  }
];

export const LeaseContainer = ({ render }: Props) => {
  return render({
    title,
    activeLeases: activeLease,
    expiredLeases: expiredLease
  });
};

type Lease = {
  name: string;
  expiry?: string;
  cost?: string;
  payment?: string;
  mileageLimit?: string;
  termDuration?: string;
  upfrontPayment?: string;
};

export type LeaseContainerRenderProps = {
  title: string;
  activeLeases: Lease[];
  expiredLeases: Lease[];
};

type Props = SmartComponentProps<{
  render: (props: LeaseContainerRenderProps) => JSX.Element;
}>;
