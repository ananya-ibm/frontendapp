/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-bitwise */
import { onError } from '@apollo/client/link/error';

const isSSR = typeof window === 'undefined';

const isExpired = error => {
  const ext = error?.graphQLErrors?.[0]?.extensions;
  return (
    ext?.code === 'TOKEN_EXPIRED' ||
    ext?.code === 'UNAUTHENTICATED' ||
    ext?.response?.body?.errors?.[0]?.errorKey === '_ERR_INVALID_COOKIE'
  );
};

export const errorLink = onError(args => {
  if (isSSR) {
    return;
  } else if (isExpired(args)) {
    const event = new CustomEvent('token-expired', { detail: args });
    document.dispatchEvent(event);

    // TODO: Probably better to handle this using some sort of retry

    // Ignore error and token expired be handled elsewhere
    // @ts-ignore
    // eslint-disable-next-line no-param-reassign
    args.response.errors = null;
  } else {
    const event = new CustomEvent('gql-error', { detail: args });

    // This must be async to allow to handle exception in regular try/catch
    setTimeout(() => document.dispatchEvent(event), 100);
  }
});
