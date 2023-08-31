/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { getComponentTree } from '../defaultSchema/form';
import { getFooter } from '../defaultSchema/footer';
import { parse } from './parse';
import { getFormState, getFormControls } from '../defaultSchema/formState';
import { getValidationSchema } from '../defaultSchema/validation';
import { FormSchemaHandler } from '../types';

export const legacySchemaHandler: FormSchemaHandler<any> = {
  parse,
  getValidationSchema,
  getFooter,
  getComponentTree,
  getFormControls,
  getFormState
};
