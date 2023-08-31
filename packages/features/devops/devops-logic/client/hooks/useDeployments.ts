/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useQuery } from '@apollo/client';
import { assembleQuery, Fragments, handleApolloError, State } from '@exo/frontend-common-apollo';
import { useEffect } from 'react';

const transformResponse = <T>(data: any): T => {
  return data?.opsDeployments ?? [];
};

export const useDeployments = <T>(fragments: Fragments): Result<T> => {
  const { called, loading, data, error, subscribeToMore } = useQuery(
    assembleQuery(
      fragmentNames => `
        query OpsDeployments {
          opsDeployments {
            ${fragmentNames}
          }
        }
      `,
      fragments
    )
  );

  const DEPLOYMENT_STATUS = gql`
    subscription {
      opsDeploymentWatch {
        name
        deploymentStatus
      }
    }
  `;

  const subscribeToStatusUpdates = () => {
    subscribeToMore({
      document: DEPLOYMENT_STATUS,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data) return prev;
        const newDeploymentName = subscriptionData.data.opsDeploymentWatch.name;
        const newDeploymentStatus = subscriptionData.data.opsDeploymentWatch.deploymentStatus;
        const existingDeployment = prev.opsDeployments.find(({ name }) => name === newDeploymentName);
        if (!existingDeployment) return prev;
        return {
          opsDeployments: prev.opsDeployments.map((p) => {
            if (p === existingDeployment) {
              return {
                ...existingDeployment,
                deploymentStatus: newDeploymentStatus
              };
            } else {
              return p;
            }
          })
        };
      }
    });
  };

  useEffect(() => {
    subscribeToStatusUpdates();
  }, []);

  handleApolloError(__filename, error);

  return { called, loading, data: transformResponse(data), error };
};

type Result<T> = {
  data?: T;
  called: boolean;
} & State;