/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useMutation, useQuery } from '@apollo/client';

const SOFT_CREDIT_CHECK = gql`
  mutation CreditCheckEligibility($input: CreditCheckInput!) {
    creditCheckEligibility(input: $input) {
      decisionStatus
      decisionStatusText
      decisionId
      decisionUUID
      applicationDate
      applicationTime
    }
  }
`;

const FULL_CREDIT_CHECK = gql`
  mutation CreditCheckEligibilityFull($id: ID!, $input: CreditCheckInput!) {
    creditCheckEligibilityFull(id: $id, input: $input) {
      decisionStatus
      decisionStatusText
      decisionId
      decisionUUID
      applicationDate
      applicationTime
    }
  }
`;

const GET_CREDIT_CHECK = gql`
  query CreditCheckDetails($id: ID!) {
    creditCheck(id: $id) {
      decisionId
      decisionStatus
      decisionStatusText
      decisionUUID
      applicationDate
      applicationTime
    }
  }
`;

const SAVE_DECISION_ID = gql`
  mutation SaveDecisionId($id: ID!) {
    saveDecisionId(id: $id)
  }
`;

export const useCreditCheck = () => {
  const [creditCheckInfo, { loading: creditCheckLoading, error: creditCheckError }] =
    useMutation(SOFT_CREDIT_CHECK);

  const [creditCheckFullInfo, { loading: creditCheckFullLoading, error: creditCheckFullError }] =
    useMutation(FULL_CREDIT_CHECK);

  const [saveDecisionId, {error: saveDecisionError}] = useMutation(SAVE_DECISION_ID);

  return {
    updateCreditCheckInfo: async input => {
      // TODO: remove
      // eslint-disable-next-line no-console
      return creditCheckInfo({
        variables: { input }
      });
    },
    updateCreditCheckFullInfo: async (id, input) =>
      creditCheckFullInfo({
        variables: { id, input }
      }),
    saveDecisionId: async id =>
      saveDecisionId({
        variables: { id }
      }),
    creditCheckLoading,
    creditCheckError,
    creditCheckFullLoading,
    creditCheckFullError,
    saveDecisionError
  };
};

export const useCreditCheckDetails = (id: string) => {
  const { data, loading, error } = useQuery(GET_CREDIT_CHECK, {
    variables: {
      id
    }
  });

  return {
    data,
    loading,
    error
  };
};
