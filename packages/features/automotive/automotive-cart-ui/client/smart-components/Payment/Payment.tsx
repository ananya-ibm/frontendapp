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
import { Warning } from '@carbon/react/icons';
import { useSessionContext } from '@exo/frontend-common-session-context';
import * as S from './Payment.styles';
import PaymentForm from './PaymentForm';
import { useScrollViewportTo } from '@exo/frontend-common-hooks';

const CONTENT = {
  PERSONAL_CONTRACT_PURCHASE: {
    title: 'Reserve your vehicle with your depsoit now',
    subtitle:
      'Initial checks for your finance application are complete and your application was approved. You are only one step away from reserving your new car.',
    main: [
      'To reserve your vehicle you are required to pay your deposit upfront. This deposit is fully refundable if your full finance application checks are unsuccessful.',
      'Where you have chosen a vehicle from existing stock the vehicle will be reserved for 72 hours after the payment is received. If you are buying a Build to Order vehicle then your reservation will be held for 14 days.',
      'By paying your deposit you are indicating your interest in purchasing or financing a vehicle. It is not a binding order, and does not form an offer or contract for sale of finance. Any order is subject to a separate sales and/or finance contract.'
    ],
    icon:
      'Your selected financial option is Personal Contract Purchase. Your request will be sent to the Financial Department for approval. If your application is rejected your deposit will be refunded within 5 working days.'
  },
  CASH: {
    title: 'Purchase your vehicle now',
    main: [
      "Your car is nearly on it's way to you!",
      'To proceed with purchase you are required to pay the remaining cash balanced owed now. If you have chosen to trade in an existing vehicle the valuation amount has been debited from your total balance.',
      'Where you have chosen a vehicle from existing stock the vehicle you have a consideration period of 72 hours after the payment is received in which you can cancel your order. If you are buying a Build to Order vehicle then your have 14 days to notify us if you change your mind.'
    ],
    icon:
      'You have elected to pay for your vehicle by upfront payment. Finance options are available if you wish to pay in installments.'
  }
};

const Payment = ({ onNextClick, onBackClick }: Props) => {
  const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY;
  const stripePromise = loadStripe(publishableKey!);
  const { financeOption } = useSessionContext();

  useScrollViewportTo(0, 0);

  const { title, subtitle, main, icon } = CONTENT[financeOption?.type || 'CASH'];

  return (
    <S.Payment>
      <h2>{title}</h2>
      {subtitle && <p className="copy bold">{subtitle}</p>}
      {main.map(section => (
        <p key={section} className="copy">
          {section}
        </p>
      ))}
      <S.Alert>
        <S.Icon>
          <Warning size={32} />
        </S.Icon>
        <p className="copy">{icon}</p>
      </S.Alert>
      <S.Form>
        <Elements stripe={stripePromise}>
          <PaymentForm onBackClick={onBackClick} onNextClick={onNextClick} />
        </Elements>
      </S.Form>
    </S.Payment>
  );
};

type Props = {
  onBackClick: () => void;
  onNextClick: () => void;
};

export default Payment;
