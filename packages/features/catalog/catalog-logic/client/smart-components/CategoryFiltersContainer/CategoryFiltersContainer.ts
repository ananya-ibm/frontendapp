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
  cond,
  SmartComponentProps
} from '@exo/frontend-common-utils';
import { useCategoryFilters } from '../../hooks/useCategoryFilters';
import { defaultFormatLabel, formatFacetData, getSelectedFacetsList } from '../../common/filters';
import { Facet, FacetEntry } from '../../model/types';
import { CategoryRef } from '../../model/category-ref';
import { useEffect } from 'react';

// TODO: Add support for CmmFacetMode
export const CategoryFiltersContainer = ({
  categoryId,
  formatLabel = defaultFormatLabel,
  currency,
  selectedFacets,
  excludeCategories = true,
  onLoad,
  renderError = renderDefaultError,
  renderLoading = renderDefaultLoading,
  render,
  hasPriceFilters
}: Props) => {
  const { loading, data, error } = useCategoryFilters<Facets>(
    {
      categoryId,
      currency,
      facets: selectedFacets
    },
    CategoryFiltersContainer.fragment(!!hasPriceFilters)
  );

  useEffect(() => {
    if (! data || ! onLoad) return;
    onLoad({
      selectedFacets: getSelectedFacetsList(
        data?.products?.facets,
        selectedFacets,
        formatLabel
      )
    })
  }, [data, selectedFacets?.join(',')])

  if (loading) return renderLoading();
  if (error) return renderError(error);
  if (!data) return null;

  const facets = data?.products?.facets;

  return render({
    selectedFacets: getSelectedFacetsList(facets, selectedFacets, formatLabel),
    facets: formatFacetData(facets, excludeCategories, formatLabel)
  });
};

type Facets = {
  facets: Facet[];
};

CategoryFiltersContainer.fragment = (priceFilters: boolean) => gql`
  fragment CategoryFilter on PrdResultConnection {
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
        ${cond(
          priceFilters,
          `
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
        `
        )}
        
      }
    }
  }
`;

type Props = SmartComponentProps<{
  categoryId: CategoryRef;
  formatLabel?: (facet: Facet, entry: FacetEntry) => string;
  currency: string;
  selectedFacets?: string[];
  excludeCategories?: boolean;
  hasPriceFilters?: boolean;
  onLoad?: (d: any) => void;
  render: (props: CategoryFiltersContainerRenderProps) => JSX.Element;
}>;

export type CategoryFiltersContainerRenderProps = {
  selectedFacets?: ReturnType<typeof getSelectedFacetsList>;
  facets: ReturnType<typeof formatFacetData>;
};

export type SelectedFacetForPresentation = NonNullable<ReturnType<typeof getSelectedFacetsList>>[0];
export type FacetForPresentation = ReturnType<typeof formatFacetData>[0];
