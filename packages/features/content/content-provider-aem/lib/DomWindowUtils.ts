/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable prefer-rest-params, consistent-return */

const safeWindow =
  typeof window === 'undefined'
    ? {
        history: {
          pushState: () => {},
          replaceState: () => {}
        } as Pick<typeof window['history'], 'pushState' | 'replaceState'>,
        dispatchEvent: (e => e) as typeof window['dispatchEvent']
      }
    : window;

const wrapWithEventSupport = (type: 'pushState' | 'replaceState'): any => {
  const orig = safeWindow.history[type];
  if (orig.name === '_wrapped') return;
  return function _wrapped() {
    // @ts-ignore
    const ret = orig.apply(this, arguments);

    const event: Event & { arguments?: any } = new Event(type);
    event.arguments = arguments;
    safeWindow.dispatchEvent(event);

    return ret;
  };
};

export const monkeyPatchWindowForStateChangeEvents = () => {
  safeWindow.history.pushState = wrapWithEventSupport('pushState');
  safeWindow.history.replaceState = wrapWithEventSupport('replaceState');
};
