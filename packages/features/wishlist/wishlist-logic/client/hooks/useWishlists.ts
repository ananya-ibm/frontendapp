/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useQuery } from '@apollo/client';
import { MonetaryAmount } from '../monetaryAmount';

export const Wishlists = gql`
  query Wishlists {
    me {
      id
      wishlists {
        id
        lineItems {
          id
          quantity
          item {
            id
            partnumber
            name
            description
            thumbnail
            price {
              list {
                value
                currency
              }
              offer {
                value
                currency
              }
            }
            selection {
              id
              criteria {
                id
                criteriaId
                name
                value {
                  id
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`;

export type WishlistsResponse = {
  me: {
    id: string;
    wishlists: WishlistItem[];
  };
};
export type WishlistItem = {
  id: string;
  lineItems: LineItem[];
};
export type LineItem = {
       quantity: number;
       id: string;
       item: {
          partnumber: string;
          name: string;
          id: string;
          description: string;
          thumbnail?: string;
          price?: {
            list: MonetaryAmount;
            offer: MonetaryAmount;
          };
          selection?: {
            id: string;
            criteria: {
              id: string;
              criteriaId: string;
              name: string;
              value: {
                id: string;
                value: string;
              };
            }[];
          }[];
          };
};      

export const useWishlists = () => {
  const { loading, error, data } = useQuery<WishlistsResponse>(Wishlists);

  return { loading, error, data };
};
