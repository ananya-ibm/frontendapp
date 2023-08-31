/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { RefObject, useRef, useEffect } from 'react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

type ElementEventNames = keyof HTMLElementEventMap;

export const useEventListener =<
  T extends HTMLElement
>(
  eventName: ElementEventNames,
  handler: (
    event: HTMLElementEventMap[ElementEventNames] | Event,
  ) => void,
  element: RefObject<T>,
) => {
  const handlerRef = useRef(handler)

  useIsomorphicLayoutEffect(() => {
    handlerRef.current = handler
  }, [handler])

  useEffect(() => {
    const target: T = element?.current!;

    const eventListener: typeof handler = event => handlerRef.current(event)

    target.addEventListener(eventName, eventListener)
    return () => {
      target.removeEventListener(eventName, eventListener)
    }
  }, [eventName, element])
}
