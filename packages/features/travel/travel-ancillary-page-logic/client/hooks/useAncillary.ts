/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useLazyQuery, gql } from '@apollo/client';
import { handleApolloError } from '@exo/frontend-common-apollo';

export const AncillaryQuery = gql`
  query PresentAncillariesOptions($userEmail: String!) {
    presentAncillariesOptions(userEmail: $userEmail) {
      ancillaries {
        ID
        CTID
        name
        price {
          value
          currency
        }
        details
      }
      ancillariesPackages {
        ID
        CTID
        name
        options
        description
      }
    }
  }
`;

export const useAncillary = () => {
  const [getAncillary, { called, loading, data, error }] = useLazyQuery(AncillaryQuery, {
    // eslint-disable-next-line no-console
    onError: e => console.log('getAncillary Error!', e)
  });

  handleApolloError(__filename, error);

  return { getAncillary, loading, data, called, error };
};

export type Ancillary = {
  ID: string;
  CTID: string;
  details: string;
  name: string;
  price: {
    value: number;
    currency: string;
  };
};

export type AncillaryPackage = {
  ID: string;
  CTID: string;
  name: string;
  options: string[];
  description: string;
};

export type SelectedTravelPackage = {
  name: string;
  ID: string;
  priceValue: number;
  priceCurrency: string;
  options: string[] | undefined;
};

export type SelectedAncillary = {
  name: string;
  ID: string;
  priceValue: number;
  priceCurrency: string;
};