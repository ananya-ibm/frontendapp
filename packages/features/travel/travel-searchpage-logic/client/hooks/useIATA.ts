/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useLazyQuery, gql } from '@apollo/client';
import { handleApolloError } from '@exo/frontend-common-apollo';

const IATACodeQuery = gql`
  query IATAcode($searchTerm: String!) {
    IATAcode(searchTerm: $searchTerm) {
      iataCode
      # geoData {
      #   latitude
      #   longitude
      # }
      type
      subType
      name
      detailedName
      timeZoneOffset
      # locationScore {
      #   travelers {
      #     score
      #   }
      # }
      address {
        cityName
        cityCode
        countryName
        countryCode
      }
    }
  }
`;

export const useIATA = () => {
  const [getIATA, { called, loading, data, error }] = useLazyQuery(IATACodeQuery, {
    // eslint-disable-next-line no-console
    onError: e => console.log('getIATA Error!', e)
  });

  handleApolloError(__filename, error);

  return { getIATA, loading, data, called, error };
};
