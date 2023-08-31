/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useLazyQuery, gql } from '@apollo/client';
import { handleApolloError } from '@exo/frontend-common-apollo';

export const GetFlightsFromCTQuery = gql`
  query Products($filter: ProductFilter!, $currency: String, $country: String) {
    products(filter: $filter, currency: $currency, country: $country) {
      edges {
        node {
          id
          name
          description
          partnumber
        }
      }
    }
  }
`;

export const useFlightFromCT = () => {
  const [getFlightsFromCT, { called, loading, data, error }] = useLazyQuery(GetFlightsFromCTQuery, {
    // eslint-disable-next-line no-console
    onError: e => console.log('getFlightsFromCT Error!', e)
  });

  handleApolloError(__filename, error);

  return { getFlightsFromCT, loading, data, called, error };
};