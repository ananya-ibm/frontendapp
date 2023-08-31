/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

export type MonetaryAmount = {
  value: string | number;
  currency: string;
};

export type Facet = {
  name: string;
  multiSelect?: boolean;
  type: 'MONETARY_AMOUNT' | 'COLOR' | 'CATEGORY' | 'GENERAL';
  entries: FacetEntry[];
};

export type FacetEntry = {
  label: string;
  count?: number;
  code: string;
  state?: string;
  type?: 'select' | 'range';
  extendedLabel?: {
    amount: MonetaryAmount;
    amountLow: MonetaryAmount;
    amountHigh: MonetaryAmount;
  };
};

export type Product = {
  id: string;
  partnumber: string;
  slug: string;
  name: string;
  thumbnail?: string;
  type?: string;
  price: {
    list?: MonetaryAmount;
    offer?: MonetaryAmount;
  };
  reviews?: {
    averageRating: number;
    reviewCount: number;
  };
  availability?: {
    status: string;
    shipNode?: {
      id: string;
      name: string;
    };
    distributionGroup?: {
      id: string;
    };
  }[];
};
