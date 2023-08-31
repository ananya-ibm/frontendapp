/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Button, ButtonGroup } from '@exo/frontend-components-base';
import { IntlProvider } from 'react-intl';
import * as yup from 'yup';
import React from 'react';
import { LoginForm } from './LoginForm';

/* eslint-disable jsx-a11y/anchor-is-valid, no-restricted-syntax */

export default {
  title: 'Components/Forms/Forms/LoginForm',
  component: LoginForm,
  parameters: { actions: { argTypesRegex: '^on.*' } }
};

// ---------------------------------------------------------------------------------------------------

export const Default = args => <LoginForm {...args} />;

Default.args = {};

// ---------------------------------------------------------------------------------------------------

export const WithErrors = args => <LoginForm {...args} />;

WithErrors.args = {
  ...Default.args,
  error: 'Non existend username and/or password',
  data: {
    username: 'john@ibm.com',
    password: 'password'
  }
};

// ---------------------------------------------------------------------------------------------------

export const WithCustomChildren = args => (
  <LoginForm {...args}>
    <a href="#">Forgot password</a>
  </LoginForm>
);

WithCustomChildren.args = {
  ...Default.args
};

// ---------------------------------------------------------------------------------------------------

export const WithCustomFooter = args => <LoginForm {...args} />;

WithCustomFooter.args = {
  ...Default.args,
  // eslint-disable-next-line react/prop-types
  renderFooter: ({ isDirty, isValid }) => (
    <ButtonGroup>
      <Button type="submit" disabled={!isDirty || !isValid} label="Log in" />
      <Button variant="tertiary" label="Register" />
    </ButtonGroup>
  )
};

// ---------------------------------------------------------------------------------------------------

const messagesInSwedish = {
  'loginForm.username.label': 'Användarnam eller e-postaddress',
  'loginForm.username.placeholder': 'Användarnam',
  'loginForm.password.label': 'Lösenord',
  'loginForm.password.placeholder': 'Lösenord',
  'loginForm.login.label': 'Logga in',
  'loginForm.error.generic': 'Felaktig data',
  'loginForm.required_suffix': ' ',
  'loginForm.optional_suffix': ' (valfritt)'
};
export const WithIntl = args => (
  <IntlProvider messages={messagesInSwedish} locale="sv" defaultLocale="en">
    <LoginForm {...args} intlPrefix="loginForm" />
  </IntlProvider>
);
WithIntl.args = {
  ...Default.args
};

// ---------------------------------------------------------------------------------------------------

export const WithCustomValidation = args => <LoginForm {...args} />;

const schema = yup.object().shape({
  username: yup
    .string()
    .email()
    .required(),
  password: yup.string().required()
});

WithCustomValidation.args = {
  ...Default.args,
  schema
};
