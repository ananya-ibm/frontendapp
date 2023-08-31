/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useQuery, useMutation } from '@apollo/client';
import { useSessionContext } from '@exo/frontend-common-session-context';

const GET_TRADE_IN = gql`
  query GET_TRADE_IN($id: ID!) {
    tradeInValuation(id: $id) {
      id
      registration
      mileage
      condition
      make
      model
      year
      value {
        value
        currency
      }
      oneMonthValue {
        value
        currency
      }
      twoMonthValue {
        value
        currency
      }
    }
  }
`;

const ADD_TRADE_IN = gql`
  mutation ADD_TRADE_IN(
    $mileage: Float!
    $condition: FinTradeInValuationConditionType!
    $registration: String!
    $currency: String
  ) {
    tradeInValuationCreate(
      input: {
        mileage: $mileage
        condition: $condition
        registration: $registration
        currency: $currency
      }
    ) {
      id
      registration
      mileage
      condition
      make
      model
      year
      value {
        value
        currency
      }
      oneMonthValue {
        value
        currency
      }
      twoMonthValue {
        value
        currency
      }
    }
  }
`;

export const useTradeIn = () => {
  const session = useSessionContext();

  const { data, error, loading } = useQuery(GET_TRADE_IN, {
    variables: { id: session.tradeInId },
    skip: !session.tradeInId
  });

  const [addTradeIn] = useMutation(ADD_TRADE_IN, {
    onCompleted: result => session.set({ tradeInId: result.tradeInValuationCreate.id }),
    // eslint-disable-next-line no-console
    onError: e => console.log('Error!', e)
  });

  return {
    getTradeIn: () => ({ data, error, loading }),
    addTradeIn: variables => addTradeIn({ variables: { ...variables, currency: session.currency } })
  };
};
