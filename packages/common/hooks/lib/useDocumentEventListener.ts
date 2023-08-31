/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useRef, useEffect } from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

export const useDocumentEventListener = <
  EN extends keyof DocumentEventMap
>(
  eventName: EN,
  handler: (event: DocumentEventMap[EN]) => void
) => {
  const handlerRef = useRef(handler);

  useIsomorphicLayoutEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const eventListener: typeof handler = (event) => handlerRef.current(event);

    document.addEventListener(eventName, eventListener, false);
    return () => {
      document.removeEventListener(eventName, eventListener, false);
    };
  }, [eventName]);
};
