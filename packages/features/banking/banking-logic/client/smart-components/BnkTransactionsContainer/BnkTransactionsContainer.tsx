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
import { useBnkTransactions } from '../../hooks/useBnkTransactions';

export const BnkTransactionsContainer = ({
  accountId,
  render,
  renderLoading = renderDefaultLoading,
  renderError = renderDefaultError
}: Props) => {
  const { loading, data, error } = useBnkTransactions<BnkTransactionsResponse[]>(
    { accountId },
    BnkTransactionsContainer.fragment
  );

  if (loading || !data) return renderLoading();
  if (error) return renderError(error);

  return render({ data });
};

BnkTransactionsContainer.fragment = gql`
  fragment BnkTransactionsContainer on BnkTransaction {
    transactionId
    transactionReference
    bookingDateTime
    transactionInformation
    creditDebitIndicator
    amount {
      amount
    }
    balance {
      amount {
        amount
      }
    }
  }
`;

type BnkTransactionsResponse = {
  transactionId: string;
  transactionReference: string;
  creditDebitIndicator: string;
  transactionInformation: string;
  bookingDateTime: string;
  balance: any;
  amount: any;
};

export type BnkTransactionsContainerRenderProps = {
  data: BnkTransactionsResponse[];
};

type Props = SmartComponentProps<{
  accountId?: string;
  render: (props: BnkTransactionsContainerRenderProps) => JSX.Element;
}>;
