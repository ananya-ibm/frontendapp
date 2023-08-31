/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-indent */
/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentHandle } from '@exo/frontend-features-payments-logic';
import * as S from './StripePayment.styles';
import { CardDetails } from './CardDetails';

export const StripePayment = React.forwardRef<PaymentHandle>(
  ({ stripeApiKey, billingAddress }: Props, ref) => {
    // TODO: Change this to use config object from checkout App
    const publishableKey =
      stripeApiKey ??
      process.env.STRIPE_PUBLISHABLE_KEY ??
      'pk_test_JJ1eMdKN0Hp4UFJ6kWXWO4ix00jtXzq5XG';
    const stripePromise = loadStripe(publishableKey!);

    return (
      <S.CardPayment data-testid="cart-CartPayment-Outer">
        <Elements stripe={stripePromise}>
          <div className="label">Credit Card Information</div>
          <CardDetails
            ref={ref}
            firstName={billingAddress.firstName}
            lastName={billingAddress.lastName}
            city={billingAddress.city}
            street={billingAddress.address1}
            zip={billingAddress.zip}
          />
        </Elements>
      </S.CardPayment>
    );
  }
);

type Props = {
  // TODO: Change this to use config object from checkout App
  stripeApiKey?: string;
  billingAddress: {
    firstName: string;
    lastName: string;
    city: string;
    address1: string;
    zip: string;
  };
};
