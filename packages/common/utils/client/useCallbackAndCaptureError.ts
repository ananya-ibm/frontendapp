/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { ApolloError } from '@apollo/client';
import { useCallback, useState } from 'react';

function useCallbackAndCaptureError<
  E,
  T extends (error: {
    stopPropagation: (e: any) => void;
    setError: (e: E | undefined) => any;
  }) => (...args: any[]) => Promise<any>
>(fn: T, dependencies: any[]): [ReturnType<T>, { error: any; loading: boolean }] {
  const [error, setError] = useState<E | undefined>();
  const [loading, setLoading] = useState<boolean>(false);

  const stopPropagation = useCallback((e: any) => {
    if (e.graphQLErrors) {
      ((e as ApolloError).graphQLErrors[0] as any).handled = true;
    }
  }, []);

  const errorHandler = { stopPropagation, setError };

  const callback = useCallback(
    async (...args) => {
      setLoading(true);
      try {
        await fn(errorHandler)(...args);
      } catch (e) {
        stopPropagation(e);
        setError(e as E);
      } finally {
        setLoading(false);
      }
    },
    [...dependencies, stopPropagation, setError, setLoading]
  );

  return [callback as ReturnType<T>, { error, loading }];
}

export { useCallbackAndCaptureError };