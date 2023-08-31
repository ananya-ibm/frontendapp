/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { getComponentTree, fieldBuilder } from './form';
import { getFooter } from './footer';
import { parse } from './parse';
import { getFormState, getFormControls } from './formState';
import { getValidationSchema } from './validation';
import { FormSchemaHandler } from '../types';
import { DefaultSchema } from './types';

export const defaultSchemaHandler: FormSchemaHandler<DefaultSchema> = {
  parse,
  getValidationSchema,
  getFooter,
  getComponentTree,
  getFormControls,
  getFormState
};

export { fieldBuilder };
