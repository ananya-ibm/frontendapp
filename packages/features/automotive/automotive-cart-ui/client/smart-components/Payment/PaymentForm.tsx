/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control */

import React, { useEffect, useState } from 'react';
import * as yup from 'yup';
import { gql } from '@apollo/client';
import { useStripe, CardElement, useElements, CardElementProps } from '@stripe/react-stripe-js';
import {
  useCart,
  usePayment,
  useCheckout
} from '@exo/frontend-features-automotive-cart-automotive-logic';
import { LayoutSpacing } from '@exo/frontend-components-core';
import { Button } from '@exo/frontend-components-base';
import { pipe, omit } from 'ramda';
import { renameKeys } from 'ramda-adjunct';
import { useSessionContext } from '@exo/frontend-common-session-context';
import { removeNull } from '@exo/frontend-common-utils';
import { ObjectSchema } from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { BaseForm, Dropdown, Field, isRequired, TextInput } from '@exo/frontend-components-forms';
import { useIntl } from '@exo/frontend-common-i18n';
import countriesData from '../../utilities/countriesData';
import * as S from './Payment.styles';

const DEFAULTS: Partial<Props> = {
  schema: {
    firstName: yup.string().required('Your first name is required'),
    lastName: yup.string().required('Your last name is required'),
    zip: yup
      .string()
      .matches(/^.[a-zA-Z0-9,._\s]+$/, {
        message: 'Please provide a valid postcode',
        excludeEmptyString: true
      })
      .required('Your postcode/zipcode is required'),
    address1: yup.string().required('Your address is required'),
    address2: yup.string(),
    province: yup.string().matches(/^.[a-zA-Z_\s]+$/, {
      message: 'Alphanumeric characters or underscores only',
      excludeEmptyString: true
    }),
    country: yup.string().required('Please provide a valid county'),
    city: yup
      .string()
      .matches(/^.[a-zA-Z_\s]+$/, {
        message: 'Please provide a valid town',
        excludeEmptyString: true
      })
      .required('Your city is required')
  },
  stripeOptions: {
    hidePostalCode: true,
    style: {
      base: {
        fontFamily: "'IBM Plex Sans', Arial, sans-serif",
        fontSmoothing: 'antialiased',
        fontSize: '1rem',
        '::placeholder': {
          color: '#8c8c8c'
        }
      },
      invalid: {
        color: '#da1e28',
        iconColor: '#da1e28'
      }
    }
  }
};

const TITLES = [
  {
    name: 'Ms',
    value: 'ms'
  },
  {
    name: 'Miss',
    value: 'miss'
  },
  {
    name: 'Mrs',
    value: 'mrs'
  },
  {
    name: 'Mr',
    value: 'mr'
  }
];

