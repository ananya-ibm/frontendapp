/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useApolloClient, useMutation } from '@apollo/client';
import { useSessionContext } from '@exo/frontend-common-session-context';

const GQL_ADD = gql`
  mutation AddToWishlist($wishlistId: ID!, $lineItems: [WslLineItemInput]) {
    wishlistAdd(wishlistId: $wishlistId, lineItems: $lineItems) {
      id
      lineItems {
        id
        quantity
        item {
          partnumber
          name
          id
          description
          thumbnail
        }
      }
    }
  }
`;

const GQL_UPDATE = gql`
  mutation UpdateWishlist($wishlistId: ID!, $lineItems: [WslLineItemForUpdateInput]) {
    wishlistUpdate(wishlistId: $wishlistId, lineItems: $lineItems) {
      id
      lineItems {
        id
        quantity
        item {
          partnumber
          name
          id
          description
          thumbnail
          }
        }
      }
    }
`;

const GQL_CREATE_CART = gql`
  mutation CreateWishlist {
    wishlistCreate {
      id
    }
  }
`;

const GQL_GET_WISHLISTS = gql`
  query GetWishlistIds {
    me {
      id
      wishlists {
        id
      }
    }
  }
`;

type WishlistResponse = {
  data: {
    me: {
      id: string;
      wishlists: {
        id: string;
        lineItems: {
          id:string;
          quantity: number;
          item: {
            partnumber: string;
            name: string;
            id: string;
            description: string;
            thumbnail?: string;
          };
        }[];
      }[];
    };
  };
};

export const useWishlistModification = () => {
  const apolloClient = useApolloClient();
  const session = useSessionContext();

  const [gqlAdd] = useMutation(GQL_ADD);
  const [gqlUpdate] = useMutation(GQL_UPDATE);
  const [gqlCreate] = useMutation(GQL_CREATE_CART);

  return {
    add: async (wishlistId, items) => {
      await session.get();

      const effectiveItems = [...(Array.isArray(items) ? items : [items])];

      return gqlAdd({ variables: { wishlistId, lineItems: effectiveItems } });
    },

    update: async (wishlistId, items) => {
      return gqlUpdate({ variables: { lineItems: items, wishlistId } });
    },

    getOrCreateWishlist: async () => {
      const wishlists = (await apolloClient.query({
        query: GQL_GET_WISHLISTS
      })) as WishlistResponse;

      if (wishlists.data.me.wishlists.length === 0) {
        const res = await gqlCreate();
        return res?.data?.wishlistCreate?.id;
      } else {
        return wishlists.data.me.wishlists[0].id;
      }
    }
  };
};
