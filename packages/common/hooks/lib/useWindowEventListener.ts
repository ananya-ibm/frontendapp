/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useRef, useEffect } from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export const useWindowEventListener = <EN extends keyof WindowEventMap>(
  eventName: EN,
  handler: (event: WindowEventMap[EN]) => void
) => {
  const handlerRef = useRef(handler);

  useIsomorphicLayoutEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener: typeof handler = (event) => handlerRef.current(event);

    window.addEventListener(eventName, eventListener);
    return () => {
      window.removeEventListener(eventName, eventListener);
    };
  }, [eventName]);
};
