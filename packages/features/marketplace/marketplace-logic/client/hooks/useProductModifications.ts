/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useMutation } from '@apollo/client';
import { useSessionContext } from '@exo/frontend-common-session-context';

const CREATE = gql`
  mutation commerceProductCreate($input: PrdItemInput!) {
    commerceProductCreate(input: $input) {
      id
    }
  }
`;

const UPDATE = gql`
  mutation commerceProductUpdate($id: ID!, $input: PrdItemInput!) {
    commerceProductUpdate(id: $id, input: $input) {
      partnumber
      name
      description
      longDescription
      thumbnail
      fullImage
      price
      type
      parent
      attributes
      status
    }
  }
`;

export const useProductModifications = () => {
  const session = useSessionContext();

  const [create] = useMutation(CREATE, {});

  const [update] = useMutation(UPDATE, {});

  return {
    create: async input => {
      if (!session.username) return null;

      return create({
        variables: {
          input: {
            ...input
          }
        }
      });
    },

    update: async (id, input) => {
      if (!session.username) return null;
      return update({
        variables: {
          id,
          input: { ...input, email: session.username }
        }
      });
    }
  };
};
