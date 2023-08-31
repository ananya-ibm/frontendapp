/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Button } from '@exo/frontend-components-base';
import { EmptyCart } from '@exo/frontend-components-commerce';
import React, { useState, useEffect } from 'react';
import { useSessionContext } from '@exo/frontend-common-session-context';
import { useHistory } from 'react-router-dom';
import { useTradeIn } from '@exo/frontend-features-automotive-cart-automotive-logic';
import * as S from './AutomotiveCart.styles';
import CartContent from './CartContent';
import TradeInModal from './TradeInModal';


const AutomotiveCart = ({
  title = 'Your Car',
  description = 'Here you can view and saved vehicle configurations. You can also review and update your finance option before proceeding to checkout',
  hasShowCheckout = true,
  isFinanceOpen = false,
  hasShowGoToCart = true
}: Props) => {
  const session = useSessionContext();
  const history = useHistory();
  const tradeIn = useTradeIn();

  // TODO: Maybe we want to re-enable this??
  // if (!session || session.type !== 'USER') history.push('/account-profile/login');

  // finance
  const [financeSelector, setFinanceSelector] = useState<any>({
    isOpen: isFinanceOpen,
    hasFinance: !!session.financeOption?.id,
    selectorOption: null,
    financeOption: session.financeOption?.type
  });

  // trade in
  const [tradeInModal, toggleTradeInModal] = useState(false);
  const [tradeInConfirmation, toggleConfirmation] = useState(false);
  const [valuation, setValuation] = useState<any | undefined>(undefined);

  const { data, error } = tradeIn.getTradeIn();

  useEffect(() => {
    if (!data || !data.tradeInValuation) return;
    setValuation(data.tradeInValuation);
    toggleConfirmation(true);
  }, [data]);

  const onCheckoutClick = () => {
    history.push('/cart/checkout');
  };

  return (
    <S.AutomotiveCart>
      <S.Title>{title}</S.Title>
      <S.CartHeader>
        <S.Text>{description}</S.Text>
        {hasShowCheckout && session.cartId && (
          <Button onClick={() => onCheckoutClick()} label="Proceed to Checkout" />
        )}
      </S.CartHeader>
      {session.cartId ? (
        <CartContent
          financeSelector={financeSelector}
          setFinanceSelector={setFinanceSelector}
          valuation={valuation}
          toggleTradeInModal={toggleTradeInModal}
          toggleConfirmation={toggleConfirmation}
          tradeInError={error}
          hasGoToCart={hasShowGoToCart}
        />
      ) : (
        // eslint-disable-next-line react/jsx-indent
        <S.EmptyCart>
          <EmptyCart
            secondaryUrl="/catalog/category/Vehicles"
            primaryUrl="/cart/finance"
            secondaryText="Choose your car"
            primaryText="Choose your finance"
          />
        </S.EmptyCart>
      )}
      {tradeInModal && (
        <TradeInModal
          tradeInModal={tradeInModal}
          toggleTradeInModal={toggleTradeInModal}
          // @ts-ignore
          valuation={valuation}
          setValuation={setValuation}
          tradeInConfirmation={tradeInConfirmation}
          toggleConfirmation={toggleConfirmation}
        />
      )}
    </S.AutomotiveCart>
  );
};

type Props = {
  title?: string;
  description?: string;
  hasShowCheckout?: boolean;
  isFinanceOpen?: boolean;
  hasShowGoToCart?: boolean;
};

export default AutomotiveCart;
