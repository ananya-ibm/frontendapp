/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useMutation } from '@apollo/client';
import { useSessionContext } from '@exo/frontend-common-session-context';

const AUTHENTICATE = gql`
  mutation Auth($username: String!, $password: String!) {
    authLogin(username: $username, password: $password) {
      token
    }
  }
`;

export const useAuthentication = () => {
  const session = useSessionContext();

  // eslint-disable-next-line no-unused-vars
  const [authenticate] = useMutation(AUTHENTICATE);

  return {
    authenticate: async (username, password) => {
      const res = await authenticate({ variables: { username, password } });

      session.replace({
        token: res.data.authLogin.token,
        username,
        type: 'USER',
        roles: ['user']
      });
      return {
        token: res.data.authLogin.token,
        username
      };
    },
    logout: async () => {
      session.replace({ roles: [] });
    }
  };
};