/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { useIntl } from '@exo/frontend-common-i18n';
import { Button, ButtonGroup } from '@exo/frontend-components-base';
import { BaseForm, Field, TextInput, Dropdown } from '@exo/frontend-components-forms';
import { useForm } from 'react-hook-form';
import { validatorFactory } from '@exo/frontend-common-validator-factory';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import * as S from './PaymentForm.styles';
import { useScrollViewportTo } from '@exo/frontend-common-hooks';

export const PaymentForm = React.forwardRef<HTMLFormElement>(
  ({ isAdd, payment, setDisplayAddPaymentModal, setEditPayment, hideButtons }, ref) => {
    const { register, handleSubmit, formState, control, reset } = useForm({
      mode: 'onChange',
      resolver: yupResolver(
        yup
          .object()
          .shape(
            validatorFactory(['cardNumber', 'cardholderName', 'csv', 'cardType', 'expiryDate'])
          )
      )
    });

    useScrollViewportTo(0, 0);

    const onFormSubmit = () => {
      if (isAdd) {
        setDisplayAddPaymentModal(false);
      } else if (payment?.id) {
        setEditPayment(null);
      }
    };

    const getInitialValues = () => {
      if (payment) {
        const { id, __typename, ...vals } = payment;
        return vals;
      }
      return {};
    };
   const intl = useIntl('features.account.account-profile-ui.components');

    return (
      <S.PaymentForm>
        <BaseForm
          onSubmit={onFormSubmit}
          data={getInitialValues()}
          renderFooter={
            hideButtons
              ? () => undefined
              : () => (
                  <ButtonGroup>
                    <Button type="submit" label={isAdd ? 'Save' : 'Update Payment Method'} />
                  </ButtonGroup>
                )
          }
          form={{ handleSubmit, formState, reset }}
          ref={ref}
        >
          <Field>
            <Dropdown
              id="cardType"
              {...register('cardType', { required: true })}
              isRequired={true}
              control={control}
              value={getInitialValues()?.cardType}
              errorText={formState.errors.cardType && 'Incorrect'}
              labelText={intl.msg('PaymentForm.Cardtype', 'Card Type')}
              placeholderText={intl.msg('PaymentForm.Cardtype.Placeholder', 'Choose your card type...')}
              items={[
                { name: 'Visa', value: 'visa' },
                { name: 'Visa Debit', value: 'visa debit' },
                { name: 'Mastercard', value: 'mastercard' }
              ]}
            />
          </Field>

          <Field>
            <TextInput
              id="cardNumber"
              {...register('cardNumber', { required: true, minLength: 6 })}
              isRequired={true}
              control={control}
              value={getInitialValues()?.cardNumber}
              errorText={formState.errors.cardNumber && 'Please provide a valid card number'}
              labelText={intl.msg('PaymentForm.Cardnumber', 'Card number')}
              placeholderText={intl.msg('PaymentForm.Cardnumber', 'Card number')}
            />
          </Field>

          <Field>
            <TextInput
              id="cardholderName"
              {...register('cardholderName', { required: true, minLength: 6 })}
              isRequired={true}
              control={control}
              value={getInitialValues()?.cardholderName}
              errorText={
                formState.errors.cardholderName && 'Please provide a valid cardholder number'
              }
              labelText={intl.msg('PaymentForm.Cardholdername', 'Cardholder name')}
              placeholderText={intl.msg('PaymentForm.Cardholdername', 'Cardholder name')}
            />
          </Field>

          <Field>
            <TextInput
              id="expiryDate"
              {...register('expiryDate', { required: true, minLength: 6 })}
              isRequired={true}
              control={control}
              value={getInitialValues()?.expiryDate}
              errorText={formState.errors.expiryDate && 'Please provide a valid expiry date'}
              labelText={intl.msg('PaymentForm.Expirydate', 'Expiry date')}
              placeholderText={'mm/yy'}
            />
          </Field>

          <Field>
            <TextInput
              id="csv"
              {...register('csv', { required: true, minLength: 6 })}
              isRequired={true}
              control={control}
              value={getInitialValues()?.csv}
              errorText={formState.errors.csv && 'Please provide a valid CSV/CVV'}
              labelText={'CSV / CVV'}
              placeholderText={'CSV / CVV'}
            />
          </Field>
        </BaseForm>
      </S.PaymentForm>
    );
  }
);
