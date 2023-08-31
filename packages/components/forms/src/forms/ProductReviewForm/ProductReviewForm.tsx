/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import React from 'react';
import { Mode, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useIntl } from '@exo/frontend-common-i18n';
import { ObjectSchema } from 'yup';
import { isRequired, requiredLabelText } from '../../helpers/isRequired';
import { Field } from '../../layout/Field/Field';
import { TextInput } from '../../fields/TextInput/TextInput';
import { BaseForm } from '../BaseForm/BaseForm';
import { onChangeResolver } from '../../helpers/onChangeResolver';

export const ProductReviewForm = React.forwardRef<HTMLFormElement>(
  (
    {
      mode = 'onBlur',
      onSubmit,
      onCancel,
      onChange,
      onError,
      intlPrefix,
      schema,
      data,
      fields = ['productpartnumber', 'name', 'text', 'rating'],
      idPrefix = 'productreview',
      dataId,
      cancelLabel = 'Cancel',
      saveLabel = 'Save'
    }: Props,
    ref
  ) => {
    const { register, handleSubmit, formState, control } = useForm({
      mode,
      ...(schema && { resolver: onChangeResolver(onChange, yupResolver(schema)) })
    });
    const intl = useIntl(intlPrefix);

    return (
      <BaseForm
        onSubmit={onSubmit}
        onCancel={onCancel}
        onError={onError}
        data={data}
        dataId={dataId}
        intlPrefix={intlPrefix}
        cancelLabel={cancelLabel}
        saveLabel={saveLabel}
        form={{ handleSubmit, formState }}
        ref={ref}
      >
          {fields.includes('productpartnumber') && (
          <Field>
            <TextInput
              id={`${idPrefix}_productpartnumber`}
              {...register('productpartnumber')}
              control={control}
              value={data?.product}
              errorText={intl.error(formState.errors.productpartnumber)}
              disabled={true}
              type="hidden"
            />
          </Field>
        )}
        {fields.includes('name') && (
          <Field>
            <TextInput
              id={`${idPrefix}_name`}
              {...register('name', { required: true, minLength: 6 })}
              control={control}
              isRequired={isRequired(schema, 'name', true)}
              requiredLabelText={requiredLabelText(intl)}
              value={data?.product}
              errorText={intl.error(formState.errors.name)}
              labelText="Name"
              placeholderText="Enter your name"
            />
          </Field>
        )}
        {fields.includes('rating') && (
          <Field>
          <TextInput
            id={`${idPrefix}_rating`}
            {...register('rating', { required: true, minLength: 1 })}
            isRequired={isRequired(schema, 'rating', true)}
            requiredLabelText={requiredLabelText(intl)}
            control={control}
            value={data?.product}
            errorText={intl.error(formState.errors.rating)}
            type="hidden"
          />
          </Field>
        )}
        {fields.includes('text') && (
          <Field>
            <TextInput
              id={`${idPrefix}_text`}
              {...register('text', { required: true, minLength: 6 })}
              control={control}
              isRequired={isRequired(schema, 'text', true)}
              requiredLabelText={requiredLabelText(intl)}
              value={data?.product}
              errorText={intl.error(formState.errors.text)}
              labelText="Review Product"
              placeholderText="Type your experience here"
            />
          </Field>
        )}
      </BaseForm>
    );
  }
);

type Props = {
  onSubmit: (data: any) => void;
  onError?: (error: any) => void;
  onCancel?: () => void;
  onChange?: (data: any) => void;
  intlPrefix?: string;
  children?: any;
  data?: Data;
  mode?: Mode;
  cancelLabel?: string;
  saveLabel?: string;
  schema?: ObjectSchema;
  loadItems?: (input: string) => Promise<{ value: string; name: string }[]>;
  fields?: string[];
  dataId?: string;
  idPrefix?: string;
  titles?: {
    name: string;
    value: string;
  }[];
};
type Data = {
  product: {
    reviews: {
      edges: {
        node: {
          id?: string;
          title?: string;
          text?: string;
          rating: number;
          featured?: boolean;
          recommeded?: boolean;
          userLocation?: string;
          updateDate?: string;
          name?: string;
          avatar?: string;
        };
      }[];
    };
  };
};
