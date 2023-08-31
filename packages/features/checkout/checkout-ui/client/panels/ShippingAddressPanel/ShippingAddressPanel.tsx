/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React, { useState } from 'react';
import { useIntl, useLocales } from '@exo/frontend-common-i18n';
import { LayoutSpacing } from '@exo/frontend-components-core';
import {
  Address,
  AddressBookContainer,
  useCheckoutContext
} from '@exo/frontend-features-checkout-logic';
import { AddressInput } from '../../components/AddressInput/AddressInput';
import { CheckoutConfig } from '../../checkoutConfig';
import { AddressBookSelector } from '../../components/AddressBookSelector/AddressBookSelector';

export const ShippingAddressPanel = ({ config }: Props) => {
  const { checkout, dispatch } = useCheckoutContext();
  const [addressFromBook, setAddressFromBook] = useState<Address>(checkout.context?.shippingAddress);
  const localesQ = useLocales();

  const onPrevious = () => dispatch({ type: 'PREVIOUS' });
  const onNext = (addr: Address) => dispatch({ type: 'NEXT', address: {
      ...addr,
      countryCode: addr.country,
      countryName: localesQ.data.find(d => d.isoCode === addr.country)?.name
    }
  });
  const onToggleUseBillingAddress = () => dispatch({ type: 'TOGGLE_USE_BILLING_ADDRESS' });
  const intl = useIntl('features.checkout.checkout-ui.panels.ShippingAddressPanel');
  if (localesQ.loading) return <div>Loading...</div>;
  return (
    <div>
      <h2>{intl.msg('shippingadresspanel.shippingaddress', 'Shipping Address')}</h2>
      <LayoutSpacing size="sm" />

      {config.feature.addressBook !== 'none' && (
        <AddressBookContainer
          type={config.feature.addressBook}
          render={({ addresses }) => (
            <>
              {addresses.length > 1 && (
                <AddressBookSelector 
                  addresses={addresses}
                  hasNew
                  onAddressSelect={(a) => setAddressFromBook(a)}
                  selectedAddress={addressFromBook}
                  newAddress={
                    !!addresses.find(a => a.id === checkout.context?.shippingAddress?.id) ?
                    {
                      ...Object.fromEntries(Object.entries(checkout.context?.shippingAddress ?? {}).map(([k]) => [k, ''])),
                      id: undefined
                    } :
                    checkout.context?.shippingAddress ?? {}
                  }
                />
              )}
            </>
          )}
        />
      )}

      <AddressInput
        countriesList={localesQ.dataForForm}
        addressSearch={config.feature.addressSearch}
        type="shipping"
        addressToDisplay={addressFromBook}
        isBillingEnabled={checkout.context.useBillingAddress ?? false}
        onToggleUseBillingAddress={onToggleUseBillingAddress}
        onFormSubmit={onNext}
        onFormBack={onPrevious}
      />
    </div>
  );
};

type Props = {
  config: CheckoutConfig;
};
