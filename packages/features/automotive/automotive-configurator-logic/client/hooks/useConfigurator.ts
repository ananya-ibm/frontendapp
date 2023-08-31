/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql, useQuery, useMutation } from '@apollo/client';

const CREATE_CONFIGURED_ITEM = gql`
  mutation createConfiguredItem($partnumber: String!, $currency: String) {
    configuredItemCreate(currency: $currency, input: { partnumber: $partnumber }) {
      id
      cartId
      baseProduct {
        partnumber
      }
    }
  }
`;

export const DELETE_CONFIGURATION = gql`
  mutation DELETE_CONFIGURATION($id: ID!) {
    deleteConfiguration(id: $id) {
      id
    }
  }
`;

const SAVE_CONFIGURATION = gql`
  mutation SAVE_CONFIGURATION($id: ID!) {
    saveConfiguration(id: $id) {
      id
    }
  }
`;

const UPDATE_ITEM = gql`
  mutation updateItem($id: ID!, $productCode: String!, $selected: Boolean!) {
    configuredItemUpdateOption(input: { id: $id, productCode: $productCode, selected: $selected }) {
      selected
      product {
        id
      }
    }
  }
`;

const CREATE_CONFIGURATION = gql`
  query getConfiguredItem($id: ID!) {
    configuredItem(id: $id) {
      id
      baseProduct {
        description
        longDescription
        price {
          list {
            value
            currency
          }
        }
      }
      optionCategories {
        name
        id
        description
        view
        optionClassifications {
          name
          id
          description
          singleSelect
          options {
            selected
            available
            product {
              id
              name
              thumbnail
              price {
                list {
                  value
                  currency
                }
              }
            }
          }
        }
      }
    }
  }
`;

export type ConfiguredItemResponse = {
  configuredItem: {
    id: string;
    baseProduct: {
      description: string;
      longDescription: string;
      price?: {
        list?: {
          value: string;
          currency: string;
        };
      };
    };
    optionCategories: {
      name: string;
      id: string;
      description: string;
      view: string;
      optionClassifications: {
        name: string;
        id: string;
        description: string;
        singleSelect?: boolean;
        options: {
          selected: boolean;
          available: boolean;
          product: {
            id: string;
            name: string;
            thumbnail: string;
            price?: {
              list?: {
                value: string;
                currency: string;
              };
            };
          };
        }[];
      }[];
    }[];
  };
};

export const useConfigurator = ({
  configurationId,
  getCategories,
  productId,
  handleCompleteCreate,
  handleErrorCreate
}: Args) => {
  const [saveConfiguration, { loading: isSaving }] = useMutation(SAVE_CONFIGURATION);
  const [deleteConfiguration] = useMutation(DELETE_CONFIGURATION);
  const [updateConfigurationItem] = useMutation(UPDATE_ITEM);
  const { loading, error, data } = useQuery<ConfiguredItemResponse>(CREATE_CONFIGURATION, {
    variables: { id: configurationId },
    skip: !configurationId,
    onCompleted: getCategories
  });
  const [handleConfigure, { loading: handleConfigureLoading }] = useMutation(
    CREATE_CONFIGURED_ITEM,
    {
      variables: { partnumber: productId, currency: undefined } as {
        partnumber?: string;
        currency?: string;
      },
      onCompleted: handleCompleteCreate,
      onError: handleErrorCreate
    }
  );

  return {
    saveConfiguration: (id: string) => saveConfiguration({ variables: { id } }),
    deleteConfiguration: (id: string) => deleteConfiguration({ variables: { id } }),
    updateConfigurationItem: (variables: { id: string; productCode: string; selected: boolean }) =>
      updateConfigurationItem({ variables }),
    getConfiguredItem: () => ({ loading, error, data }),
    isSaving,
    handleConfigure,
    handleConfigureLoading
  };
};

type Args = {
  configurationId?: string;
  productId?: string;
  handleCompleteCreate?: ({ configuredItemCreate }: { configuredItemCreate: any }) => void;
  handleErrorCreate?: (err: any) => void;
  getCategories?: (res: ConfiguredItemResponse) => void;
};
