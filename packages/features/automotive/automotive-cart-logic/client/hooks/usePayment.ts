/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import { gql, useMutation } from '@apollo/client';
import { handleApolloError } from '@exo/frontend-common-apollo';

const SET_PAYMENT = gql`
  mutation INITIATE_PAYMENT($financeId: ID, $tradeInId: ID) {
    payInitiate(financeId: $financeId, tradeInId: $tradeInId)
  }
`;

export const usePayment = () => {
  const [initiatePayment, { loading, error }] = useMutation(SET_PAYMENT);

  handleApolloError(__filename, error);

  return {
    initiatePayment: async ({ financeId, tradeInId }) => {
      return initiatePayment({
        variables: { financeId, tradeInId }
      });
    },
    loading,
    error
  };
};
