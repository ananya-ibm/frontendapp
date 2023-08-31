/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useMutation } from '@apollo/client';
import pick from 'lodash/pick';
import { Address } from '../model/types';

/* prettier-ignore */
const cleanAddress = (addr: Address) => {
  return pick(addr,
    [
      'address1',
      'address2',
      'city',
      'company',
      'country',
      'firstName',
      'lastName',
      'name',
      'phone',
      'province',
      'zip',
      'email',
      'titleCode'
    ]);
};

const ADD_ADDRESS = gql`
  mutation AddAddress($address: CusAddressInput!) {
    customerAddAddress(address: $address)
  }
`;

const UPDATE_ADDRESS = gql`
  mutation UpdateAddress($id: ID!, $address: CusAddressInput!) {
    customerUpdateAddress(id: $id, address: $address)
  }
`;

const DELETE_ADDRESS = gql`
  mutation DeleteAddress($id: ID) {
    customerDeleteAddress(id: $id)
  }
`;

const UPDATE_DEFAULT_ADDRESS = gql`
  mutation UpdateDefaultAddress($address: CusAddressInput!) {
    customerUpdateDefaultAddress(address: $address)
  }
`;

const SET_PASSWORD = requireOldPassword =>
  requireOldPassword
    ? gql`
        mutation SetPassword($password: String, $oldPassword: String) {
          customerSetPassword(password: $password, currentPassword: $oldPassword)
        }
      `
    : gql`
        mutation SetPassword($password: String) {
          customerSetPassword(password: $password)
        }
      `;

const REGISTER = gql`
  mutation Register($user: CusCustomerInput!, $address: CusAddressInput!) {
    customerRegister(user: $user, address: $address)
  }
`;

export const useProfileModification = (args?: Args) => {
  const [addressAdd] = useMutation(ADD_ADDRESS);
  const [addressUpdate] = useMutation(UPDATE_ADDRESS);
  const [addressDelete] = useMutation(DELETE_ADDRESS);
  const [setPassword] = useMutation(SET_PASSWORD(args?.requireOldPassword));
  const [register] = useMutation(REGISTER);
  const [updateDefaultAddress] = useMutation(UPDATE_DEFAULT_ADDRESS);

  return {
    addAddress: async (address: Address) => {
      return addressAdd({ variables: { address } });
    },

    updateAddress: async (id: string, address: Address) => {
      return addressUpdate({ variables: { id, address: cleanAddress(address) } });
    },

    deleteAddress: async (id: string) => {
      return addressDelete({ variables: { id } });
    },

    setPassword: async (password: string, oldPassword?: string) => {
      return setPassword({ variables: { password, ...(oldPassword ? { oldPassword } : {}) } });
    },

    register: async (user: Address & { password: string }) => {
      return register({
        variables: {
          user: { username: user.email, password: user.password },
          address: {
            address1: user.address1,
            city: user.city,
            country: user.countryCode,
            firstName: user.firstName,
            lastName: user.lastName,
            name: `${user.lastName}, ${user.firstName}`,
            phone: user.phone,
            province: user.province,
            zip: user.zip,
            email: user.email,
            titleCode: user.titleCode
          }
        }
      });
    },

    updateDefaultAddress: async (address: Address) => {
      return updateDefaultAddress({ variables: { address } });
    }
  };
};

type Args = {
  requireOldPassword?: boolean;
};
