/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { gql } from '@apollo/client';
import {
  renderDefaultError,
  renderDefaultLoading,
  SmartComponentProps
} from '@exo/frontend-common-utils';
import { useProductSearch } from '../../hooks/useProductSearch';
import { defaultFormatLabel, formatFacetData, getSelectedFacetsList } from '../../common/filters';
import { Facet, FacetEntry } from '../../model/types';
import { useEffect } from 'react';

// TODO: Add support for CmmFacetMode
export const SearchFiltersContainer = ({
  term,
  currency,
  formatLabel = defaultFormatLabel,
  selectedFacets,
  excludeCategories = true,
  onLoad,
  render,
  renderError = renderDefaultError,
  renderLoading = renderDefaultLoading
}: Props) => {
  const { loading, data, error } = useProductSearch<Facets>(
    { searchTerm: term, facets: selectedFacets, currency },
    SearchFiltersContainer.fragment
  );

  useEffect(() => {
    if (! data || ! onLoad) return;
    onLoad({
      selectedFacets: getSelectedFacetsList(
        data?.products?.facets!,
        selectedFacets,
        formatLabel
      )
    })
  }, [data, selectedFacets?.join(',')])

  if (loading) return renderLoading();
  if (error) return renderError(error);
  if (!data) return null;

  const facets = data?.products?.facets!;

  return render({
    selectedFacets: getSelectedFacetsList(facets, selectedFacets, formatLabel),
    facets: formatFacetData(facets, excludeCategories, formatLabel)
  });
};

type Facets = {
  facets: Facet[];
};

SearchFiltersContainer.fragment = gql`
  fragment SearchFilter on PrdResultConnection {
    facets {
      name
      multiSelect
      type
      entries {
        label
        count
        code
        state
        type
        extendedLabel {
          ... on CmmFacetExtendedLabelMonetaryAmount {
            amount {
              value
              currency
            }
          }

          ... on CmmFacetExtendedLabelMonetaryAmountRange {
            amountLow {
              value
              currency
            }
            amountHigh {
              value
              currency
            }
          }
        }
      }
    }
  }
`;

type Props = SmartComponentProps<{
  term: string;
  currency: string;
  selectedFacets?: string[];
  formatLabel?: (facet: Facet, entry: FacetEntry) => string;
  excludeCategories?: boolean;
  onLoad?: (d: any) => void;
  render: (props: SearchFiltersContainerRenderProps) => JSX.Element;
}>;

export type SearchFiltersContainerRenderProps = {
  selectedFacets?: ReturnType<typeof getSelectedFacetsList>;
  facets: ReturnType<typeof formatFacetData>;
};
