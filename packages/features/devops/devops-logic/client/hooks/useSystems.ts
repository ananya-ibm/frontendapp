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
  return data?.opsSystems ?? [];
};

export const useSystems = <T>(fragments: Fragments): Result<T> => {
  const { called, loading, data, error } = useQuery(
    assembleQuery(
      fragmentNames => `
         query OpsSystems {
           opsSystems {
             ${fragmentNames}
           }
         }
       `,
      fragments
    )
  );

  handleApolloError(__filename, error);

  return { called, loading, data: transformResponse(data), error };
};

type Result<T> = {
  data?: T;
  called: boolean;
} & State;
