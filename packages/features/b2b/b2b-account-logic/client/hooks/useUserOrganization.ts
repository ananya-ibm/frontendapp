/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useQuery } from '@apollo/client';
import { State } from '@exo/frontend-common-apollo';

export const GET_ORGANIZATION = gql`
  query GET_ORGANIZATION {
    me {
      organization {
        id
        name
        members {
          id
          firstName
          lastName
        }
        addresses {
          id
        }
      }
    }
  }
`;

export const useUserOrganization = <T>(): Result<T> => {
  const { loading, error, data } = useQuery(GET_ORGANIZATION, {});

  return { loading, error, data };
};

type Result<T> = { data?: { me: { organization?: T } } } & State;
