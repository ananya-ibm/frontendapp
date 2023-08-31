/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as yup from 'yup';
import { AddressForm as ExoAddressForm } from '@exo/frontend-components-forms';
import {  removeNull } from '@exo/frontend-common-utils';
import { validatorFactory } from '@exo/frontend-common-validator-factory';

import {
  Address,
  ManageAddressesContainerRenderProps
} from '@exo/frontend-features-account-profile-logic';
import { AddressSearch } from '@exo/frontend-features-account-address-search';
import * as S from './AddressForm.styles';
import { useScrollViewportTo } from '@exo/frontend-common-hooks';

export const AddressForm = React.forwardRef<HTMLFormElement>(
  (
    {
      mode,
      address,
      addressSearch,
      countries,
      onClose,
      onUpdateAddress,
      onAddAddress,
      hideButtons
    }: Props,
    ref
  ) => {
    const onSubmit = async formValues => {
      const values = removeNull(formValues);
      values.province = !values.province || values.province === '' ? 'N/A' : values.province;
      delete values.addressSearch;

      if (mode === 'add') {
        await onAddAddress({ ...values, nickName: values.addressName });
        onClose();
      } else if (address?.id) {
        await onUpdateAddress({ id: address.id, ...values });
        onClose();
      }
    };

    useScrollViewportTo(0, 0);

    return (
      <S.AddressForm>
        <ExoAddressForm
          dataId={address?.id}
          intlPrefix="features.account.account-profile-ui.components"
          idPrefix={mode === 'add' ? 'addAddress' : 'editAddress'}
          fields={[
            ...(mode === 'add' && addressSearch ? ['addressSearch'] : []),
            'firstName',
            'lastName',
            'email',
            'address1',
            'address2',
            'country',
            'city',
            'province',
            'zip',
            'phone'
          ]}

          // TODO: Remove this once "Exo"AddressForm supports countryCode directly
          data={{...address, country: address?.countryCode }}
          countries={countries}
          schema={yup
            .object()
            .shape(
              validatorFactory(
                [
                  'firstName*',
                  'lastName*',
                  'address1*',
                  'province',
                  'city*',
                  'country*',
                  'email*',
                  'phone',
                  'zip*'
                ],
                true
              )
            )}
          saveLabel={mode === 'add' ? 'Add' : 'Save'}
          renderFooter={hideButtons ? () => undefined : undefined}
          onCancel={onClose}
          onSubmit={onSubmit}
          addressSearch={addressSearch}
          ref={ref}
        />
      </S.AddressForm>
    );
  }
);

type Props = {
  mode: 'add' | 'update';
  address?: Address;
  addressSearch?: AddressSearch;
  countries: ManageAddressesContainerRenderProps['countries'];
  hideButtons?: boolean;
  onClose: () => void;
  onUpdateAddress: (addr: Address) => Promise<void>;
  onAddAddress: (addr: Address) => Promise<void>;
};
