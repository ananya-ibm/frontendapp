/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as yup from 'yup';
import { ProfileRegistrationContainerRenderProps } from '@exo/frontend-features-account-profile-logic';
import { useHistory } from 'react-router-dom';
import { validatorFactory } from '@exo/frontend-common-validator-factory';
import { RegistrationForm } from '@exo/frontend-components-forms';

import { AddressSearch } from '@exo/frontend-features-account-address-search';
import * as S from './RegistrationPane.styles';

export const RegistrationPane = ({ countries, addressSearch, onRegister }: Props) => {
  const history = useHistory();

  return (
    <S.RegistrationPane>
      <RegistrationForm
        fields={[
          ...(addressSearch ? ['addressSearch'] : []),
          'firstName',
          'lastName',
          'email',
          'password',
          'confirmPassword',
          'title',
          'address1',
          'country',
          'city',
          'province',
          'zip',
          'termsAndConditions',
          'phone'
        ]}
        countries={countries}
        intlPrefix="features.account.account-profile-ui.components"
        schema={yup
          .object()
          .shape(
            validatorFactory(
              [
                'firstName*',
                'lastName*',
                'password*',
                'confirmPassword*',
                'province',
                'city',
                'country',
                'email*',
                'phone',
                'zip'
              ],
              true
            )
          )}
        renderBody={c => <S.RegistrationForm>{c}</S.RegistrationForm>}
        onSubmit={async values => {
          await onRegister(values);
          history.push('/content/homepage?registration=complete');
        }}
        addressSearch={addressSearch}
      />
    </S.RegistrationPane>
  );
};

type Props = ProfileRegistrationContainerRenderProps & {
  addressSearch?: AddressSearch;
};
