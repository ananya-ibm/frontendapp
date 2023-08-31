/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React, { useEffect, useRef, useState } from 'react';
import { useIntl } from '@exo/frontend-common-i18n';
import { gql } from '@apollo/client';
import { LoadingIndicator } from '@exo/frontend-components-base';
import { LayoutSpacing, SelectionList } from '@exo/frontend-components-core';
import {
  PaymentMethodsContainer,
  PaymentMethodsContainerRenderProps,
  useCheckoutContext
} from '@exo/frontend-features-checkout-logic';
import { NoopPayment, PaymentHandle } from '@exo/frontend-features-payments-logic';
import { AccountPayment } from '@exo/frontend-features-payments-provider-account';
import { StripePayment } from '@exo/frontend-features-payments-provider-stripe';
import { isCardPayment, isOfflinePayment } from '../../utils/paymentUtils';
import * as S from './PaymentPanel.styles';
import { PaymentButtons } from './PaymentButtons/PaymentButtons';

const PaymentMethods = ({ availablePaymentMethods }: PaymentMethodsContainerRenderProps) => {
  const [state, setState] = useState('valid');
  const ref = useRef<PaymentHandle>(null);
  const intl = useIntl('features.checkout.checkout-ui.panels.Paymentpanel');
  const { checkout, dispatch } = useCheckoutContext();
  const [selectedPaymentOption, setSelectedPaymentOption] = useState<string>();

  useEffect(() => {
    setSelectedPaymentOption(availablePaymentMethods[0].id);
  }, [availablePaymentMethods]);

  const processAndConfirm = async (attributes: { name: string; value: string }[] = []) => {
    dispatch({ type: 'NEXT', paymentMethod: selectedPaymentOption, attributes });
  };

  return (
    <>
      {checkout.context.loading && <LoadingIndicator />}

      <h2>{intl.msg('paymentpanel.payment', 'Payment')}</h2>
      <LayoutSpacing size="sm" />

      <SelectionList>
      {availablePaymentMethods.map((pm) => (
        <React.Fragment key={pm.id}>
          <SelectionList.Entry
            onClick={() => setSelectedPaymentOption(pm.id)}
            defaultSelected={selectedPaymentOption === pm.id}
          >
            {pm.description}
          </SelectionList.Entry>
        </React.Fragment>
      ))}
      </SelectionList>

      {availablePaymentMethods.map((pm) => (
        <React.Fragment key={`w_${pm.id}`}>
          {selectedPaymentOption === pm.id && (
            <S.Widget>
              {isOfflinePayment(selectedPaymentOption) && (
                <NoopPayment ref={ref}>
                  {intl.msg(
                    'paymentpanel.note',
                    'This payment does not require any additional input'
                  )}
                </NoopPayment>
              )}
              {isCardPayment(selectedPaymentOption) && (
                <StripePayment ref={ref} billingAddress={checkout.context.billingAddress ?? {}} />
              )}
              {selectedPaymentOption === 'account-payment' && <AccountPayment ref={ref} />}
            </S.Widget>
          )}
        </React.Fragment>
      ))}

      <LayoutSpacing size="sm" />

      <PaymentButtons
        nextText={intl.msg('button.nexttext', 'Confirm and Pay') as string}
        prevText={intl.msg('button.prevtext', 'Back') as string}
        isNextDisabled={state !== 'valid'}
        onPrev={() => dispatch({ type: 'PREVIOUS' })}
        onNext={async () => {
          setState('loading');
          try {
            const attributes = await ref.current?.submit();
            setState('valid');
            if (attributes !== undefined) {
              processAndConfirm(attributes);
            }
          } finally {
            setState('valid');
          }
        }}
      />
      <LayoutSpacing size="sm" />
    </>
  );
};

export const PaymentPanel = () => {
  const { checkout } = useCheckoutContext();

  return (
    <PaymentMethodsContainer
      cartId={checkout.context.cartId}
      renderLoading={() => <LoadingIndicator />}
      render={({ availablePaymentMethods }) => {
        return <PaymentMethods availablePaymentMethods={availablePaymentMethods} />;
      }}
    />
  );
};

PaymentPanel.fragment = gql`
  fragment PaymentMethods on CrtCart {
    id
    availablePaymentMethods {
      id
      identifier
      description
      type
    }
  }
`;
