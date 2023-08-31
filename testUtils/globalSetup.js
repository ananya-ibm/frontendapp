/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { toHaveNoViolations, axe } from 'jest-axe';
import { mockDate } from './dateMock';

class ResizeObserver {
  observe() {
      // do nothing
  }
  unobserve() {
      // do nothing
  }
  disconnect() {
      // do nothing
  }
}

window.ResizeObserver = ResizeObserver;


window.axe = axe;
// This avoids a set of unavoidable warning messages
// This list should not grow unless we know for a fact the error message cannot be avoided

const isUnavoidableError = (e, ...rest) =>
  // This error message relates to the code at https://github.com/carbon-design-system/carbon/blob/master/packages/react/src/components/Pagination/Pagination.js
  e.includes(
    'The prop `pageInputDisabled` for Pagination has been deprecated, as the feature of `pageInputDisabled` has been combined with the general `disabled` prop.'
  ) ||
  (rest && rest.toString().includes('Invalid prop `kind` of value `danger')) ||
  // This error relates to code at https://github.com/carbon-design-system/carbon-components-react/blob/master/src/components/SelectItem/SelectItem.js
  (e.includes(
    'Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>.'
  ) &&
    rest.toString().includes('in SelectItem (created by CustomSelect)')) ||
  e.includes('Warning: componentWillReceiveProps has been rename');

const originalWarn = console.warn.bind(console.warn);
const originalError = console.error.bind(console.error);

beforeAll(() => {
  console.warn = (msg, ...rest) =>
    !isUnavoidableError(msg.toString(), ...rest) && originalWarn(msg, ...rest);
  console.error = (msg, ...rest) => {
    if (isUnavoidableError(msg.toString(), ...rest)) {
      return;
    }

    originalError(msg, ...rest);
    throw msg;
  };
});

afterAll(() => {
  console.warn = originalWarn;
  console.error = originalError;
});

expect.extend(toHaveNoViolations);
