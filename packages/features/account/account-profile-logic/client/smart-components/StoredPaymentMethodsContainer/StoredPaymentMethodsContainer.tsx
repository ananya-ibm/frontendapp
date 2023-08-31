/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useState, useEffect } from 'react';

import { gql } from '@apollo/client';
import {
  renderDefaultError,
  renderDefaultLoading,
  SmartComponentProps
} from '@exo/frontend-common-utils';
import { useMe } from '../../hooks/useMe';
import { useProfileModification } from '../../hooks/useProfileModification';

const DUMMY_DATA = [
  {
    id: '001',
    cardType: 'Visa Debit Card',
    cardNo: '4242424242424242',
    firstName: 'Someone',
    lastName: 'Something',
    expiryDate: '2024-07-23T00:00:00+0000'
  },
  {
    id: '002',
    cardType: 'Visa Debit Card',
    cardNo: '4242424242424242',
    firstName: 'Someone',
    lastName: 'Something',
    expiryDate: '2024-07-23T00:00:00+0000'
  },
  {
    id: '003',
    cardType: 'Visa Debit Card',
    cardNo: '4242424242424242',
    firstName: 'Someone',
    lastName: 'Something',
    expiryDate: '2024-07-23T00:00:00+0000'
  }
];

export const StoredPaymentMethodsContainer = ({
  render,
  renderError = renderDefaultError,
  renderLoading = renderDefaultLoading
}: Props) => {
  const { data, loading, error } = useMe<any>({}, StoredPaymentMethodsContainer.fragment);

  const profileModification = useProfileModification();

  const [defaultPaymentId, setDefaultPaymentId] = useState<string | undefined>();

  // TODO: This is not needed
  useEffect(() => {
    setDefaultPaymentId(data?.me?.defaultPayment?.id);
  }, [data?.me?.defaultPayment?.id]);

  if (loading) return renderLoading();
  if (error) return renderError(error);

  return render({
    payments: DUMMY_DATA,
    defaultPaymentId,

    onSetDefaultPaymentMethod: () => {},
    onDeletePaymentMethod: () => {},

    profileModification
  });
};

type Props = SmartComponentProps<{
  render: (args: StoredPaymentMethodsContainerRenderProps) => JSX.Element;
}>;

export type StoredPaymentMethodsContainerRenderProps = {
  payments: PaymentMethod[];
  defaultPaymentId?: string;
  onSetDefaultPaymentMethod: (id: string) => void;
  onDeletePaymentMethod: (id: string) => void;
  profileModification: any;
};

type PaymentMethod = {
  id: string;
  cardType: string;
  cardNo: string;
  firstName: string;
  lastName: string;
  expiryDate: string;
};

// dummy fragment to be completed once BE work is done
StoredPaymentMethodsContainer.fragment = gql`
  fragment PaymentBook on CusMe {
    id
    username
    # payment {
    #   cardType
    #   cardNo
    #   firstName
    #   lastName
    #   expiryDate
    # }
    # defaultPayment {
    #   id
    # }
  }
`;
