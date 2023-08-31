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
import { useBnkAccount } from '../../hooks/useBnkAccount';

export const BnkAccountContainer = ({
  accountId,
  render,
  renderLoading = renderDefaultLoading,
  renderError = renderDefaultError
}: Props) => {
  const { loading, data, error } = useBnkAccount<BnkAccountResponse>(
    { accountId },
    BnkAccountContainer.fragment
  );

  if (loading || !data) return renderLoading();
  if (error) return renderError(error);

  return render({ data });
};

BnkAccountContainer.fragment = gql`
  fragment BnkAccountContainer on BnkAccount {
    accountId
    currency
    nickname
    openingDate
    accountType
    account {
      identification
    }
  }
`;

type BnkAccountResponse = {
  // TODO: Add additional fields
  accountId: string;
  currency: string;
  nickname: string;
  openingDate: string;
  accountType: string;
  account: any;
};

export type BnkAccountContainerRenderProps = {
  data: BnkAccountResponse;
};

type Props = SmartComponentProps<{
  accountId?: string;
  render: (props: BnkAccountContainerRenderProps) => any;
}>;
