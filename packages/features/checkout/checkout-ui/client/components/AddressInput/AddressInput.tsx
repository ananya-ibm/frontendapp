/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { useIntl } from '@exo/frontend-common-i18n';
import { LayoutSpacing } from '@exo/frontend-components-core';
import { AddressForm as ExoAddressForm } from '@exo/frontend-components-forms';
import { removeNull } from '@exo/frontend-common-utils';
import { validatorFactory } from '@exo/frontend-common-validator-factory';
import * as yup from 'yup';
import { Address } from '@exo/frontend-features-checkout-logic';
import { AddressSearch } from '@exo/frontend-features-account-address-search';
import { Button, ButtonGroup } from '@exo/frontend-components-base';
import * as S from './AddressInput.styles';
import { BillingAddressEnableCheckbox } from '../BillingAddressEnableCheckbox/BillingAddressEnableCheckbox';

export const AddressInput = ({
  countriesList,
  isBillingEnabled,
  onToggleUseBillingAddress,
  addressSearch,
  addressToDisplay,
  onFormSubmit = () => {},
  onFormBack = () => {},
  type = 'billing'
}: Props) => {
  const intl = useIntl('features.checkout.checkout-ui.components.AddressInput');

  // TODO: Remove once "Exo"AddressForm supports countryCode
  const fixedAddress = removeNull({ ...addressToDisplay, country: addressToDisplay?.countryCode });

  return (
    <div>
      <LayoutSpacing size="sm" />

      <ExoAddressForm
        intlPrefix="features.checkout.checkout-ui.components.AddressInput"
        dataId={addressToDisplay?.id}
        type={type}
        onSubmit={v => {
          const values = v;
          values.province = !values.province || values.province === '' ? 'N/A' : values.province;
          values.id = addressToDisplay?.id;
          onFormSubmit(values);
        }}
        onCancel={onFormBack}
        data={fixedAddress}
        countries={countriesList}
        fields={[
          ...(addressSearch ? ['addressSearch'] : []),
          ...(type === 'shipping' ? ['phone', 'email'] : []),
          'firstName',
          'lastName',
          'address1',
          'address2',
          'country',
          'city',
          'province',
          'zip'
        ]}
        schema={yup
          .object()
          .shape(
            validatorFactory(
              [
                ...(type === 'shipping' ? ['phone', 'email*'] : []),
                'firstName*',
                'lastName*',
                'address1*',
                'province',
                'city*',
                'country*',
                'zip*'
              ],
              true
            )
          )}
        addressSearch={addressSearch}
        cancelLabel={intl.msg('exoaddressform.back', 'Back')}
        saveLabel={intl.msg('exoaddressform.continue', 'Continue')}
        renderFooter={() => (
          <>
            <S.Footer>
              {onToggleUseBillingAddress && (
                <S.BillingCheckbox>
                  <BillingAddressEnableCheckbox
                    isBillingEnabled={isBillingEnabled ?? false}
                    onCheck={() => onToggleUseBillingAddress!()}
                  />
                </S.BillingCheckbox>
              )}
              <S.Buttons>
                <ButtonGroup isLeft>
                  <Button
                    variant="link"
                    onClick={onFormBack}
                    label={intl.msg('exoaddressform.back', 'Back')}
                  />
                  <Button
                    variant="tertiary"
                    type="submit"
                    label={intl.msg('exoaddressform.continue', 'Continue')}
                  />
                </ButtonGroup>
              </S.Buttons>
            </S.Footer>
          </>
        )}
      />

      <LayoutSpacing size="sm" />
    </div>
  );
};

AddressInput.Skeleton = () => <div>Loading...</div>;

type Props = {
  type?: 'shipping' | 'billing';
  addressToDisplay?: Address;
  addressSearch?: AddressSearch;
  isBillingEnabled?: boolean;
  onToggleUseBillingAddress?: () => void;
  onFormSubmit?: (addr: Address) => void;
  onFormBack?: () => void;
  countriesList?: {
    name: string;
    value: string;
    phonePrefix: string;
    states?: {
      name: string;
      value: string;
    }[];
  }[];
};
