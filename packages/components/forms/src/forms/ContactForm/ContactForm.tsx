/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Button, ButtonGroup } from '@exo/frontend-components-base';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Mode, useForm } from 'react-hook-form';
import { useIntl } from '@exo/frontend-common-i18n';
import { ObjectSchema } from 'yup';
import { FormError } from '../../layout/FormError/FormError';
import { isRequired, requiredLabelText } from '../../helpers/isRequired';
import * as S from './ContactForm.styles';
import { FieldPanel } from '../../layout/FieldPanel/FieldPanel';
import { Field } from '../../layout/Field/Field';
import { FormBody } from '../../layout/FormBody/FormBody';
import { FormHeader } from '../../layout/FormHeader/FormHeader';
import { FormFooter } from '../../layout/FormFooter/FormFooter';
import { TextInput } from '../../fields/TextInput/TextInput';
import { TextArea } from '../../fields/TextArea/TextArea';
import { onChangeResolver } from '../../helpers/onChangeResolver';

// eslint-disable-next-line react/prop-types
export const ContactForm = ({
  onSubmit,
  onCancel,
  onError,
  onChange,
  children,
  error,
  renderFooter,
  intlPrefix = 'ContactForm',
  mode = 'onBlur',
  schema,
  data
}: Props) => {
  const { register, handleSubmit, formState, control } = useForm({
    mode,
    ...(schema && { resolver: onChangeResolver(onChange, yupResolver(schema)) })
  });
  const intl = useIntl(intlPrefix);

  const footerFn =
    renderFooter ??
    (({ isDirty, isValid }) => (
      <ButtonGroup>
        <Button variant="secondary" onClick={onCancel} label={intl.msg('cancel.label', 'Cancel')} />
        <Button
          type="submit"
          disabled={!isDirty || !isValid}
          label={intl.msg('submit.label', 'Continue')}
        />
      </ButtonGroup>
    ));

  return (
    <S.ContactForm onSubmit={handleSubmit(onSubmit, onError)}>
      {error && (
        <FormHeader>
          <FormError titleText="Error">{error}</FormError>
        </FormHeader>
      )}

      <FormBody>
        <FieldPanel
          title={intl.msg('section.about_you.title', 'About you')}
          helpText={intl.msg(
            'section.about_you.help',
            'Tell us about you, so we can get this right'
          )}
        >
          <Field>
            <TextInput
              id="name"
              {...register('name', { required: true, minLength: 3 })}
              isRequired={isRequired(schema, 'name', true)}
              requiredLabelText={requiredLabelText(intl)}
              control={control}
              value={data?.name}
              errorText={intl.error(formState.errors.name)}
              labelText={intl.msg('name.label', 'Name')}
              placeholderText={intl.msg('name.placeholder', 'Your Name')}
            />
          </Field>

          <Field>
            <TextInput
              id="email"
              {...register('email', { required: true, minLength: 6 })}
              isRequired={isRequired(schema, 'email', true)}
              requiredLabelText={requiredLabelText(intl)}
              control={control}
              type="email"
              value={data?.email}
              errorText={intl.error(formState.errors.email)}
              labelText={intl.msg('email.label', 'Email address')}
              placeholderText={intl.msg('email.placeholder', 'Your email')}
            />
          </Field>
        </FieldPanel>

        <FieldPanel
          title={intl.msg('section.details.title', 'Details of your inquiry')}
          helpText={intl.msg('section.details.help', 'Please tell us more about your enquiry')}
        >
          <Field>
            <TextInput
              id="subject"
              {...register('subject', { required: true, minLength: 6 })}
              isRequired={isRequired(schema, 'subject', true)}
              requiredLabelText={requiredLabelText(intl)}
              control={control}
              value={data?.subject}
              errorText={intl.error(formState.errors.subject)}
              labelText={intl.msg('subject.label', 'Subject')}
              placeholderText={intl.msg('subject.placeholder', 'Subject of your inquiry')}
            />
          </Field>

          <Field>
            <TextArea
              id="message"
              {...register('message', { required: true, minLength: 6 })}
              isRequired={isRequired(schema, 'message', true)}
              requiredLabelText={requiredLabelText(intl)}
              control={control}
              value={data?.message}
              errorText={intl.error(formState.errors.message)}
              labelText={intl.msg('message.label', 'Tell us more here...')}
              placeholderText={intl.msg('message.placeholder', 'What problem are you facing?')}
            />
          </Field>
        </FieldPanel>

        {children}
      </FormBody>

      {footerFn && <FormFooter>{footerFn(formState)}</FormFooter>}
    </S.ContactForm>
  );
};

type Props = {
  onSubmit: (data: any) => void;
  onError?: (error: any) => void;
  onCancel?: () => void;
  onChange?: (data: any) => void;
  error?: string;
  intlPrefix?: string;
  children?: any;
  renderFooter?: (state: any) => React.ReactElement;
  data?: {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
  };
  mode?: Mode;
  schema?: ObjectSchema;
};
