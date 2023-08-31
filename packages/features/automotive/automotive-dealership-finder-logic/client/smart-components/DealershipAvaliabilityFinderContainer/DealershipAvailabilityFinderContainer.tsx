/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { useSessionContext } from '@exo/frontend-common-session-context';
import { gql } from '@apollo/client';
import { useCallback, useState } from 'react';
import { renderDefaultError, SmartComponentProps } from '@exo/frontend-common-utils';
import { useAvailability } from '../../hooks/useAvailability';

export const DealershipAvailabilityFinderContainer = ({
  selectedTrimId,
  countries = [{ code: 'GB', label: 'Great Britain' }],
  renderLoading = () => null,
  render,
  renderError = renderDefaultError
}: Props) => {
  const session = useSessionContext();
  const selectedCountry = session.country ?? 'gb';
  const [country, setCountry] = useState(selectedCountry ?? countries[0].code);
  const [search, setSearch] = useState<boolean>();
  const [searchTerm, setSearchTerm] = useState<string>();

  const [selectedStore, setSelectedStore] = useState({
    id: session.storeId,
    name: session.storeName
  });
  const { data, loading, error } = useAvailability(
    search ? { skuId: selectedTrimId, zip: searchTerm, country, storeIds: [] } : {},
    DealershipAvailabilityFinderContainer.fragment
  );

  const onSearchCallback = useCallback(
    ({ term: sTerm, country: sCountry }: { term?: any; country?: any }) => {
      setSearchTerm(sTerm);
      setCountry(sCountry);
      setSearch(true);
    },
    [setSearchTerm, setCountry, setSearch]
  );

  if (loading) return renderLoading();
  if (error) return renderError(error);

  return render({
    onSearch: onSearchCallback,
    onChange: (storeId: string, storeName: string) => {
      session.set({ storeId, storeName });
      setSelectedStore({ id: storeId, name: storeName });
    },
    countries,
    selectedStore,
    selectedCountry: country,
    availability: data?.availability
  });
};

type Props = SmartComponentProps<{
  selectedTrimId: string;
  countries?: {
    code: string;
    label: string;
  }[];
  selectedCountry?: string;
  selectedStore?: {
    id: string;
    name: string;
    distance: string | number;
  };
  render: (args: DealershipAvailabilityFinderContainerRenderProps) => JSX.Element;
}>;

export type DealershipAvailabilityFinderContainerRenderProps = {
  onSearch: ({ term, country }: { term: string; country?: string }) => void;
  onChange: (storeId: string, storeName: string) => void;
  selectedStore: { id?: string; name?: string };
  selectedCountry: string;
  countries?: {
    code: string;
    label: string;
  }[];
  availability: {
    availability: {
      status: string;
      shipNode?: {
        id: string;
        name: string;
        distance: string;
      };
      distributionGroup?: {
        id: string;
        name: string;
      };
    }[];
  };
};

DealershipAvailabilityFinderContainer.fragment = gql`
  fragment DelaerAvailabilityFinderContainer on AvItemAvailability {
    partnumber
    availability {
      status
      shipNode {
        id
        name
        distance
      }
      distributionGroup {
        id
        name
      }
    }
  }
`;
