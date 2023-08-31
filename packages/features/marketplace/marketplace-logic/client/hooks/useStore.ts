/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useQuery } from '@apollo/client';

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

const GET_BY_ID = gql`
  query marketplaceStore($id: ID!) {
    marketplaceStore(id: $id) {
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

export const useStore = ({ username, storeId }: Args) => {
  const byUserQ = useQuery(GET_BY_USER, {
    variables: { email: username },
    skip: !username
  });

  const byIdQ = useQuery(GET_BY_ID, {
    variables: { id: storeId },
    skip: !storeId
  });

  if (username) return byUserQ;
  else return byIdQ;
};

type Args = {
  username?: string;
  storeId?: string;
};
