/* 
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useMutation, gql } from '@apollo/client';

// TODO: We should change this mutation
const SET_PAYMENT = gql`
  mutation usePayment($financeId: ID, $tradeInId: ID) {
    payInitiate(financeId: $financeId, tradeInId: $tradeInId)
  }
`;

export const usePayment = () => {
  const [initiatePayment] = useMutation(SET_PAYMENT, {
    onError: error => {
      if (process.env.NODE_ENV === 'development' || process.env.JEST_WORKER_ID !== undefined) {
        // eslint-disable-next-line no-console
        console.error(`Error in ${__filename}: ${JSON.stringify(error, undefined, '  ')}`);
      }
      throw error;
    }
  });

  return {
    initiatePayment: async ({
      financeId,
      tradeInId
    }: {
      financeId?: string;
      tradeInId?: string;
    }) => {
      return initiatePayment({
        variables: { financeId, tradeInId }
      });
    }
  };
};
