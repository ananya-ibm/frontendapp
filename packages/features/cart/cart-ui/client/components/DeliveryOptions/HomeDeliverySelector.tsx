/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable react/jsx-props-no-spreading */

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Dropdown } from '@exo/frontend-components-forms';
import { useIntl } from '@exo/frontend-common-i18n';


export const HomeDeliverySelector = ({ methods, selected, onChange }: Props) => {
 
  const intl = useIntl('features.cart.cart-ui.components');

  const [deliveryMethod, setDeliveryMethod] = useState();
  const { watch, control, register } = useForm({ mode: 'onChange' });

  const watchedDeliveryMethod = watch('deliveryMethod');

  useEffect(() => {
    if (watchedDeliveryMethod && watchedDeliveryMethod !== deliveryMethod) {
      setDeliveryMethod(watchedDeliveryMethod);
      onChange(watchedDeliveryMethod);
    }
  }, [watchedDeliveryMethod]);

  return (
    <Dropdown
      id="deliveryMethod"
      labelText={intl.msg('HomeDeliverySelector.labeltext', 'Delivery Method')}
      placeholderText="Delivery Method"
      isRequired
      isInFieldPanel
      control={control}
      {...register('deliveryMethod')}
      value={selected}
      items={methods.map(m => ({ name: m.name, value: m.shippingModeId }))}
    />
  );
};

type Props = {
  selected: string;
  onChange: (method: string) => void;
  methods: { name: string; shippingModeId: string }[];
};
