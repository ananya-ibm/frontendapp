/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import {
  BudgetCalculator,
  STEP_TYPE
} from '@exo/frontend-components-automotive/src/BudgetCalculator/BudgetCalculator';
import { gql } from '@apollo/client';
import { useHistory } from 'react-router-dom';
import { useSessionContext } from '@exo/frontend-common-session-context';
import {
  useBudgetModification,
  useCart
} from '@exo/frontend-features-automotive-cart-automotive-logic';
import * as S from './SmartBudgetCalculator.styles';

type Budget = {
  id: string;
  type: 'UPFRONT' | 'MONTHLY';
  maxMonthlyPayment: string;
  maxUpfrontPayment: string;
  term: string;
  deposit: string;
  annualMileage: string;
};

const DEFAULTS = {
  title: 'Set your budget',
  steps: [
    {
      title: 'How do you want to pay?',
      options: ['Upfront', 'Monthly contract'],
      type: STEP_TYPE.BUTTONS
    },
    {
      title: 'What is your budget?',
      options: {
        0: [
          { id: '10000', label: 'Up to £10,000' },
          { id: '15000', label: 'Up to £15,000' },
          { id: '20000', label: 'Up to £20,000' },
          { id: '25000', label: 'Up to £25,000' },
          { id: '35000', label: 'Up to £35,000' },
          { id: '45000', label: 'Up to £45,000' },
          { id: '50000', label: '£50,000 or more' }
        ],
        1: [
          { id: '9999999', label: 'No maximum' },
          { id: '200', label: 'Up to £200' },
          { id: '300', label: 'Up to £300' },
          { id: '400', label: 'Up to £400' },
          { id: '500', label: 'Up to £500' },
          { id: '5000', label: '£500 +' }
        ]
      },
      type: STEP_TYPE.DROPDOWN,
      label: { 0: 'Budget Amount', 1: 'Monthly Price' }
    },
    {
      title: 'How much will you pay for deposit?',
      options: [
        {
          label: 'How much will you pay for your deposit?',
          min: 0,
          max: 30000,
          step: 1000,
          value: 3000,
          unit: '£'
        },
        {
          label: 'How many miles per annum?',
          min: 1000,
          max: 30000,
          step: 1000,
          value: 10000,
          unit: '£'
        },
        {
          label: 'How many months would you like to pay over?',
          min: 12,
          max: 48,
          step: 6,
          value: 36,
          unit: 'Month'
        }
      ],
      type: STEP_TYPE.SLIDER
    },
    {
      title: 'Do you want to trade your car in?',
      options: ['Not right now', 'Yes, I want to trade-in'],
      type: STEP_TYPE.BUTTONS
    }
  ],
  nextBtnLabel: 'Next',
  savePreferenceLabel: 'Save my budget preference',
  browseCarsLabel: 'Browse cars with budget preference'
};

export const SmartBudgetCalculator = ({
  title = DEFAULTS.title,
  steps = DEFAULTS.steps,
  nextBtnLabel = DEFAULTS.nextBtnLabel,
  savePreferenceLabel = DEFAULTS.savePreferenceLabel,
  browseCarsLabel = DEFAULTS.browseCarsLabel
}: Props) => {
  const sessionContext = useSessionContext();
  const { data, loading } = useCart<Response>({}, SmartBudgetCalculator.fragment);
  const budgetModification = useBudgetModification();
  const history = useHistory();

  if (loading) return <div>Loading...</div>;

  const update = (s: Budget) =>
    sessionContext.set({ budget: { ...(sessionContext.budget ?? {}), ...s } });

  const userBudget: Budget | undefined =
    sessionContext?.type === 'NONE' ? data?.me?.carts?.[0]?.budget : sessionContext?.budget;

  const onSave = async (newBudget: Budget) => {
    console.log("Budget", newBudget);
    const budget = { ...newBudget };
    if (userBudget?.id) {
      // The budget is stored in the session already
      budgetModification.update({ ...budget, id: userBudget.id });
      update({ ...newBudget, id: userBudget.id });
    } else {
      // A new budget needs to be created
      const result = await budgetModification.create(budget);
      update({ ...newBudget, id: result.data.budget.id });
    }
  };

  const onBrowse = async (newBudget: Budget) => {
    await onSave(newBudget);
    history.push('/cart/cart');
  };

  return (
    <S.SmartBudgetCalculator>
      <BudgetCalculator
        title={title}
        steps={steps}
        budget={userBudget}
        nextBtnLabel={nextBtnLabel}
        savePreferenceLabel={savePreferenceLabel}
        browseCarsLabel={browseCarsLabel}
        onSave={onSave}
        onBrowse={onBrowse}
      />
    </S.SmartBudgetCalculator>
  );
};

SmartBudgetCalculator.fragment = gql`
  fragment CartBudget on CrtCart {
    id
    budget {
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

type Response = {
  id: string;
  budget: {
    id: string;
    maxUpfrontPayment: {
      value: string;
    };
    maxMonthlyPayment: {
      value: string;
    };
    term: string;
    type: string;
  };
};

type Props = {
  title?: string;
  steps?: any[];
  nextBtnLabel?: string;
  savePreferenceLabel?: string;
  browseCarsLabel?: string;
};
