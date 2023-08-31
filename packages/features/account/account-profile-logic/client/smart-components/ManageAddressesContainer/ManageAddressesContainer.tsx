/* eslint-disable react/jsx-one-expression-per-line */
/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import {
  removeNull,
  renderDefaultError,
  renderDefaultLoading,
  SmartComponentProps
} from '@exo/frontend-common-utils';
import { useLocales } from '@exo/frontend-common-i18n';
import { useMe } from '../../hooks/useMe';
import { useProfileModification } from '../../hooks/useProfileModification';
import { Address } from '../../model/types';

export const ManageAddressesContainer = ({
  render,
  renderLoading = renderDefaultLoading,
  renderError = renderDefaultError
}: Props) => {
  const { data, loading, error, refetch } = useMe<GQLResponse>(
    {},
    ManageAddressesContainer.fragment
  );

  const intlQ = useLocales();
  const [defaultAddressId, setDefaultAddressId] = useState<string>();

  useEffect(() => {
    if (!data?.me?.defaultAddress?.id) return;
    setDefaultAddressId(data?.me?.defaultAddress?.id);
  }, [data?.me?.defaultAddress?.id, setDefaultAddressId]);

  const profileModification = useProfileModification();

  if (loading || intlQ.loading) return renderLoading();
  if (error ?? intlQ.error) return renderError(error ?? intlQ.error);

  return render({
    defaultAddressId,
    addresses: data?.me?.addresses ?? [],
    countries: intlQ.dataForForm,

    onSetDefaultAddress: async (address: Address) => {
      // TODO: This is weird - updating the address makes it default??
      await profileModification.updateAddress(address.id!, address);
      setDefaultAddressId(address.id);
      refetch!();
    },
    onDeleteAddress: async (deleteAddressId: string) => {
      await profileModification.deleteAddress(deleteAddressId);
    },
    onUpdateAddress: async (address: Address) => {
      await profileModification.updateAddress(address.id!, address);
      setDefaultAddressId(address.id);

      // TODO: We should be able to remove these if we return the address post update
      refetch!();
    },
    onAddAddress: async (address: Address) => {
      const values = removeNull(address);
      values.province = !values.province || values.province === '' ? 'N/A' : values.province;

      await profileModification.addAddress({ ...values, nickName: values.addressName });

      // TODO: We should be able to remove these if we return the address post add
      refetch!();
    }
  });
};

type Props = SmartComponentProps<{
  render: (args: ManageAddressesContainerRenderProps) => JSX.Element;
}>;

export type ManageAddressesContainerRenderProps = {
  defaultAddressId?: string;
  addresses: Address[];
  countries: ReturnType<typeof useLocales>['dataForForm'];
  onSetDefaultAddress: (addr: Address) => Promise<void>;
  onDeleteAddress: (id: string) => Promise<void>;
  onUpdateAddress: (addr: Address) => Promise<void>;
  onAddAddress: (addr: Address) => Promise<void>;
};

type GQLResponse = {
  defaultAddress?: {
    id: string;
  };
  addresses: Address[];
};

ManageAddressesContainer.fragment = gql`
  fragment ManageAddressAddressBook on CusMe {
    id
    username
    addresses {
      id
      address1
      address2
      city
      company
      countryName
      countryCode
      firstName
      lastName
      name
      phone
      province
      zip
      email
      titleCode
    }
    defaultAddress {
      id
    }
  }
`;
