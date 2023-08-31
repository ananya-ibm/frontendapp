/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import CheckoutCash from './CheckoutCash';
import CheckoutFinanced from './CheckoutFinanced';

const Checkout = ({ isFinanced, cartId }: Props) => {
  if (isFinanced) return <CheckoutFinanced cartId={cartId} />;
  return <CheckoutCash cartId={cartId} />;
};

type Props = {
  isFinanced: boolean;
  cartId: string;
};

export default Checkout;
