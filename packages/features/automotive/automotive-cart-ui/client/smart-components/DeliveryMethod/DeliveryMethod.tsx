/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { LayoutSpacing } from '@exo/frontend-components-core';
import { Button } from '@exo/frontend-components-base';
import { BaseForm, RadioButtonGroup } from '@exo/frontend-components-forms';
import { useForm } from 'react-hook-form';
import * as S from './DeliveryMethod.styles';
import { useEffectOnce, useScrollViewportTo } from '@exo/frontend-common-hooks';

import CheckoutStoreLocator from '../CheckoutStoreLocator/CheckoutStoreLocator';

const DeliveryMethod = ({ onNextClick, onBackClick }: Props) => {
  const { register, handleSubmit, formState, control, reset, watch } = useForm({
    mode: 'onBlur'
  });

  useScrollViewportTo(0, 0);

  useEffectOnce(() => {
    reset({ deliveryChoice: 'deliver' });
  });

  const onFormSubmit = values => {
    onNextClick(values);
  };

  const selectedMethod = watch('deliveryChoice');

  return (
    <S.DeliveryMethod>
      <h2>Select a delivery method</h2>
      <p className="copy">
        Your final vehicle price will be displayed once you have selected your retailer.
      </p>
      <p className="copy">
        You can choose to have the vehicle delivered to your home or arrange collection from a
        retailer. Both are free of charge for the first 50 miles and any excess is subject to a
        reasonable charge (no more than £2.00 per mile). Deliveries to addresses outside mainland UK
        will also be subject to reasonable delivery charges.*
      </p>

      <BaseForm
        onSubmit={onFormSubmit}
        data={{}}
        form={{ handleSubmit, formState, reset }}
        renderFooter={() => (
          <S.ButtonGroup>
            <Button variant="secondary" onClick={onBackClick} label="Back" />
            <Button type="submit" label="Next" />
          </S.ButtonGroup>
        )}
      >
        <div>
          <p className="copy">
            <strong>The delivery address must be the same as your billing address.</strong>
          </p>
          <p className="copy">
            Once a vehicle is reserved, your retailer will be in touch to complete the order
            process.
          </p>
        </div>

        <LayoutSpacing size="sm" />

        <RadioButtonGroup
          id="deliveryChoice"
          {...register('deliveryChoice', { required: true })}
          control={control}
          labelText=""
          items={[
            { name: 'Deliver to my home', value: 'deliver' },
            { name: 'Collect from dealership', value: 'collect' }
          ]}
        />

        {selectedMethod === 'collect' && <CheckoutStoreLocator />}
      </BaseForm>
    </S.DeliveryMethod>
  );
};

type Props = {
  onBackClick: () => void;
  onNextClick: (values: any) => void;
};

export default DeliveryMethod;
