/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useMutation, useLazyQuery } from '@apollo/client';
import { useSessionContext } from '@exo/frontend-common-session-context';

const CREATE_FINANCE_OPTION = gql`
  mutation CREATE_FINANCE_OPTION($type: FinFinanceType!, $personalContractPurchase: ID) {
    financeCreate(input: { type: $type, personalContractPurchase: $personalContractPurchase }) {
      id
      type
    }
  }
`;

const PCP_CREATE = gql`
  mutation PCP_CREATE(
    $months: Float!
    $listPrice: Float!
    $deposit: Float!
    $annualMileage: Float!
    $currency: String
  ) {
    personalContractPurchaseCreate(
      input: {
        months: $months
        deposit: $deposit
        listPrice: $listPrice
        annualMileage: $annualMileage
        currency: $currency
      }
    ) {
      id
      months
      apr
      listPrice {
        value
        currency
      }
      totalInterestRepayable {
        value
        currency
      }
      totalRepayment {
        value
        currency
      }
      monthlyRepayment {
        value
        currency
      }
      deposit {
        value
        currency
      }
      annualDepreciation
      annualMileage
    }
  }
`;

const GET_PCP = gql`
  query GET_PCP($id: ID!) {
    personalContractPurchase(id: $id) {
      id
      months
      apr
      listPrice {
        value
        currency
      }
      totalInterestRepayable {
        value
        currency
      }
      totalRepayment {
        value
        currency
      }
      monthlyRepayment {
        value
        currency
      }
      deposit {
        value
        currency
      }
      annualDepreciation
      annualMileage
    }
  }
`;

export const useFinance = () => {
  const session = useSessionContext();

  const [createFinance, { loading: isLoading, error: hasError, data: financeData }] = useMutation(
    CREATE_FINANCE_OPTION,
    {
      onCompleted: ({ financeCreate }) =>
        session.set({ ...session, financeOption: { ...financeCreate } }),
      // eslint-disable-next-line no-console
      onError: e => console.log('createFinance Error!', e)
    }
  );

  const [getPcp, { data, loading, error }] = useLazyQuery(GET_PCP, {
    variables: { id: session.personalContractPurchase },
    // eslint-disable-next-line no-console
    onError: e => console.log("getPcp Error!", e)
  });

  const [createPcp] = useMutation(PCP_CREATE, {
    onCompleted: ({ personalContractPurchaseCreate }) => {

      session.set({
        ...session,
        personalContractPurchase: personalContractPurchaseCreate.id
      });
      getPcp();
    },
    // eslint-disable-next-line no-console
    onError: e => console.log('createPcp Error!', e)
  });
  
  return {
    create: variables => {
      createFinance({ variables });
      // TODO send presentation component to get updated values
      return { hasError, isLoading, financeData };
    },
    createPcp: variables => createPcp({ variables: { ...variables, currency: session.currency } }),

    getPcp: () => ({ data, loading, error })
  };
};
