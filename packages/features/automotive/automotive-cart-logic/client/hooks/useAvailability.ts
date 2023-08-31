/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useQuery } from '@apollo/client';
import { assembleQuery, handleApolloError } from '@exo/frontend-common-apollo';

export const useAvailability = ({ skuId, storeIds, zip, country }, fragments) => {
  const filter: any = {};
  if (zip) {
    filter.zipCode = zip;
  }
  if (country) {
    filter.country = country;
  }

  const variables: any = {
    ids: [skuId] || [null],
    storeIds: storeIds || []
  };

  if (Object.keys(filter).length > 0) {
    variables.filter = filter;
  }

  const { called, loading, data, error, fetchMore } = useQuery(
    assembleQuery(
      fragmentNames => `
        query Availability($ids: [ID], $storeIds: [ID!], $filter: AvFilter) {
          availability(partnumbers: $ids, shipNodeIds: $storeIds, filter: $filter) {
            ${fragmentNames}
          }
        }
      `,
      fragments
    ),
    {
      skip:
        variables.ids.length <= 0 ||
        (variables.storeIds.length === 0 && variables.filter === undefined),
      variables
    }
  );

  handleApolloError(__filename, error);

  return { called, loading, fetchMore, data };
};
