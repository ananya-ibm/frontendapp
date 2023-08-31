/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/boolean-prop-naming, react/jsx-indent-props, react/jsx-indent */

import { TradeInForm, TradeInConfirmation } from '@exo/frontend-components-automotive';
import { Modal } from '@exo/frontend-components-base';
import React from 'react';
import { useSessionContext } from '@exo/frontend-common-session-context';
import { useTradeIn } from '@exo/frontend-features-automotive-cart-automotive-logic';

const TradeInModal = ({
  tradeInModal,
  toggleTradeInModal,
  valuation,
  setValuation,
  tradeInConfirmation,
  toggleConfirmation
}: Props) => {
  const session = useSessionContext();
  const tradeIn = useTradeIn();

  const handleSubmit = ({ registration, mileage, condition }) =>
    tradeIn.addTradeIn({
      registration,
      mileage,
      condition: condition.toUpperCase()
    });

  const handleAcceptValuation = () => {
    session.set({ tradeInId: valuation.id });
    toggleTradeInModal(false);
    toggleConfirmation(false);
  };
  const handleRemoveValuation = () => {
    setValuation(null);
    session.set({ tradeInId: undefined });
    toggleConfirmation(false);
    toggleTradeInModal(false);
  };

  // TODO: Move the buttons to be modal dialog buttons instead of in the confirmation and form
  //       components
  return (
    <Modal title="Add trade in" isOpen={tradeInModal} onClose={() => toggleTradeInModal(false)}>
      {/* {error && <div>{`Error! ${error}`}</div>} */}
      {tradeInConfirmation ? (
        valuation && (
          <TradeInConfirmation
            date={new Date()}
            valuation={valuation}
            onRemoveClick={handleRemoveValuation}
            onAcceptClick={handleAcceptValuation}
          />
        )
      ) : (
        <TradeInForm
          carCondition={{
            label: 'Car Condition',
            options: ['Excellent', 'Good', 'Fair', 'Poor']
          }}
          formProps={{
            onSubmit: handleSubmit,
            initialValues: {
              registration: valuation ? valuation.registration : '',
              mileage: valuation ? valuation.mileage : ''
            }
          }}
        />
      )}
    </Modal>
  );
};


type Props = {
  tradeInModal: boolean;
  toggleTradeInModal: (state: boolean) => void;
  valuation: any;
  setValuation: (state: any) => void;
  tradeInConfirmation: boolean;
  toggleConfirmation: (state: boolean) => void;
};

export default TradeInModal;
