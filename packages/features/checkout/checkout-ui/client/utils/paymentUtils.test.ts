/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { isCardPayment } from './paymentUtils';

describe('isCardPayment function', () => {
  test('it returns true with "VISA"', () => {
    expect(isCardPayment('VISA')).toEqual(true);
  });
  test('it returns true with "Master Card"', () => {
    expect(isCardPayment('Master Card')).toEqual(true);
  });
  test('it returns true with "AMEX"', () => {
    expect(isCardPayment('AMEX')).toEqual(true);
  });
  test('it returns true with "credit-card"', () => {
    expect(isCardPayment('credit-card')).toEqual(true);
  });
  test('it returns false with a random string', () => {
    expect(isCardPayment('random')).toEqual(false);
  });
});
