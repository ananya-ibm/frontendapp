/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/
import { gql } from '@apollo/client';
import { useMe } from '@exo/frontend-features-account-profile-logic';
import {
  renderDefaultError,
  renderDefaultLoading,
  SmartComponentProps
} from '@exo/frontend-common-utils';
import { Address } from '../../model/address';

export const AddressBookContainer = ({
  type,
  render,
  renderError = renderDefaultError,
  renderLoading = renderDefaultLoading
}: Props) => {
  const { data, loading, error } = useMe<any>(
    {},
    type === 'personal'
      ? AddressBookContainer.personalAddressFragment
      : AddressBookContainer.orgAddressesFragment
  );

  if (loading) return renderLoading();
  if (error) return renderError(error);

  let addresses: Address[];
  if (type === 'personal') {
    addresses = data?.me?.addresses?.filter(a => a.availableForShipping && a.availableForBilling);
  } else if (type === 'org') {
    addresses = data?.me?.organization?.addresses;
  } else {
    throw new Error(`Unsupported type ${type}`);
  }

  if (!addresses || addresses?.length <= 1) return null;

  return render({ addresses });
};

type Props = SmartComponentProps<{
  type: 'personal' | 'org';
  render: (props: AddressBookContainerRenderProps) => JSX.Element;
}>;

export type AddressBookContainerRenderProps = {
  addresses: Address[];
};

AddressBookContainer.personalAddressFragment = gql`
  fragment CheckoutAddressBook on CusMe {
    id
    addresses {
      id
      address1
      address2
      city
      company
      country
      countryCode
      firstName
      lastName
      name
      phone
      province
      zip
      email
      availableForShipping
      availableForBilling
    }
  }
`;

AddressBookContainer.orgAddressesFragment = gql`
  fragment AddressBook on CusMe {
    id
    organization {
      addresses {
        id
        address1
        address2
        city
        company
        country
        countryCode
        firstName
        lastName
        name
        phone
        province
        zip
        email
      }
    }
  }
`;
