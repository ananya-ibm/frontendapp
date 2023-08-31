/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { isPermitted } from './isPermitted';

describe('isPermitted', () => {
  test('returns true if user is approved to view/access an action', () => {
    const check = isPermitted('approval-dashboard', ['user', 'b2bapprover']);
    expect(check).toBe(true);
  });

  test('returns false if user is not approved to view/access an action', () => {
    const check = isPermitted('lorem', ['user', 'b2bapprover']);
    expect(check).toBe(false);
  });
});
