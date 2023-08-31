/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import {
  renderDefaultError,
  renderDefaultLoading,
  SmartComponentProps
} from '@exo/frontend-common-utils';
import { useState, useCallback } from 'react';
import { gql } from '@apollo/client';
import { ProductRef } from '@exo/frontend-features-catalog-logic';
import { useStoresWithAvailability } from '../../hooks/useStoresWithAvailability';

export const StoreAvailabilityContainer = ({
  productId,
  onChange,
  countries = [{ code: 'GB', label: 'Great Britain' }],
  selectedCountry,
  selectedStore,
  render,
  renderLoading = renderDefaultLoading,
  renderError = renderDefaultError
}: Props) => {
  const [country, setCountry] = useState(selectedCountry ?? countries[0].code);
  const [search, setSearch] = useState<boolean>();
  const [searchTerm, setSearchTerm] = useState<string>();

  const { data, loading, error } = useStoresWithAvailability<any>(
    search ? { zip: searchTerm, country, productId } : { productId },
    StoreAvailabilityContainer.fragment
  );

  const onSearchCallback = useCallback(
    ({ term: sTerm, country: sCountry }) => {
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
    onChange,
    countries,
    selectedStore,
    selectedCountry: country,
    availability: data?.availability
  });
};

StoreAvailabilityContainer.fragment = gql`
  fragment StoreAvailabilityContainer on AvItemAvailability {
    partnumber
    availability {
      status
      availableDate
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

type Props = SmartComponentProps<{
  productId: ProductRef;
  onChange: (store: string) => any;
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
  render: (args: StoreAvailabilityContainerRenderProps) => JSX.Element;
}>;

export type StoreAvailabilityContainerRenderProps = {
  state?: {
    loading?: boolean;
    error?: any;
  };
  countries?: {
    code: string;
    label: string;
  }[];
  selectedStore?: {
    id: string;
    name: string;
    distance: string | number;
  };
  selectedCountry?: string;
  availability?: {
    partnumber: string;
    availability: {
      shipNode: {
        id: string;
        name: string;
        distance: string | number;
      };
      distributionGroup: {
        id: string;
        name: string;
      };
      status: string;
      availableDate: string;
    }[];
  }[];
  isInitiallyOpen?: boolean;

  onSearch?: (s: any) => void;
  onChange?: (s: any) => void;
};
