/*
 Licensed Materials - Property of IBM
 694906H
 (c) Copyright IBM Corp.  2020 All Rights Reserved

 US Government Users Restricted Rights - Use, duplication or disclosure restricted
 by GSA ADP Schedule Contract with IBM Corp.
 */

import { useQuery } from '@apollo/client';
import { assembleQuery, Fragments, handleApolloError, State } from '@exo/frontend-common-apollo';

const transformResponse = <T>(data: any): T => {
  return data?.bnkBalance;
};

export const useBnkBalance = <T>(args: Args, fragments: Fragments): Result<T> => {
  const variables = { ...args };

  const { called, loading, data, error } = useQuery(
    assembleQuery(
      fragmentNames => `
         query BnkBalance($accountId: String) {
           bnkBalance(accountId: $accountId) {
             ${fragmentNames}
           }
         }
       `,
      fragments
    ),
    { variables }
  );

  handleApolloError(__filename, error);

  return { called, loading, data: transformResponse(data), error };
};

type Args = {
  accountId?: string;
};

type Result<T> = {
  data?: T;
  called: boolean;
} & State;
