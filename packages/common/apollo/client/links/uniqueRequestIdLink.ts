/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/**
 * This code adds a unique id to each GQL request being sent. This is useful to be able
 * to trace the execution of a request from the frontend, through the adapters and the backends
 * Most of the useful implementation sits in the adapter layer, where the unique request id
 * is added to each log statement and also sent to each downstream backend
 *
 */

/* eslint-disable no-bitwise */
import { setContext } from '@apollo/client/link/context';
import { v4 as uuidv4 } from 'uuid';

export const uniqueRequestIdLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'X-UniqueRequestID': uuidv4()
    }
  };
});
