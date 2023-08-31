/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useQuery } from '@apollo/client';

const GET_ALL = gql`
  query marketplaceStores {
    marketplaceStores {
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

export const useStores = () => {
  return useQuery(GET_ALL, {});
};
