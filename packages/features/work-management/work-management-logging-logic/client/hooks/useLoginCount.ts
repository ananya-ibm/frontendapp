/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useQuery } from '@apollo/client';

export const useLoginCount = () => {
  const { called, loading, data, error, refetch } = useQuery(
    gql`
      query LoginCount {
        loginData {
          dateLoaded
          loginCount {
            userLastLoginDate
            userLoginCount
            user {
              id
              name
            }
          }
        }
      }
    `
  );

  return { called, loading, refetch, error, data };
};
