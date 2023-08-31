/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React, { useImperativeHandle } from 'react';
import { PaymentHandle } from '../../model/types';

export const NoopPayment = React.forwardRef<PaymentHandle>(({ children }: Props, ref) => {
  useImperativeHandle(
    ref,
    () => ({
      submit: async () => {
        return [];
      }
    }),
    []
  );

  return <>{children}</>;
});

type Props = {
  children: React.ReactNode;
};
