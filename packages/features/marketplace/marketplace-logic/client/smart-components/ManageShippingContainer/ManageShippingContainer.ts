/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { SmartComponentProps } from '@exo/frontend-common-utils';

export const ManageShippingContainer = ({ render }: Props) => {
  return render({
    shippingMethods: [
      {
        id: 'Flat rate shipping',
        shipping_method_range: '0 - 60',
        shipping_method_rate: '4.50'
      }
    ]
  });
};

type Props = SmartComponentProps<{
  render: (props: ManageShippingContainerRenderProps) => JSX.Element;
}>;

export type ManageShippingContainerRenderProps = {
  shippingMethods: any;
};
