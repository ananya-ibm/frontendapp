/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { InMemoryCache } from '@apollo/client/cache';

export const cacheFactory = () =>
  new InMemoryCache({
    possibleTypes: {
      NavNode: ['NavContentNode', 'NavDelimiterNode'],
      NavLink: ['NavUrlLink', 'NavCategoryLink', 'NavProductLink']
    },
    typePolicies: {
      Query: {
        fields: {
          products: {
            merge(existing, incoming, { mergeObjects }) {
              return mergeObjects(existing, incoming);
            }
          }
        }
      },
      CrtCart: {
        merge: true
      },
      CrtLineItem: {
        merge: true
      },
      CrtShippingInfo: {
        merge: true
      },
      CrtShippingMode: {
        merge: true
      }
    }
  });
