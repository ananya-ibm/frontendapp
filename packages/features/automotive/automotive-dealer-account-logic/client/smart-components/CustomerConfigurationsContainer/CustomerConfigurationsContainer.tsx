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
import { renderDefaultLoading, SmartComponentProps } from '@exo/frontend-common-utils';
import { Configuration } from '../types';
import { getSelectedOptions } from '../../utils/getSelectedOptions';

// @ts-ignore
const getLineItems = (cfg: Configuration) =>
  getSelectedOptions(cfg).map(s => ({ partnumber: s.product.id, quantity: 1 }));

export const CustomerConfigurationsContainer = ({
  render,
  renderLoading = renderDefaultLoading
}: Props) => {

  const { data, loading } = useMe<GQLResponse>({}, CustomerConfigurationsContainer.fragment);

  if (loading) return renderLoading();

  const configurations = data?.me?.configurations;

  if (!configurations || !configurations.length) return render({ configurations: [] });

  return render({
    configurations
  });
};

type GQLResponse = {
  id: string;
  configurations: Configuration[];
};

CustomerConfigurationsContainer.fragment = gql`
  fragment Automotive_SavedConfigrations on CusMe {
    id
    configurations {
      id
      baseProduct {
        id
        description
        longDescription
      }
      optionCategories {
        optionClassifications {
          options {
            selected
            product {
              id
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
};

export type CustomerConfigurationsContainerRenderProps = {
  configurations: Configuration[];
};

type Props = SmartComponentProps<{
  render: (props: CustomerConfigurationsContainerRenderProps) => JSX.Element;
}>;
