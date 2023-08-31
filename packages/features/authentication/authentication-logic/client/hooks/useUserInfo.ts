/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useQuery } from '@apollo/client';

export const useUserInfo = ({ skip }) => {
  const { called, loading, data, error, refetch } = useQuery(
    gql`
      query UserInfo {
        authUserInfo {
          sub
          email
        }
      }
    `,
    {
      fetchPolicy: 'network-only',
      skip
    }
  );

  return { called, loading, refetch, error, data };
};
