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
  mutation marketplaceStoreCreate($input: MarketplaceStoreInput!) {
    marketplaceStoreCreate(input: $input) {
      id
    }
  }
`;

const GET_BY_USER = gql`
  query marketplaceUserStore($email: String!) {
    marketplaceUserStore(email: $email) {
      id
      name
      announcement
      addresses {
        address1
        address2
        city
        zip
        county
        country
        phone
      }
      email
      vatNo
      theme
      logo
      image
    }
  }
`;

const UPDATE = gql`
  mutation marketplaceStoreUpdate($id: ID!, $input: MarketplaceStoreInput!) {
    marketplaceStoreUpdate(id: $id, input: $input) {
      id
      name
      announcement
      addresses {
        address1
        address2
        city
        zip
        county
        country
        phone
      }
      email
      vatNo
      theme
      logo
      image
    }
  }
`;

const DELETE_STORE = gql`
  mutation marketplaceStoreDelete($id: ID!) {
    marketplaceStoreDelete(id: $id)
  }
`;
// ToDo: Update to handle multiple addresses
export const useStoreModifications = () => {
  const session = useSessionContext();

  const [create] = useMutation(CREATE, {
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GET_BY_USER,
        variables: { email: session.username }
      }
    ]
  });

  const [update] = useMutation(UPDATE, {});

  const [remove] = useMutation(DELETE_STORE, {
    awaitRefetchQueries: true,
    refetchQueries: [
      {
        query: GET_BY_USER,
        variables: { email: session.username }
      }
    ]
  });

  return {
    create: async input => {
      if (!session.username) return null;

      return create({
        variables: {
          input: {
            ...input,
            email: session.username
          }
        }
      });
    },
    remove: async id => {
      if (!session.username) return null;
      return remove({
        variables: {
          id
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
