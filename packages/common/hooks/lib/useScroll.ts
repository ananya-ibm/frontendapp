/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable @typescript-eslint/no-use-before-define */

import { useCallback, useRef, useState, useEffect } from 'react';

type Status = {
  canScrollRight: boolean;
  canScrollLeft: boolean;
  canScrollUp: boolean;
  canScrollDown: boolean;
  scrollRight: () => void;
  scrollLeft: () => void;
  scrollUp: () => void;
  scrollDown: () => void;
}

const INITIAL = {
  canScrollDown: false,
  canScrollLeft: false,
  canScrollRight: false,
  canScrollUp: false,
  scrollRight: () => {},
  scrollLeft: () => {},
  scrollUp: () => {},
  scrollDown: () => {}
};


class SSRResizeObserver {
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

export const useScroll = <T extends HTMLElement>(): [(n: T) => void, Status] => {
  const [status, setStatus] = useState<Status>(INITIAL);
  const elRef = useRef<T | null>(null);

  const updateStatus = (newStatus: Status) => {
    if (newStatus.canScrollDown !== status.canScrollDown || 
      newStatus.canScrollUp !== status.canScrollUp || 
      newStatus.canScrollLeft !== status.canScrollLeft || 
      newStatus.canScrollRight !== status.canScrollRight) {
      setStatus(newStatus)
    }
  }

  const onScroll = useCallback((e) => {
    updateStatus(calculate(e.target as T));
  }, []);

  const calculate = ($el: T | null): Status => {
    if (! $el) return INITIAL;
    elRef.current = $el;
    elRef.current.addEventListener('scroll', onScroll);

    return {
      canScrollLeft: $el.scrollLeft > 0,
      canScrollRight: ($el.offsetWidth + $el.scrollLeft) < $el.scrollWidth,
      canScrollUp: $el.scrollTop > 0,
      canScrollDown: ($el.offsetHeight + $el.scrollTop) < $el.scrollHeight,
      scrollLeft: () => $el.scrollBy(-($el.offsetWidth / 3), 0),
      scrollRight: () => $el.scrollBy(($el.offsetWidth / 3), 0),
      scrollUp: () => $el.scrollBy(0, -($el.offsetHeight / 3)),
      scrollDown: () => $el.scrollBy(0, ($el.offsetHeight / 3))
    };
  };

  const EffectiveResizeObserver = (typeof window !== 'undefined' ? () => window.ResizeObserver : () => SSRResizeObserver)();

  const resizeObserver = useRef(
    new EffectiveResizeObserver(entries => {
      entries.forEach(e => {
        updateStatus(calculate(e.target as T));
      });
    })
  );

  useEffect(() => {
    if (elRef.current) {
      elRef.current.addEventListener('scroll', onScroll);
      resizeObserver.current?.observe(elRef.current);
    }
    return () => {
      if (elRef.current) {
        elRef.current.removeEventListener('scroll', onScroll);
        resizeObserver.current?.unobserve(elRef.current);
      }
    };
  }, [elRef, resizeObserver])

  const ref = useCallback<(n: T) => void>(node => {
    if (!node) return;
    resizeObserver.current?.observe(node);
    setStatus(calculate(node));
  }, []);

  return [ref, status];
}