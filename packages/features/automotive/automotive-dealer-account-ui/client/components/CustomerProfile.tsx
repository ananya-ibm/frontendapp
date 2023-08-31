/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import * as yup from 'yup';
import React from 'react';
import { DealerAddressForm } from '@exo/frontend-components-automotive';
import { validatorFactory } from '@exo/frontend-common-validator-factory';
import { PersonalDetailsContainerRenderProps } from '@exo/frontend-features-account-profile-logic';

export const CustomerProfile = ({
  address,
  countries,
  email
}: PersonalDetailsContainerRenderProps) => {
  return (
    <>
      <DealerAddressForm
        fields={['firstName', 'lastName', 'address1', 'country', 'zip']}
        // TODO: Remove once "Exo"AddressForm supports countryCode
        data={{ ...address, email, country: address.countryCode}}
        countries={countries}
        disabledFields={[]}
        renderFooter={() => {}}
        schema={yup
          .object()
          .shape(
            validatorFactory(
              ['firstName', 'lastName', 'address1','country', 'zip']
            )
          )}
      />
    </>
  );
};

CustomerProfile.Skeleton = () => <div>Loading...</div>;
