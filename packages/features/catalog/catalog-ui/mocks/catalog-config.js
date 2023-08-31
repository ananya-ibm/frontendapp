/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

export const catalogConfig = {
  useSlugs: true,
  useSlugseparator: true,
  slugSeparator: '@@',
  pdp: {
    availability: 'store',
    template: 'standard'
  },
  plp: {
    availability: 'store',
    reviews: false
  },
  defaultCurrency: 'USD',
  defaultStoreId: undefined,
  baseSort: 'RELEVANCE',
  baseFacets: [],
  filters: {
    includesPrice: true
  }
};
