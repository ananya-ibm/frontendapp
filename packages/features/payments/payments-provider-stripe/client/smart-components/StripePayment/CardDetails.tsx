/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React, { useImperativeHandle, useState } from 'react';
import { useStripe, CardElement, useElements } from '@stripe/react-stripe-js';
import { PaymentHandle, usePayment } from '@exo/frontend-features-payments-logic';

const DEFAULT_STRIPE_OPTIONS = {
  hidePostalCode: true,
  style: {
    base: {
      // eslint-disable-next-line @typescript-eslint/quotes
      fontFamily: "'IBM Plex Sans', Arial, sans-serif",
      fontSmoothing: 'antialiased',
      fontSize: '1rem',
      '::placeholder': {
        color: '#000'
      }
    },
    invalid: {
      color: '#da1e28',
      iconColor: '#da1e28'
    }
  }
};

export const CardDetails = React.forwardRef<PaymentHandle>(
  (
    { firstName, lastName, city, street, zip, stripeOptions = DEFAULT_STRIPE_OPTIONS }: Props,
    ref
  ) => {
    const [error, setError] = useState<any>(null);

    const stripe = useStripe();
    const elements = useElements();
    const payment = usePayment();

    useImperativeHandle(
      ref,
      () => ({
        submit: async () => {
          const yieldError = (err: any) => {
            setError(err);
            throw new Error(err);
          };

          if (!stripe || !elements) {
            yieldError('Unknown error');
            return;
          }

          const res = await payment.initiatePayment({});

          const clientSecret = res.data.payInitiate;

          if (!clientSecret) {
            yieldError('No clientSecret');
            return;
          }

          const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
              card: elements.getElement(CardElement)!,
              billing_details: {
                name: `${firstName} ${lastName}`,
                address: {
                  city,
                  line1: street,
                  postal_code: zip
                }
              }
            }
          });

          if (result?.error) {
            yieldError(result.error);
            return;
          }

          if (result?.paymentIntent?.status !== 'succeeded') {
            yieldError('UNKNOWN_PAYMENT_ERROR');
            return;
          }

          // eslint-disable-next-line consistent-return
          return [{ name: 'paymentIntent', value: result.paymentIntent.id }];
        }
      }),
      [stripe, elements]
    );

    return (
      <>
        <CardElement options={stripeOptions} />
        {error && <div>{`Payment Error! ${error?.message ?? error}`}</div>}
      </>
    );
  }
);

type Props = {
  firstName: string;
  lastName: string;
  city: string;
  street: string;
  zip: string;
  stripeOptions?: any;
};
