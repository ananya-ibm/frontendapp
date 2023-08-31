/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as yup from 'yup';
import { Button, LoadingIndicator } from '@exo/frontend-components-base';
import { useCheckout } from '@exo/frontend-features-automotive-cart-automotive-logic';
import { useMe } from '@exo/frontend-features-account-profile-logic';
import { gql } from '@apollo/client';
import { removeNull } from '@exo/frontend-common-utils';
import { AddressForm } from '@exo/frontend-components-forms';
import countriesData from '../../utilities/countriesData';
import * as S from './ShippingDetails.styles';
import { useScrollViewportTo } from '@exo/frontend-common-hooks';

const SCHEMA = yup.object().shape({
  title: yup.string().required('Your title is required'),
  firstName: yup.string().required('Your first name is required'),
  lastName: yup.string().required('Your last name is required'),
  email: yup
    .string(),
  phone: yup
    .string()
    .required('Your phone number is required'),
  zip: yup
    .string()
    .matches(/^.[a-zA-Z0-9,._\s]+$/, {
      message: 'Alphanumeric characters only',
      excludeEmptyString: true
    })
    .required('Your postcode/zipcode is required'),
  address1: yup.string().required('Your address is required' ),
  address2: yup.string(),
  province: yup
    .string()
    .matches(/^.[a-zA-Z_\s]+$/, {
      message: 'Alphanumeric characters or underscores only',
      excludeEmptyString: true
    }),
  city: yup
    .string()
    .matches(/^.[a-zA-Z_\s]+$/, {
      message: 'Alphanumeric characters or underscores only',
      excludeEmptyString: true
    })
    .required('Your city is required'),
  country: yup.string().required('Your country is required')
});

const ShippingDetails = ({ onNextClick, cartId, onBackClick }: Props) => {
  const { data, loading } = useMe<GQLResponse>({}, ShippingDetails.fragment);
  const initialValues = {
    title: data?.me?.defaultAddress.titleCode,
    firstName: data?.me?.defaultAddress.firstName,
    lastName: data?.me?.defaultAddress.lastName,
    email: data?.me?.email,
    phone: data?.me?.defaultAddress.phone,
    address1: data?.me?.defaultAddress.address1,
    city: data?.me?.defaultAddress.city,
    province: data?.me?.defaultAddress.province,
    zip: data?.me?.defaultAddress.zip,
    country: data?.me?.defaultAddress.country
  };
  const { updateShipping } = useCheckout();

  useScrollViewportTo(0, 0);

  const onFormSubmit = formValues => {
    const values = removeNull(formValues);
    const address = {
      ...values
    };
    updateShipping(cartId, address);
    onNextClick(formValues);
  };

  const countriesList = countriesData.map(country => ({
    name: country.name,
    value: country.name
  }));

  return (
    <S.ShippingDetails>
      <h2>Please fill in your contact details</h2>
      <br />
      {loading ? (
        <LoadingIndicator/>
      ): (
      <AddressForm
        onSubmit={onFormSubmit}
        fields={[
          'title',
          'firstName',
          'lastName',
          'email',
          'phone',
          'address1',
          'address2',
          'city',
          'country',
          'province',
          'zip'
        ]}
        countries={countriesList}
        data={initialValues}
        schema={SCHEMA}
        disabledFields={['email']}
        renderFooter={() => (
          <S.ButtonGroup>
            <Button variant="secondary" onClick={onBackClick} label="Back to cart" />
            <Button type="submit" label="Next" />
          </S.ButtonGroup>
        )}
      />
      )}
    </S.ShippingDetails>
  );
};

type Props = {
  cartId: string;
  onBackClick: () => void;
  onNextClick: (data: any) => void;
};

type GQLResponse = {
  defaultAddress: {
    titleCode?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    address1?: string;
    city?: string;
    country?: string;
    phone?: string;
    province?: string;
    zip?: string;
  };
  email?: string;
};

ShippingDetails.fragment = gql`
  fragment ShippingDetails on CusMe {
    defaultAddress {
      titleCode
      firstName
      lastName
      email
      phone 
      address1 
      country
      city
      province
      zip
    }
    email
  }
`;

export default ShippingDetails;
