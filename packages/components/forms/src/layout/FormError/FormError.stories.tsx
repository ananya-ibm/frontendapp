/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import { FormError } from './FormError';

export default {
  title: 'Components/Forms/Layout/FormError',
  component: FormError
};

export const Default = args => <FormError {...args}>Some error message</FormError>;
Default.args = {
  type: 'error',
  titleText: 'Error'
};

// ---------------------------------------------------------------------------------------------------

export const Warning = args => <FormError {...args}>Some warning message</FormError>;
Warning.args = {
  type: 'warning',
  titleText: 'Warning'
};
