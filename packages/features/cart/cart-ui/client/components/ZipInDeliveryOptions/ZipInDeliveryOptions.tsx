/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/jsx-props-no-spreading */

import React, { useState, useEffect } from 'react';
import { FormBody, RadioButton, Field, Dropdown, TextInput } from '@exo/frontend-components-forms';
import { SkeletonLine, MonetaryAmount } from '@exo/frontend-components-core';
import { Button } from '@exo/frontend-components-base';
import { useForm } from 'react-hook-form';
import {
  DeliveryOptionTypes,
  ZipInDeliveryOptionsContainerRenderProps
} from '@exo/frontend-features-cart-logic';

import { useIntl } from '@exo/frontend-common-i18n';
import * as S from './ZipInDeliveryOptions.styles';


const encodeClickAndCollectId = (doId?: string, storeId?: string) => `${doId}@@${storeId}`;
const decodeClickAndCollectId = (deliveryOption: string) => deliveryOption?.split('@@');

// eslint-disable-next-line react/prop-types
const Panel = ({ header, children, onSubmit }: PanelProps) => {
const intl = useIntl('features.cart.cart-ui.components');

  return (
    <>
      <S.Title>{intl.msg('ZipDeliveryOptions.Title', 'Shipping')}</S.Title>
      <S.DeliveryOptionsComponent onSubmit={onSubmit ?? (() => {})}>
        <S.DeliveryOptionsHeader>
          {header && header}
        </S.DeliveryOptionsHeader>
        {children}
      </S.DeliveryOptionsComponent>
    </>
  );
};

export const ZipInDeliveryOptions = ({
  isInitialState,
  onDeliveryOptionChange,
  deliveryOptions,
  zipInAddress,
  currentStore,
  onZipIn = () => {},
  storeAvailability,
  selected,
  countries
}: ZipInDeliveryOptionsContainerRenderProps) => {
  const currentShippingModeId = selected?.shippingModeId;
  const intl = useIntl('features.cart.cart-ui.components');

  const [showForm, setShowForm] = useState(false);
  const [formInitialState, setFormInitialState] = useState<string | undefined>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset
  } = useForm({ mode: 'onChange' });

  const clickAndCollectDO = deliveryOptions?.find(
    d => d.method === DeliveryOptionTypes.PICKUP_IN_STORE
  );

  const homeDeliveryDOs = deliveryOptions?.filter(
    d => d.method === DeliveryOptionTypes.HOME_DELIVERY
  );

  const initialDO = deliveryOptions?.find(d => d.shippingModeId === currentShippingModeId);

  const initialDOId =
    initialDO?.method === DeliveryOptionTypes.PICKUP_IN_STORE
      ? encodeClickAndCollectId(currentShippingModeId, currentStore?.id)
      : currentShippingModeId;

  const deliveryOption = watch('deliveryOption');

  useEffect(() => {
    reset({ ...zipInAddress, deliveryOption: initialDOId });
    setFormInitialState(initialDOId);
  }, [initialDOId, zipInAddress?.zip, zipInAddress?.country]);

  useEffect(() => {
    if (!deliveryOption || formInitialState === deliveryOption) return;

    const [shippingModeId, storeId] = decodeClickAndCollectId(deliveryOption);
    onDeliveryOptionChange!({
      method: storeId ? DeliveryOptionTypes.PICKUP_IN_STORE : DeliveryOptionTypes.HOME_DELIVERY,
      shippingModeId,
      storeId,
      storeName: storeAvailability?.find(s => s.id === storeId)?.name
    });
  }, [deliveryOption, formInitialState]);

  return (
    <Panel
      onSubmit={handleSubmit(d => {
        onZipIn(d);
        setShowForm(false);
      })}
      header={
        <>
          {(showForm || isInitialState) && (
            <FormBody>
              {countries.length > 1 && (
                <Field>
                  <Dropdown
                    id="country"
                    {...register('country', { required: true })}
                    control={control}
                    isRequired
                    isInFieldPanel
                    errorText={errors?.country ? 'Required' : ''}
                    placeholderText="Country"
                    items={countries.map(c => ({
                      value: c.isoCode,
                      name: c.name
                    }))}
                  />
                </Field>
              )}

              <Field>
                <TextInput
                  id="zip"
                  {...register('zip', { required: true })}
                  control={control}
                  isRequired
                  isInFieldPanel
                  labelText=""
                  errorText={errors?.zip ? 'Required' : ''}
                  placeholderText="Zip"
                />
              </Field>

              <Button
                variant="tertiary"
                size="small"
                onClick={() => handleSubmit(() => {})}
                label={intl.msg('ZipDeliveryOptions.Button.Label', 'Get')}
              />
            </FormBody>
          )}

          {!showForm && !isInitialState && (
            <p>
              {intl.msg('ZipDeliveryOptions.div.Text', 'Available shipping methods for')} {zipInAddress?.zip}
              &nbsp;&nbsp;<Button variant="link" onClick={() => setShowForm(true)} label="Change" />
            </p>
          )}
        </>
      }
    >
      <S.OptionsList>
        {clickAndCollectDO && (
          <React.Fragment key={DeliveryOptionTypes.PICKUP_IN_STORE}>
            <S.SubTitle>{intl.msg('ZipDeliveryOptions.SubTitle', 'Click and Collect')}</S.SubTitle>
            {storeAvailability
              ?.filter(s => s.type === DeliveryOptionTypes.PICKUP_IN_STORE)
              .map(s => (
                <S.Entry key={s.id}>
                  <S.EntryName>
                    <RadioButton
                      {...register('deliveryOption')}
                      id={`rb_s_${s.id}`}
                      value={encodeClickAndCollectId(clickAndCollectDO.shippingModeId, s.id)}
                      isDisabled={s.status !== 'Available'}
                      labelText={s.name}
                    />
                  </S.EntryName>
                  <S.EntryStatus>{s.status}</S.EntryStatus>
                </S.Entry>
              ))}
          </React.Fragment>
        )}

        {homeDeliveryDOs?.length! > 0 && (
          <React.Fragment key={DeliveryOptionTypes.HOME_DELIVERY}>
            <S.SubTitle>{intl.msg('ZipDeliveryOptions.SubTitle.HomeDelivery', 'Home Delivery')}</S.SubTitle>
            {homeDeliveryDOs?.map(d2 => (
              <S.Entry key={d2.shippingModeId}>
                <S.EntryName>
                  <RadioButton
                    {...register('deliveryOption')}
                    id={`rb_${d2.shippingModeId}`}
                    value={d2.shippingModeId}
                    labelText={d2.name}
                  />
                </S.EntryName>
                <S.EntryRate>
                  {d2.shippingRate && (
                    <MonetaryAmount
                      value={d2.shippingRate.value}
                      currency={d2.shippingRate.currency}
                    />
                  )}
                </S.EntryRate>
              </S.Entry>
            ))}
          </React.Fragment>
        )}
      </S.OptionsList>
    </Panel>
  );
};

type PanelProps = { header?: JSX.Element; children: JSX.Element; onSubmit: () => void };

ZipInDeliveryOptions.Skeleton = () => {
  return (
    <Panel onSubmit={() => {}}>
      <SkeletonLine inverted />
    </Panel>
  );
};

// TODO: This is a hack until all (form) components have migrated to TypeScript
declare module 'react' {
  function forwardRef<T, P = {}>(
    render: (props: any, ref: React.Ref<T>) => React.ReactElement | null
  ): (props: any & React.RefAttributes<T>) => React.ReactElement | null;
}
