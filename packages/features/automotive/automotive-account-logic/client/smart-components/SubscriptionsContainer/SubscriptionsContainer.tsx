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
  // TO-DO: Uncomment renderError when BE work is done
  // renderDefaultError,
  renderDefaultLoading,
  SmartComponentProps
} from '@exo/frontend-common-utils';
import { Money } from '../types';

const cancelled = [
  {
    name: 'Charging Plan',
    startDate: '1598532070104'
  }
];

export const SubscriptionsContainer = ({
  render,
  renderLoading = renderDefaultLoading
  // renderError = renderDefaultError
}: Props) => {
  // const { data, loading, error } = useMe<GQLResponse>({}, SubscriptionsContainer.fragment);
  const { data, loading } = useMe<GQLResponse>({}, SubscriptionsContainer.fragment);
  if (loading) return renderLoading();
  //if (error) return renderError(error);

  return render({
    subscriptions: data?.me.subscriptions ?? [],
    cancelled
  });
};

type GQLResponse = {
  subscriptions: {
    id: string;
    status: string;
    startDate: string;
    endDate: string;
    subscribedProducts: {
      id: string;
      status: string;
      startDate: string;
      endDate: string;
      product: {
        id: string;
        partnumber: string;
        name: string;
        thumbnail: string;
        price: {
          list: Money;
        };
      };
    }[];
  }[];
};

// dummy fragment to be completed once BE work is done
SubscriptionsContainer.fragment = gql`
  fragment Subscriptions on CusMe {
    id
    subscriptions {
      id
      status
      startDate
      endDate
      subscribedProducts {
        id
        status
        startDate
        endDate
        product {
          id
          partnumber
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
`;

export type SubscriptionsContainerRenderProps = {
  cancelled: {
    name: string;
    startDate: string;
    isActive?: boolean;
    cost?: string;
    payment?: string;
  }[];
  subscriptions: GQLResponse['subscriptions'];
};

type Props = SmartComponentProps<{
  render: (props: SubscriptionsContainerRenderProps) => JSX.Element;
}>;