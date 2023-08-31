/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { useCartModification } from '@exo/frontend-features-cart-logic';
import * as S from './CheckoutPage.styles';
import { useSessionContext } from '@exo/frontend-common-session-context';
import { PredefinedBundle } from '../../components/PredefinedBundle/PredefinedBundle';
// import { MonetaryAmount } from '@exo/frontend-components-core';
import { CustomBundle } from '../../components/CustomBundle/CustomBundle';
import { useCart } from '@exo/frontend-features-travel-checkout-page-logic';
import { useHistory } from 'react-router-dom';
import { currencyMap } from '../../utils/utils';

export const CheckoutPage = ({}: Props) => {
  const history = useHistory();
  const session = useSessionContext();
  const cart = useCart();
  const cartModification = useCartModification();
  const { selectedFlight, flightInfo, selectedAncillaries, selectedTravelPackage } = session;

  const checkout = async () => {
    const res = await cart.checkout(session.cartId);
    if (res.data.checkout) {
      const newCartId = await cartModification.createCart({
        oldCartId: session.cartId,
        currency: 'EUR'
      });
      session.set({ ...session, cartId: newCartId, cartCount: 0 });
      history.push('/travel/travel-searchpage');
    }
  };

  const sumCheckout = () => {
    if (selectedFlight?.price) {
      const price = selectedFlight.price.slice(1);
      if (selectedAncillaries) {
        let priceOfAncillaries = 0;
        let currency = '';
        selectedAncillaries.forEach(s => {
          priceOfAncillaries = priceOfAncillaries + +s.priceValue;
          currency = s.priceCurrency;
        });
        return currencyMap[currency] + (+price + priceOfAncillaries).toFixed(2).toString();
      } else if (selectedTravelPackage) {
        return (
          selectedTravelPackage.priceCurrency +
          (+price + selectedTravelPackage.priceValue).toFixed(2).toString()
        );
      }
    }
    return `${currencyMap.EUR}0`;
  };

  return (
    <S.CheckoutPage>
      <S.PageTitle>Express Checkout</S.PageTitle>
      <S.Basket>
        Your basket
        <S.BasketTotal>
          <S.TotalLabel>Total</S.TotalLabel>
          <S.TotalAmount>
            {/* Line below displays the total amount of the cart, which is based on the prices in Commercetools */}
            {/* <CartContainer render={args => <MonetaryAmount {...args.cart.grandTotal} />} /> */}
            {sumCheckout()}
          </S.TotalAmount>
        </S.BasketTotal>
        <S.EditBasket label="Edit basket" onClick={() => {}} variant="link" />
      </S.Basket>

      <S.Cart>
        <S.FlightInfoWrapper>
          <S.FlightJourney
            departureAirport={`${flightInfo?.originLocationCity}, ${flightInfo?.originLocationCode}`}
            arrivalAirport={`${flightInfo?.destinationLocationCity}, ${flightInfo?.destinationLocationCode}`}
            type={flightInfo?.returnDate ? '2-way' : '1-way'}
            price={selectedFlight?.price}
          />
          {flightInfo?.returnDate ? (
            <>
              <S.FlightInfo
                type="outbound"
                flightInfo={flightInfo}
                displayFlight={selectedFlight?.leavingFlight}
              />
              <S.FlightInfo
                type="return"
                flightInfo={flightInfo}
                displayFlight={selectedFlight?.returningFlight}
              />
            </>
          ) : (
            <S.FlightInfo
              type="1-way"
              flightInfo={flightInfo}
              displayFlight={selectedFlight?.leavingFlight}
            />
          )}
        </S.FlightInfoWrapper>

        {selectedAncillaries && <CustomBundle selectedAncillaries={selectedAncillaries} />}
        {selectedTravelPackage && <PredefinedBundle travelPackage={selectedTravelPackage} />}
      </S.Cart>

      <S.Checkout>
        <S.CheckoutButton
          variant="primary"
          label="Checkout"
          iconPosition="left"
          onClick={checkout}
        />
      </S.Checkout>
    </S.CheckoutPage>
  );
};

type Props = {};