const PaymentForm = ({
  onNextClick,
  onBackClick,
  schema = DEFAULTS.schema,
  stripeOptions = DEFAULTS.stripeOptions
}: Props) => {
  const intl = useIntl();
  const formSchema = yup.object().shape(schema as any);

  const { register, handleSubmit, formState, control, reset } = useForm({
    mode: 'onBlur',
    ...(schema && { resolver: yupResolver(formSchema) })
  });

  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [TandC, setTandC] = useState(false);
  const [shippingAddress, setShippingAddress] = useState<any>({});

  useEffect(() => {
    reset(shippingAddress);
  }, [shippingAddress]);

  const { cartId, tradeInId, personalContractPurchase} = useSessionContext();

  let hasShipping = false;

  const countriesList = countriesData.map(country => ({
    text: country.name,
    value: country.name
  }));

  const { data: shippingData, loading: shippingLoading, error: shippingError } = useCart<any>(
    { cartId },
    PaymentForm.fragment
  );
  hasShipping = !shippingLoading || !shippingError;

  const updateAddress = isChecked => {
    if (isChecked && shippingData) {
      const shipAddress = pipe(
        omit(['__typename']),
        renameKeys({ titleCode: 'title' })
      )(shippingData.me.carts[0].shippingInfo.shippingAddress);
      setShippingAddress({
        ...removeNull(shipAddress)
      });
    }
  };

  const stripe = useStripe();
  const elements = useElements();
  const payment = usePayment();

  const { updateBilling, checkout } = useCheckout();

  const handlePayment = values => {
    if (!stripe || !elements) return;
    setLoading(true);

    const address = pipe(omit(['__typename']), renameKeys({ title: 'titleCode' }))(values);

    updateBilling(cartId, address)
      .then(() => payment.initiatePayment({ financeId: personalContractPurchase, tradeInId }))
      .then(({ data }) => {
        const clientSecret = data.payInitiate;
        return stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement)!,
            billing_details: {
              name: values.firstName + values.lastName,
              address: {
                city: values.city,
                line1: values.address1,
                line2: values.address2,
                postal_code: values.zip
              }
            }
          }
        });
      })
      .then(result => {
        if (result?.error) {
          setError(result.error);
          throw new Error(result.error.toString());
        }
        if (!error && result?.paymentIntent?.status === 'succeeded') {
          return result;
        }
        const err = 'UNKNOWN_PAYMENT_ERROR';
        setError(err);
        throw new Error(err);
      })
      .then(() => checkout(cartId))
      .then(({ data }) => {
        if (!data.checkout) {
          const err = 'ORDER_ERROR';
          setError(err);
          throw new Error(err);
        }
      })
      .then(() => setLoading(false))
      .then(() => onNextClick(values))
      .catch(setError);
  };

  if (error) return <div>{`Payment Error! ${error}`}</div>;

  return (
    <S.PaymentForm>
      <h4>Your billing address</h4>
      <div className="billingInfo">
        Please ensure the billing address matches the registered address of the card being used for
        the reservation fee payment.
      </div>
      {hasShipping && (
        <label id="useShipping">
          <input
            id="useShipping"
            name="useShipping"
            type="checkbox"
            onChange={e => updateAddress(e.target.checked)}
          />{' '}
          Is the billing address the same as the shipping address?
        </label>
      )}
      <LayoutSpacing size="sm" />

      <BaseForm
        onSubmit={handlePayment}
        data={{}}
        form={{ handleSubmit, formState, reset }}
        renderFooter={() => (
          <S.ButtonGroup>
            <Button variant="secondary" onClick={onBackClick} label="Back" />
            <Button
              type="submit"
              disabled={!stripe || !TandC || isLoading}
              label="Confirm payment"
            />
          </S.ButtonGroup>
        )}
      >
        <Field>
          <Dropdown
            id="title"
            {...register('title', {})}
            control={control}
            isRequired={isRequired(formSchema, 'title', true)}
            labelText="Title"
            placeholderText="Choose an option"
            errorText={intl.error(formState.errors.title)}
            items={TITLES}
          />
        </Field>

        <Field>
          <TextInput
            id="firstName"
            {...register('firstName', {})}
            control={control}
            isRequired={isRequired(formSchema, 'firstName', true)}
            labelText="First name"
            placeholderText="First name"
            errorText={intl.error(formState.errors.firstName)}
          />
        </Field>

        <Field>
          <TextInput
            id="lastName"
            {...register('lastName', {})}
            control={control}
            isRequired={isRequired(formSchema, 'lastName', true)}
            labelText="Last name"
            placeholderText="Last name"
            errorText={intl.error(formState.errors.lastName)}
          />
        </Field>

        <Field>
          <TextInput
            id="zip"
            {...register('zip', {})}
            control={control}
            isRequired={isRequired(formSchema, 'zip', true)}
            labelText="Postcode"
            placeholderText="Postcode"
            errorText={intl.error(formState.errors.zip)}
          />
        </Field>

        <Field>
          <TextInput
            id="address1"
            {...register('address1', {})}
            control={control}
            isRequired={isRequired(formSchema, 'address1', true)}
            labelText="Address line 1"
            placeholderText="Address line 1"
            errorText={intl.error(formState.errors.address1)}
          />
        </Field>

        <Field>
          <TextInput
            id="address2"
            {...register('address2', {})}
            control={control}
            isRequired={isRequired(formSchema, 'address2', false)}
            labelText="Address line 2"
            placeholderText="Address line 2"
            errorText={intl.error(formState.errors.address2)}
          />
        </Field>

        <Field>
          <TextInput
            id="city"
            {...register('city', {})}
            control={control}
            isRequired={isRequired(formSchema, 'city', true)}
            labelText="Town"
            placeholderText="Town"
            errorText={intl.error(formState.errors.city)}
          />
        </Field>

        <Field>
          <TextInput
            id="province"
            {...register('province', {})}
            control={control}
            isRequired={isRequired(formSchema, 'province', true)}
            labelText="County"
            placeholderText="County"
            errorText={intl.error(formState.errors.province)}
          />
        </Field>

        <Field>
          <Dropdown
            id="country"
            {...register('country', {})}
            control={control}
            isRequired={isRequired(formSchema, 'country', false)}
            labelText="Country"
            placeholderText="Choose an option"
            errorText={intl.error(formState.errors.country)}
            items={countriesList.map(c => ({ name: c.text, value: c.value }))}
          />
        </Field>

        <LayoutSpacing size="sm" />
        <h4>Your payment details</h4>
        <CardElement options={stripeOptions} />
        <LayoutSpacing size="sm" />

        <label id="confirm">
          <input
            id="confirm"
            data-testid="confirm"
            name="confirm"
            type="checkbox"
            onChange={e => setTandC(e.target.checked)}
          />{' '}
          I agree to the <S.Link>Terms and Conditions</S.Link> and have read your{' '}
          <S.Link>Privacy Policy</S.Link>
        </label>
      </BaseForm>
    </S.PaymentForm>
  );
};

PaymentForm.fragment = gql`
  fragment CrtShippingInfo on CrtCart {
    id
    shippingInfo {
      shippingAddress {
        address1
        address2
        city
        country
        firstName
        lastName
        name
        email
        phone
        province
        zip
        titleCode
      }
    }
  }
`;

type Props = {
  onBackClick: () => void;
  onNextClick: (data: any) => void;
  schema?: ObjectSchema<any, any>['fields'];
  stripeOptions?: CardElementProps['options'];
};

export default PaymentForm;
