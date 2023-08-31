/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useQuery } from '@apollo/client';
import { assembleQuery, Fragments, handleApolloError, State } from '@exo/frontend-common-apollo';

export const useSampleData = <T>(_args: Args, fragments: Fragments): Result<T> => {
  const { called, loading, data, error } = useQuery(
    assembleQuery(
      names => `
        query Category {
          categoriesTop {
            ${names}
          }
        }
      `,
      fragments
    ),
    {}
  );

  handleApolloError(__filename, error);

  return { called, loading, data: (data && data.categoriesTop) || [] };
};

type Args = {};

type Result<T> = {
  data?: T[];
  called: boolean;
} & State;
