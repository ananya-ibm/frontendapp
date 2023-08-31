/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { EffectCallback, useRef, useEffect } from 'react';

export const useEffectOnce = (callback: EffectCallback) => {
  const executed = useRef(false);
  const renderedAfterCall = useRef(false);
  const destroyFn = useRef<void | any>();

  if (executed.current) {
    renderedAfterCall.current = true;
  }

  useEffect(() => {
    if (executed.current) return;

    executed.current = true;
    destroyFn.current = callback();

    return () => {
      if (!renderedAfterCall.current) {
        return;
      }

      if (destroyFn.current) {
        destroyFn.current();
      }
    };
  });
};
