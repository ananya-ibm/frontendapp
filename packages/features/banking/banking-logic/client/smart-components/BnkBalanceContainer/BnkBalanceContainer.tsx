/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql } from '@apollo/client';
import {
  renderDefaultError,
  renderDefaultLoading,
  SmartComponentProps
} from '@exo/frontend-common-utils';
import { useBnkBalance } from '../../hooks/useBnkBalance';

export const BnkBalanceContainer = ({
  accountId,
  render,
  renderLoading = renderDefaultLoading,
  renderError = renderDefaultError
}: Props) => {
  const { loading, data, error } = useBnkBalance<BnkBalanceResponse>(
    { accountId },
    BnkBalanceContainer.fragment
  );

  if (loading || !data) return renderLoading();
  if (error) return renderError(error);

  return render({ data });
};

BnkBalanceContainer.fragment = gql`
  fragment BnkBalanceContainer on BnkBalance {
    amount {
      amount
      currency
    }
    creditDebitIndicator
    type
    dateTime
    creditLine {
      included
      type
      amount {
        amount
        currency
      }
    }
  }
`;

type BnkBalanceResponse = {
  dateTime: string;
  amount: any;
  creditLine: any;
};

export type BnkBalanceContainerRenderProps = {
  data: BnkBalanceResponse;
};

type Props = SmartComponentProps<{
  accountId?: string;
  render: (props: BnkBalanceContainerRenderProps) => JSX.Element;
}>;
