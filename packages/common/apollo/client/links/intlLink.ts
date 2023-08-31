/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { setContext } from '@apollo/client/link/context';
import { sessionStorage } from '@exo/frontend-common-session-context';

export const intlLink = setContext((_, { headers }) => {
  const session = sessionStorage.get();
  if (!session) return { headers };

  const intlHeaders = {};
  if (session?.language) intlHeaders['Accept-Language'] = session.language;

  return {
    headers: {
      ...headers,
      ...intlHeaders
    }
  };
});
