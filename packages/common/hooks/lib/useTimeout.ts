/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

// See https://overreacted.io/making-setinterval-declarative-with-react-hooks/ for
// explanation

import { useEffect, useRef } from 'react';

type Callback = () => void;

export const useTimeout = (callback: Callback, delay: number) => {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!delay || delay <= 0) return;

    const id = setTimeout(() => savedCallback.current!(), delay);
    return () => clearTimeout(id);
  }, [delay]);
}