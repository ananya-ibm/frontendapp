/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { formatMoney } from '@exo/frontend-common-i18n';
import { Facet, FacetEntry } from '../model/types';

export const getSelectedFacetsList = (
  facets: Facet[],
  selectedFacets: string[] | undefined,
  formatLabel: (facet: Facet, entry: FacetEntry) => string
) => {
  return selectedFacets?.map(selectedCode => {
    const findEntry = (f?: Facet) => f?.entries.find(e => e.code === selectedCode);
    const matchingFacet = facets?.find(f => !!findEntry(f))!;
    const matchingEntry = findEntry(matchingFacet)!;
    return {
      ...matchingEntry,
      label: formatLabel(matchingFacet, matchingEntry),
      facet: {
        ...matchingFacet,
        entries: undefined
      }
    };
  });
};

export const defaultFormatLabel = (facet: Facet, entry: FacetEntry): string => {
  if (facet.type === 'MONETARY_AMOUNT') {
    const low = entry.extendedLabel?.amountLow;
    const high = entry.extendedLabel?.amountHigh;

    if (low || high) {
      const r: string[] = [];
      if (low) r.push(formatMoney(low.value, low.currency));
      if (high) r.push(formatMoney(high.value, high.currency));
      return r.join(' - ').trim();
    }

    if (entry.extendedLabel?.amount) {
      return formatMoney(entry.extendedLabel?.amount.value, entry.extendedLabel?.amount.currency);
    }

    return entry.label;
  }

  return entry.label;
};

export const formatFacetData = (
  facets: Facet[],
  excludeCategories: boolean,
  formatLabel: (facet: Facet, entry: FacetEntry) => string
) => {
  return (facets ?? [])
    .filter(f => !excludeCategories || f.type !== 'CATEGORY')
    .map(f => ({
      ...f,
      entries: f.entries
        .filter(e => e.type === 'select')
        .map(e => ({
          ...e,
          label: formatLabel(f, e)
        }))
    }));
};
