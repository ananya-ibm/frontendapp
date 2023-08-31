/*
 Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useLocales } from '@exo/frontend-common-i18n';
import { gql } from '@apollo/client';
import {
  renderDefaultError,
  renderDefaultLoading,
  SmartComponentProps
} from '@exo/frontend-common-utils';
import { useProfileModification } from '@exo/frontend-features-account-profile-logic/client/hooks/useProfileModification';
import { useMe } from '@exo/frontend-features-account-profile-logic/client/hooks/useMe';
import { Address } from '@exo/frontend-features-account-profile-logic/client/model/types';

export const CustomerProfileContainer = ({
  render,
  renderLoading = renderDefaultLoading,
  renderError = renderDefaultError
}: Props) => {
  const { updateDefaultAddress } = useProfileModification();
  const { data, loading, error } = useMe<GQLResponse>({}, CustomerProfileContainer.fragment);
  const intlQ = useLocales();

  if (loading || intlQ.loading) return renderLoading();
  if (error) return renderError(error);

  const onUpdate = async (addr: Address) => {
    await updateDefaultAddress(addr);
  };

  return render({
    address: data!.me.defaultAddress!,
    email: data!.me.email,
    countries: intlQ.dataForForm,
    onUpdate
  });
};

type Props = SmartComponentProps<{
  render: (args: CustomerProfileContainerRenderProps) => JSX.Element;
}>;

export type CustomerProfileContainerRenderProps = {
  address: Address;
  email: Address['email'];
  countries: ReturnType<typeof useLocales>['dataForForm'];
  onUpdate: (addr: Address) => Promise<void>;
};

type GQLResponse = {
  defaultAddress?: Address;
  email?: string;
};

CustomerProfileContainer.fragment = gql`
  fragment CustomerProfileContainer on CusMe {
    defaultAddress {
      id
      address1
      firstName
      lastName
      name
      zip
      email
      countryCode
      countryName
    }
    id
    email
  }
`;
