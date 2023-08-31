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

export const BillingAddressPanel = ({ config }: Props) => {
  const { checkout, dispatch } = useCheckoutContext();
  const [addressFromBook, setAddressFromBook] = useState<Address>(checkout.context?.billingAddress ?? checkout.context?.shippingAddress);
  const localesQ = useLocales();

  const onPrevious = () => dispatch({ type: 'PREVIOUS' });
  const onNext = (addr: Address) => dispatch({ type: 'NEXT', address: {
    ...addr,
    countryCode: addr.country,
    countryName: localesQ.data.find(d => d.isoCode === addr.country)?.name
  }});
  const intl = useIntl('features.checkout.checkout-ui.panels.BillingAddressPanel');

  return (
    <>
      <h2>{intl.msg('h1.billingaddress', 'Billing Address')}</h2>
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
                    !!addresses.find(a => a.id === checkout.context?.billingAddress?.id) ?
                    {
                      ...Object.fromEntries(Object.entries(checkout.context?.billingAddress ?? {}).map(([k]) => [k, ''])),
                      id: undefined
                    } :
                    checkout.context?.billingAddress ?? {}
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
        type="billing"
        addressToDisplay={addressFromBook ?? checkout.context?.billingAddress}
        onFormSubmit={onNext}
        onFormBack={onPrevious}
      />
    </>
  );
};

type Props = {
  config: CheckoutConfig;
};
