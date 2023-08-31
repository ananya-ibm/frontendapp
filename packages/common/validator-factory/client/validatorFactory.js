/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import * as yup from 'yup';
import { isBefore, parseISO } from 'date-fns';

const isExpDateBefore = expirationDate => {
  if (!expirationDate) {
    return false;
  }
  return isBefore(parseISO(expirationDate), new Date());
};

// TODO: These need localization and probably a context to determine what s mandatory and not

const validationSchema = {
  firstName: yup.string(),
  lastName: yup.string(),
  email: yup.string().email(),
  phone: yup
    .string()
    // eslint-disable-next-line no-useless-escape
    .matches(/^\+?\(?[0-9]{1,4}\)?[-\s\.]?(\([0-9]+\))?[0-9]+$/g, { excludeEmptyString: true }),
  zip: yup
    .string()
    .matches(/^.[a-zA-Z0-9,._\s]+$/, {
      message: 'Alphanumeric characters only',
      excludeEmptyString: true
    }),
  address1: yup.string(),
  address2: yup.string(),
  province: yup
    .string()
    .matches(/^.[a-zA-Z_\s/]*$/, {
      message: 'Alphanumeric characters or underscores only',
      excludeEmptyString: true
    }),
  city: yup
    .string()
    .matches(/^.[a-zA-Z_\s]+$/, {
      message: 'Alphanumeric characters or underscores only',
      excludeEmptyString: true
    }),
  country: yup.string(),
  cardholderName: yup.string(),
  cardType: yup.string(),
  csv: yup.string().matches(/^[0-9()-]+$/),
  cardNumber: yup.string().matches(/^[0-9()-]+$/),
  expiryDate: yup
    .string()
    .typeError('Not a valid expiration date. Example: MM/YY')
    .max(5, 'Not a valid expiration date. Example: MM/YY')
    .matches(
      /([0-9]{2})\/([0-9]{2})/,
      'Not a valid expiration date. Example: MM/YY'
    )
    .test(
      'test-credit-card-expiration-date',
      'Invalid Expiration Date is in the past',
      expirationDate => isExpDateBefore(expirationDate)
    ),
  password: yup
    .string()
    .required()
    .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{1,}$/, {
      message:
        'Must contain one upper case letter, one number and one special character',
      excludeEmptyString: true
    }),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Must match password'),
  oldPassword: yup.string(),
  purchaseOrder: yup
    .string()
    .matches(/^.[a-zA-Z0-9,._\s]+$/, {
      message: 'Alphanumeric characters only',
      excludeEmptyString: true
    })
};

const DEFAULT_REQUIRED_FIELDS = [
  'firstName', 'lastName', 'zip', 'address1', 'province', 'city', 'country',
  'cardholderName', 'cardType', 'expiryDate', 'confirmPassword', 'purchaseOrder'
];

const validatorFactory = (fields, requiredFields) => Object.fromEntries(
  fields.map(field => field.replace('*', '')).map((field, idx) => [field, 
    (requiredFields ?? DEFAULT_REQUIRED_FIELDS).includes?.(field) || fields[idx].endsWith('*') ? 
      validationSchema[field].required() : validationSchema[field]
    ]));

export { validatorFactory };
