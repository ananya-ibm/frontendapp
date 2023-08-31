/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { SummarySelections } from '@exo/frontend-components-automotive';
import { Category } from '@exo/frontend-features-automotive-configurator-logic';

export type Price = {
  value: number;
  currency: string;
};

export type PriceBreakDown = {
  amount: Price;
  text: string;
}[];

type Unpacked<T> = T extends (infer U)[] ? U : T;

const getCurrency = (category: Category): string => {
  return category.subcategories.flatMap(s => s.products)?.[0].price.currency;
};

const getPrice = (category: Category): Price => {
  return {
    value: category.subcategories
      .flatMap(s => s.products)
      .filter(p => p.isSelected)
      .map(p => Number(p?.price?.value ?? 0))
      .reduce((p, c) => p + c, 0),
    currency: getCurrency(category)
  };
};

export const getPriceBreakDown = (categories: Category[]): PriceBreakDown => {
  return categories.map(category => ({
    amount: getPrice(category),
    text: category.name
  }));
};

export const getSummarySelections = (categories: Category[]): SummarySelections => {
  const mapSubcategory = (subcat: Unpacked<Category['subcategories']>) => {
    return {
      ...subcat,
      products: subcat.products
        .filter(p => p.isSelected)
        .map(p => ({
          ...p,
          title: subcat.name,
          onProductSelectionChange: () => {},
          changeButtonText: 'Change selection',
          thumbnail: p.thumbnail,
          text: p.name,
          amount: p.price
        }))
    };
  };

  return categories.map(c => ({
    ...c,
    title: c.name,
    options: c.subcategories.map(mapSubcategory).flatMap(a => a.products)
  }));
};

export const getTotPrice = (
  basePrice: string | undefined,
  priceBreakdown: PriceBreakDown
): string => {
  const totPrice =
    Number.parseFloat(basePrice ?? '0') + priceBreakdown.reduce((p, c) => p + c.amount.value, 0);
  return totPrice.toFixed(2);
};
