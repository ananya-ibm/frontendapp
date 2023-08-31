/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React, { useEffect, useState } from 'react';
import { LayoutSpacing, MonetaryAmount, SelectionList } from '@exo/frontend-components-core';
import {
  DeliveryContainer,
  DeliveryContainerRenderProps,
  useCheckoutContext
} from '@exo/frontend-features-checkout-logic';
import { CheckoutConfig } from '../../checkoutConfig';
import { Button, ButtonGroup, Dropdown, LoadingIndicator } from '@exo/frontend-components-base';
import * as S from './DeliveryPanel.styles';
import { StoreFinderContainer } from '@exo/frontend-features-store-logic';

const ShippingModes = ({
  availableShippingModes,
  onChangeShippingMode,
  country,
  storeId
}: ShippingModesProps) => {
  const [selectedShippingMode, setSelectedShippingMode] = useState<string>(
    availableShippingModes?.[0]?.id
  );

  useEffect(() => {
    onChangeShippingMode(selectedShippingMode, storeId);
  }, [selectedShippingMode]);

  return (
    <>
      <SelectionList>
      {availableShippingModes.map((sm) => (
        <SelectionList.Entry
          key={sm.id}
          onClick={() => setSelectedShippingMode(sm.id)}
          defaultSelected={selectedShippingMode === sm.id}
        >
          <S.Name>{sm.identifier}</S.Name>
          <S.Description>
            {sm.shippingRate && (
              <MonetaryAmount value={sm.shippingRate.value} currency={sm.shippingRate.currency} />
            )}
            {sm.shippingRate && sm.description && <> &bull; </>}
            {sm.description}
          </S.Description>
        </SelectionList.Entry>
      ))}
      </SelectionList>

      <LayoutSpacing key="ls" size="sm" />

      {availableShippingModes.map((sm) => (
        <React.Fragment key={`w_${sm.id}`}>
          {selectedShippingMode === sm.id && sm.type === 'PICKUP_IN_STORE' && (
            <S.Widget>
              <StoreFinderContainer
                countries={[{ code: country, label: '' }]}
                render={(args) => 
                  <Dropdown 
                    id="storeId" 
                    labelText="Select store for pickup" 
                    selectedItem={args.stores.find(s => s.id === storeId)}
                    initialSelectedItem={args.stores.find(s => s.id === storeId)}
                    items={args.stores}
                    itemToString={a => a.name}
                    onChange={s => onChangeShippingMode(selectedShippingMode, s.id)}
                  />
                }
              />

            </S.Widget>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

type ShippingModesProps = DeliveryContainerRenderProps & {
  onChangeShippingMode: (shippingModeId?: string, storeId?: string) => void;
  storeId?: string;
  country: string;
};

export const DeliveryPanel = ({}: Props) => {
  const { checkout, dispatch } = useCheckoutContext();

  const [shippingInstruction, setShippingInstruction] =
    useState<{ shippingModeId?: string; storeId?: string }>();

  const onPrevious = () => dispatch({ type: 'PREVIOUS' });
  const onNext = () =>
    dispatch({
      type: 'NEXT',
      shipModeId: shippingInstruction?.shippingModeId,
      storeId: shippingInstruction?.storeId
    });

  const onChangeShippingMode = (shippingModeId?: string, storeId?: string) => {
    setShippingInstruction({ shippingModeId, storeId });
  };

  return (
    <div>
      <h2>Delivery</h2>

      <LayoutSpacing size="sm" />

      <DeliveryContainer
        cartId={checkout.context.cartId}
        renderLoading={() => <LoadingIndicator />}
        render={({ availableShippingModes }) => {
          return (
            <ShippingModes
              availableShippingModes={availableShippingModes}
              onChangeShippingMode={onChangeShippingMode}
              storeId={shippingInstruction?.storeId ?? checkout.context.storeId}
              country={checkout.context.shippingAddress!.country!}
            />
          );
        }}
      />

      <LayoutSpacing size="sm" />

      <ButtonGroup>
        <Button variant="tertiary" onClick={onNext} label={'Continue to payment'} />
        <Button variant="link" onClick={onPrevious} label={'Back'} />
      </ButtonGroup>
    </div>
  );
};

type Props = {
  config: CheckoutConfig;
};
