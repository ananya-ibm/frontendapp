/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql } from '@apollo/client';
import { useState } from 'react';
import { useSessionContext } from '@exo/frontend-common-session-context';
import {
  renderDefaultError,
  renderDefaultLoading,
  SmartComponentProps
} from '@exo/frontend-common-utils';
import { useStores } from '../../hooks/useStores';

export const StoreFinderContainer = ({
  onChange = (() => {}),
  countries = [{ code: 'US', label: 'USA' }],
  render,
  renderLoading = renderDefaultLoading,
  renderError = renderDefaultError
}: Props) => {
  const session = useSessionContext();
  const [country, setCountry] = useState<string>(session.country || countries[0].code);

  // TODO: Maybe store this in the session
  const [location, setLocation] = useState<string[] | undefined>(undefined);

  const { data, loading, error } = useStores<Store>(
    { country, longitude: location?.[0], latitude: location?.[1] },
    StoreFinderContainer.fragment
  );

  if (loading) renderLoading();
  if (error) renderError(error);

  return render({
    stores: data?.stores ?? [],
    selectedStoreId: session.storeId,
    selectedStoreName: session.storeName,
    onChange: (id, name) => onChange(id, name, country),
    onSelectCountry: c => {
      setLocation(undefined);
      setCountry(c);
    },
    onSelectLocation: (longitude, latitude) => {
      setLocation([longitude, latitude]);
    },
    countries,
    country
  });
};

StoreFinderContainer.fragment = gql`
  fragment StoreSummary on StStore {
    id
    name
    city
    address
    country
  }
`;

type Store = {
  id: string;
  name: string;
  city: string;
  address?: string;
  country: string;
};

type Props = SmartComponentProps<{
  countries?: {
    code: string;
    label: string;
  }[];
  onChange?: (id: string, name: string, country?: string) => any;
  render: (args: StoreFinderContainerRenderProps) => JSX.Element;
}>;

export type StoreFinderContainerRenderProps = {
  stores: Store[];
  selectedStoreId?: string;
  selectedStoreName?: string;
  onChange: (id: string, name: string) => any;
  onSelectCountry: (country: string) => void;
  onSelectLocation: (longitude: string, latitude: string) => void;
  countries: {
    code: string;
    label: string;
  }[];
  country?: string;
};
