/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useMutation } from '@apollo/client';
import { useSessionContext } from '@exo/frontend-common-session-context';
import omit from 'lodash/omit';

const CREATE_BUDGET = gql`
  mutation CreateBudget($input: FinBudgetInput!) {
    budgetCreate(input: $input) {
      id
      maxUpfrontPayment {
        value
      }
      maxMonthlyPayment {
        value
      }
      term
      type
      deposit
      annualMileage
    }
  }
`;

const UPDATE_BUDGET = gql`
  mutation UpdateBudget($id: ID, $input: FinBudgetInput!) {
    budgetUpdate(id: $id, input: $input) {
      id
      maxUpfrontPayment {
        value
      }
      maxMonthlyPayment {
        value
      }
      term
      type
      deposit
      annualMileage
    }
  }
`;

export const useBudgetModification = () => {
  const session = useSessionContext();

  const saveBudgetInSession = key => d => {
    session.set({ budget: d[key] });
  };

  const [budgetCreate] = useMutation(CREATE_BUDGET, {
    onCompleted: saveBudgetInSession('budgetCreate')
  });
  const [budgetUpdate] = useMutation(UPDATE_BUDGET, {
    onCompleted: saveBudgetInSession('budgetUpdate')
  });

  return {
    create: async budget => {
      await session.get();
      return budgetCreate({
        variables: { input: omit({ ...budget, currency: session.currency }, ['id']) }
      });
    },

    update: async budget => {
      await session.get();
      return budgetUpdate({
        variables: {
          id: budget.id,
          input: omit({ ...budget, currency: session.currency }, ['id'])
        }
      });
    }
  };
};
