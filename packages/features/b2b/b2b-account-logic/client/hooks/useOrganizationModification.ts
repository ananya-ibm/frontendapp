/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useMutation } from '@apollo/client';

// TODO: This mutation doesn't exist
const ADD_USER = gql`
  mutation ADD_USER($id: ID!, $members: [OrgMemberInput]) {
    organizationAddMembers(id: $id, members: $members) {
      id
    }
  }
`;

export const useOrganizationModification = () => {
  const [userAdd] = useMutation(ADD_USER);

  return {
    addUser: async (id: string, members: never[]) => {
      return userAdd({ variables: { id, members } });
    }
  };
};
