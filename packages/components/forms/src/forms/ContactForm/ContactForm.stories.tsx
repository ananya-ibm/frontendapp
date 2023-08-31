/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { Button } from '@exo/frontend-components-base';
import { IntlProvider } from 'react-intl';
import * as yup from 'yup';
import React from 'react';
import { ContactForm } from './ContactForm';

/* eslint-disable jsx-a11y/anchor-is-valid, no-restricted-syntax */

export default {
  title: 'Components/Forms/Forms/ContactForm',
  component: ContactForm,
  parameters: { actions: { argTypesRegex: '^on.*' } }
};

// ---------------------------------------------------------------------------------------------------

export const Default = args => <ContactForm {...args} />;

Default.args = {
  onSubmit: () => {}
};

// ---------------------------------------------------------------------------------------------------

export const WithErrors = args => <ContactForm {...args} />;

WithErrors.args = {
  ...Default.args,
  error: 'Cannot submit feedback at this time. Please try again',
  data: {
    name: 'John Johnson'
  }
};

// ---------------------------------------------------------------------------------------------------

export const WithCustomChildren = args => (
  <ContactForm {...args}>
    <div>
      For common questions, please see our <a href="#">FAQ</a>.
    </div>
  </ContactForm>
);

WithCustomChildren.args = {
  ...Default.args
};

// ---------------------------------------------------------------------------------------------------

export const WithCustomFooter = args => <ContactForm {...args} />;

WithCustomFooter.args = {
  ...Default.args,
  // eslint-disable-next-line react/prop-types
  renderFooter: ({ isDirty, isValid }) => (
    <>
      <Button type="submit" disabled={!isDirty || !isValid} label="Submit feedback" />
    </>
  )
};

// ---------------------------------------------------------------------------------------------------

const messagesInSwedish = {
  'contactForm.name.label': 'Namn',
  'contactForm.name.placeholder': 'Ange ditt namn',
  'contactForm.email.label': 'Epost',
  'contactForm.email.placeholder': 'Ange din epostaddress',
  'contactForm.subject.label': 'Ämne',
  'contactForm.subject.placeholder': 'Ärenderubrik',
  'contactForm.message.label': 'Meddelande',
  'contactForm.message.placeholder': 'Beskriv ditt ärende',
  'contactForm.submit.label': 'Skicka',
  'contactForm.cancel.label': 'Avbryt',
  'contactForm.error.generic': 'Felaktig data',
  'contactForm.section.about_you.title': 'Om dig själv',
  'contactForm.section.about_you.help': 'Fyll i din personuppgifter så vi kan hjälpa dig',
  'contactForm.section.details.title': 'Ditt ärende',
  'contactForm.section.details.help': 'Beskriv ditt ärende med så mycket detaljer som möjligt.',
  'contactForm.required_suffix': ' ',
  'contactForm.optional_suffix': ' (valfritt)'
};
export const WithIntl = args => (
  <IntlProvider messages={messagesInSwedish} locale="sv" defaultLocale="en">
    <ContactForm {...args} intlPrefix="contactForm" />
  </IntlProvider>
);
WithIntl.args = {
  ...Default.args
};

// ---------------------------------------------------------------------------------------------------

export const WithCustomValidation = args => <ContactForm {...args} />;

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup
    .string()
    .email()
    .required(),
  subject: yup.string().required(),
  message: yup.string().required()
});

WithCustomValidation.args = {
  ...Default.args,
  schema
};
