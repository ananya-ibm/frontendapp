/* eslint-disable react/jsx-indent */
/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useMe } from '@exo/frontend-features-account-profile-logic';
import { gql } from '@apollo/client';
import { useConfigurator } from '@exo/frontend-features-automotive-configurator-logic';
import { useCarts } from '@exo/frontend-features-automotive-cart-automotive-logic';
import { renderDefaultLoading, SmartComponentProps } from '@exo/frontend-common-utils';
import { Configuration, Money } from '../types';
import { getSelectedOptions } from '../../utils/getSelectedOptions';

const getLineItems = (cfg: Configuration) =>
  getSelectedOptions(cfg).map(s => ({ partnumber: s.product.id, quantity: 1 }));

export const SavedConfigurationsContainer = ({
  render,
  renderLoading = renderDefaultLoading
}: Props) => {
  const { deleteConfiguration } = useConfigurator({});
  const cart = useCarts();

  const { data, loading, refetch } = useMe<GQLResponse>({}, SavedConfigurationsContainer.fragment);

  if (loading) return renderLoading();

  const configurations = data?.me?.configurations;

  if (!configurations || !configurations.length) return render({ configurations: [] });

  const handleDelete = async (id: string) => {
    await deleteConfiguration(id);
    refetch?.();
  };

  const addToCart = (id: string) => {
    const configuration = configurations.find(conf => conf.id === id);

    const lineItems = getLineItems(configuration!);
    lineItems.push({ partnumber: configuration!.baseProduct?.id, quantity: 1 });
    return cart.addToCart(lineItems);
  };

  return render({
    configurations,
    onDelete: id => handleDelete(id),
    onCartAdd: id => addToCart(id)
  });
};

type GQLResponse = {
  id: string;
  configurations: Configuration[];
};

SavedConfigurationsContainer.fragment = gql`
  fragment Automotive_SavedConfigrations on CusMe {
    id
    configurations {
      id
      baseProduct {
        id
        description
        longDescription
        thumbnail
        price {
          list {
            value
            currency
          }
        }
      }
      optionCategories {
        optionClassifications {
          options {
            selected
            product {
              id
              price {
                list {
                  value
                }
              }
            }
          }
        }
      }
    }
  }
`;

export type ConfigurationSummary = {
  id: string;
  description?: string;
  image: string;
  productId: string;
  amount: Money;
};

export type SavedConfigurationsContainerRenderProps = {
  configurations: Configuration[];
  onDelete?: (id: string) => any;
  onCartAdd?: (id: string) => any;
};

type Props = SmartComponentProps<{
  render: (props: SavedConfigurationsContainerRenderProps) => JSX.Element;
}>;
