/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

// Ensure there's a "window" object even if running in SSR more
const w =
  typeof window === 'undefined'
    ? {
        localStorage: {
          getItem: () => {},
          setItem: () => {}
        },
        addEventListener: () => {}
      }
    : window;

// This would eventually need to be some sort of cross domain storage, but for
// now, use localStorage
export const storage = w.localStorage;

export const addStorageEventListener = (fn: EventListenerOrEventListenerObject) => {
  w.addEventListener('storage', fn);
};
