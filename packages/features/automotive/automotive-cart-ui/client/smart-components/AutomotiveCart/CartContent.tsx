/* eslint-disable react/jsx-indent */
/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import { Button } from '@exo/frontend-components-base';
import { TradeIn, ConfigurationSummary } from '@exo/frontend-components-automotive';
import React from 'react';
import { useSessionContext } from '@exo/frontend-common-session-context';
import { useHistory, useLocation } from 'react-router-dom';
import {
  useFinance,
  useCarts,
  useCartModification
} from '@exo/frontend-features-automotive-cart-automotive-logic';
import { useConfigurator } from '@exo/frontend-features-automotive-configurator-logic';
import { format, addMonths } from 'date-fns';
import { addImageExt } from '@exo/frontend-common-utils';
import * as S from './AutomotiveCart.styles';
import Finance from '../Finance/Finance';
import {
  getPriceBreakdown,
  getCartItems,
  getBaseProduct,
  getOptions,
  mapOptions
} from './Cart.helper';
import { useNotificationContext } from '@exo/frontend-common-notification';

const renderError = e => <div>{`Error! ${e}`}</div>;

const CartContent = ({
  financeSelector,
  setFinanceSelector,
  valuation,
  toggleTradeInModal,
  toggleConfirmation,
  tradeInError,
  hasGoToCart=true
}: Props) => {
  const { createNotification } = useNotificationContext()!;
  const session = useSessionContext();
  const finance = useFinance();
  const { saveConfiguration, deleteConfiguration, isSaving } = useConfigurator({
    configurationId: session?.configurationId
  });
  const history = useHistory();
  const location = useLocation();
  const cartModification = useCartModification();

  const handleFinanceSelection = () => {
    if (!financeSelector.selectorOption || !session.personalContractPurchase) {
      // do not change finance selection if user goes back to cart early
      setFinanceSelector({
        ...financeSelector,
        isOpen: false,
        selectorOption: null
      });
      return;
    }

    setFinanceSelector({
      isOpen: false,
      hasFinance: true,
      selectorOption: null,
      financeOption: financeSelector.selectorOption
    });

    finance.create({
      type: financeSelector.selectorOption,
      personalContractPurchase: session.personalContractPurchase
    });

    if (location.pathname !== '/cart/cart') {
      history.push('cart/cart');
    }
  };

  const getCarts = useCarts();
  const { data, error, loading } = getCarts.getCarts();

  if (loading) return <div style={{ marginTop: '32px' }}>Loading...</div>;
  if (error) return renderError(error);

  const carts = data.me?.carts;
  if (!carts || !carts.length) return renderError('Failed to get carts');

  const cart = carts[0];
  if (!cart) return renderError('Failed to get cart');

  // @ts-ignore
  const cartItems = getCartItems(cart);
  // @ts-ignore
  if (!cartItems || !cartItems.length) return renderError('Failed to get cart items');

  const baseProduct = getBaseProduct(cartItems);
  if (!baseProduct) return renderError('Cart does not contain a vehicle');

  const options = getOptions(cartItems);

  const priceBreakdown = getPriceBreakdown({ baseProduct, options });

  const handleSave = async () =>
    // @ts-ignore
   (await saveConfiguration(session.configurationId)
      && 
      createNotification({
        kind: 'success',
        title: 'Your configuration has been saved'}));
      

  const handleChange = () => {
    const configurationId = session?.configurationId;

    if (configurationId && baseProduct.id) {
      history.push(`/automotive/${baseProduct.id}/configuration/${configurationId}`);
    } else if (baseProduct.id) {
      // create new configuration if we dont have it stored in the session
      cartModification
        .createConfig(baseProduct.id)
        .then(({ data: config }) => {
          session.set({
            cartId: config.configuredItemCreate.cartId,
            configurationId: config.configuredItemCreate.id
          });

          history.push(
            `/automotive/${baseProduct.id}/configuration/${config.configuredItemCreate.id}`
          );
        })
        // eslint-disable-next-line no-console
        .catch(err => console.log('createConfig error', err));
    }
  };

  const handleDelete = async () =>
    // @ts-ignore
    (await deleteConfiguration(session.configurationId)
        && 
        createNotification({
          kind: 'success',
          title: 'Your configuration has been deleted'}));
          getCarts.deleteCart;

  return (
    <S.CartContent>
      <S.CarSelection isFinanceOpen={financeSelector.isOpen}>
        <ConfigurationSummary
          isSmall={financeSelector.isOpen}
          image={addImageExt(baseProduct.thumbnail)}
          onDeleteConfiguration={handleDelete}
          // @ts-ignore
          configurationCode={session && session.configurationId}
          CTAbutton={() => (
            <Button
              variant="secondary"
              disabled={isSaving}
              onClick={handleSave}
              label="Save Configuration"
            />
          )}
          summaryText={baseProduct.description || baseProduct.longDescription}
          deliveryDate={format(addMonths(new Date(), 1), 'MMMM yyyy')}
          // @ts-ignore
          priceBreakdown={priceBreakdown}
          // @ts-ignore
          summarySelections={mapOptions(handleChange)(options)}
        />
      </S.CarSelection>
      <S.Finance isFinanceOpen={financeSelector.isOpen}>
        <Finance
          priceBreakdown={priceBreakdown as any}
          financeSelector={financeSelector}
          setFinanceSelector={setFinanceSelector}
        />
      </S.Finance>
      {tradeInError ? (
        <div>{`Error! ${tradeInError}`}</div>
      ) : (
        <TradeIn
          onClickTradeIn={() => {
            toggleTradeInModal(true);
            toggleConfirmation(false);
          }}
          text="You added a car for trade-in. The estimated valuation of your car is displayed on the right. To change the trade-in option, click Edit trade-in."
          registrationNumber={valuation && valuation.registration}
          estimatedValue={valuation?.value}
          addTradeIn={{
            text: 'Add Trade-in',
            onClick: () => toggleTradeInModal(true)
          }}
        />
      )}
      {financeSelector.isOpen && hasGoToCart && (
        <S.CartButton>
          <Button onClick={handleFinanceSelection} label="Save Finance Option" />
        </S.CartButton>
      )}
    </S.CartContent>
  );
};


type Props = {
  financeSelector: {
    isOpen?: boolean;
    hasFinance?: boolean;
    selectorOption?: string;
  };
  setFinanceSelector: (data: any) => void;
  valuation?: {
    registration?: string;
    value: {
      value: string;
    };
  };
  toggleTradeInModal: (state: boolean) => void;
  toggleConfirmation: (state: boolean) => void;
  tradeInError?: any;
  hasGoToCart?: boolean;
};

export default CartContent;
