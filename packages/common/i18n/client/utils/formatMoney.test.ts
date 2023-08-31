/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { formatMoney } from './formatMoney';

describe('formatMoney', () => {
  it('not round if 2 decimals', () => {
    expect(formatMoney(1.23)).toBe('£1.23');
  });

  it('round if 3 decimals', () => {
    expect(formatMoney(1.232)).toBe('£1.23');
  });

  it('avoid decimals if integer', () => {
    expect(formatMoney(2.0)).toBe('£2');
  });
});
