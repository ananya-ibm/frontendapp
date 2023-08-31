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
import { useBnkAccounts } from '../../hooks/useBnkAccounts';

export const BnkAccountsContainer = ({
  render,
  renderLoading = renderDefaultLoading,
  renderError = renderDefaultError
}: Props) => {
  const { loading, data, error } = useBnkAccounts<BnkAccountsResponse[]>(
    BnkAccountsContainer.fragment
  );

  if (loading || !data) return renderLoading();
  if (error) return renderError(error);

  return render({ data });
};

BnkAccountsContainer.fragment = gql`
  fragment BnkAccountsContainer on BnkAccount {
    accountId
    status
    currency
    accountType
    accountSubType
    nickname
    openingDate
    account {
      schemeName
      identification
    }
    balance {
      amount {
        amount
      }
    }
  }
`;

type BnkAccountsResponse = {
  // TODO: Add additional fields
  accountId: string;
  currency: string;
  nickname: string;
  openingDate: string;
  account: any;
  balance: any;
};

export type BnkAccountsContainerRenderProps = {
  data: BnkAccountsResponse[];
};

type Props = SmartComponentProps<{
  render: (props: BnkAccountsContainerRenderProps) => JSX.Element;
}>;
