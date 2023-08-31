/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { AnySchemaConstructor, ObjectSchema, Schema } from 'yup';
import { Intl } from '@exo/frontend-common-i18n';
import { Control, FieldValues, FormState, UseFormRegister, UseFormWatch } from 'react-hook-form';

type FieldType = string;

export type Rule = {
  ref: string;
  property: string;
  operator: 'gt' | 'lt' | 'gte' | 'lte' | 'neq' | 'in' | 'not_in';
  operand: any;
};

export type DynamicFormFieldList = Field[];
export type DynamicFormDefinition = { fields: DynamicFormFieldList };

export type Field = {
  id?: string;
  type: FieldType;
  label?: string;
  label_code?: string;
  helpText?: string;
  presentation?: Record<string, any> & {
    view?: string;
    placeholder?: string;
    reactProps?: any;
  };
  fields?: Field[];
  validations?: ValidationSpec[];
  discriminatorId?: string;
  options?: {
    label: string;
    label_code?: string;
    value?: string;
    visible?: Rule;
    enabled?: Rule;
  }[];
};

export type ValidationSpec = {
  type: string;
  message?: string;
  message_code?: string;
  ref?: string;
  value?: any;
  enabled?: Rule;
};

export type ValidationFunction = (
  y: any,
  opts: ValidationSchemaOpts,
  base: string[],
  v: ValidationSpec
) => Schema<any, any> | AnySchemaConstructor;

export type InternalSchema = {
  fields: Field[];
  footer?: {
    type: 'button';
    presentation: {
      view?: string;
    };
    label: string;
    label_code?: string;
    action: string;
  }[];
};

export type InternalSchemaNode = {
  fields?: Field[];
};

export type ValidationSchemaOpts = {
  customValidationRules: Record<string, ValidationFunction>;
  intl: Intl;
};

export type FooterOpts = {
  actions: Record<string, (() => void) | undefined>;
  intl: Intl;
  formState: FormState<FieldValues>;
  dynamicFormState: DynamicFormState;
};

export type CustomFieldDefinitions = {
  widgets?: (
    | {
        match: string;
        element: (field: Field, opts: ComponentTreeOpts) => React.ReactElement;
      }
    | ((field: Field, opts: ComponentTreeOpts) => React.ReactElement | undefined)
  )[];
  viewOnlyWidgets?: (
    | {
        match: string;
        element: (field: Field, opts: ComponentTreeOpts) => React.ReactElement;
      }
    | ((field: Field, opts: ComponentTreeOpts) => React.ReactElement | undefined)
  )[];
};

export type ComponentTreeOpts = {
  customFieldDefinitions: CustomFieldDefinitions;
  control: Control<FieldValues>;
  register: UseFormRegister<FieldValues>;
  data: any;
  schema: ObjectSchema;
  errors: any;
  intl: Intl;
  watch: UseFormWatch<FieldValues>;
  viewOnly: boolean;

  dynamicFormState: DynamicFormState;
  setDynamicFormState: (s: DynamicFormState) => void;

  // Internal props
  // TODO: We should remove these from here
  getComponentTree?: (schema: InternalSchemaNode, opts: ComponentTreeOpts) => React.ReactElement;
  indexes?: number[];
  keys?: string[];
};

export type DynamicFormState = any;

export type FormSchemaHandler<InputSchema> = {
  parse: (f: InputSchema) => InternalSchema;
  getValidationSchema: (schema: InternalSchema, opts: ValidationSchemaOpts) => ObjectSchema;
  getFooter: (schema: InternalSchema, opts: FooterOpts) => React.ReactElement | undefined;
  getComponentTree: (schema: InternalSchemaNode, opts: ComponentTreeOpts) => any;
  getFormState: (schema: InternalSchema) => DynamicFormState;
  getFormControls: (schema: InternalSchema) => FormControls;
};

type FormControls = {
  canSubmit: (formState: FormState<FieldValues>, dynamicFormState: DynamicFormState) => boolean;
  hasNext: (formState: FormState<FieldValues>, dynamicFormState: DynamicFormState) => boolean;
  hasPrevious: (formState: FormState<FieldValues>, dynamicFormState: DynamicFormState) => boolean;
  next: (formState: FormState<FieldValues>, dynamicFormState: DynamicFormState) => DynamicFormState;
  previous: (
    formState: FormState<FieldValues>,
    dynamicFormState: DynamicFormState
  ) => DynamicFormState;
};
