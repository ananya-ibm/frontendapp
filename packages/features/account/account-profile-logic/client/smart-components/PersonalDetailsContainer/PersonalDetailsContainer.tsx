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
import { useProfileModification } from '../../hooks/useProfileModification';
import { useMe } from '../../hooks/useMe';
import { Address } from '../../model/types';

export const PersonalDetailsContainer = ({
  render,
  renderLoading = renderDefaultLoading,
  renderError = renderDefaultError
}: Props) => {
  const { updateDefaultAddress } = useProfileModification();
  const { data, loading, error, refetch } = useMe<GQLResponse>(
    {},
    PersonalDetailsContainer.fragment
  );
  const intlQ = useLocales();

  if (loading || intlQ.loading) return renderLoading();
  if (error) return renderError(error);

  const onUpdate = async (addr: Address) => {
    await updateDefaultAddress(addr);

    // TODO: We should remove this at some point
    refetch!();
  };
  
  return render({ address: data!.me.defaultAddress!, email: data!.me.email, countries: intlQ.dataForForm, onUpdate });
};

type Props = SmartComponentProps<{
  render: (args: PersonalDetailsContainerRenderProps) => JSX.Element;
}>;

export type PersonalDetailsContainerRenderProps = {
  address: Address;
  email: Address["email"];
  countries: ReturnType<typeof useLocales>['dataForForm'];
  onUpdate: (addr: Address) => Promise<void>;
};

type GQLResponse = {
  defaultAddress?: Address;
  email?: string;
};

PersonalDetailsContainer.fragment = gql`
  fragment PersonalDetailsContainer on CusMe {
    defaultAddress {
      titleCode
      id
      address1
      address2
      city
      company
      countryCode
      countryName
      firstName
      lastName
      name
      phone
      province
      zip
      email
    }
    id
    email
  }
`;
