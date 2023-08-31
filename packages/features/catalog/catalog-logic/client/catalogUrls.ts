/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

/* eslint-disable no-else-return */

export type CategoryUrlFactory = (
  categories: { id?: string; slug?: string; identifier?: string }[]
) => string;

export type ProductUrlFactory = (
  product: { id?: string; slug?: string; partnumber?: string },
  sku?: { id?: string; slug?: string; partnumber?: string }
) => string;

const formatAsURLSegment = (str: string) => str?.replace(/[\W]/g, '-');

export const makeCategoryUrlFactory = (useSlugs: boolean): CategoryUrlFactory => categories => {
  if (useSlugs) {
    if (categories[categories.length - 1].slug) {
      return `/catalog/category/${categories.map(c => c.slug).join('/')}`;
    } else {
      return `/catalog/category/${categories.map(c => `id:${c.id}`).join('/')}`;
    }
  } else {
    return `/catalog/category/${categories
      .map(c => formatAsURLSegment(`${c.identifier}_${c.id}`))
      .join('/')}`;
  }
};

export const makeProductUrlFactory = (
  useSlugs: boolean,
  slugSeparator?: string
): ProductUrlFactory => (p, s) => {
  if (useSlugs) {
    let sku = s?.slug ?? s?.toString() ?? '_';
    if (slugSeparator && sku.includes(slugSeparator)) {
      // eslint-disable-next-line prefer-destructuring
      sku = sku.split(slugSeparator)[0];
    }

    if (p.slug) {
      return `/catalog/products/${p.slug}${s ? '/' : ''}${s ? sku : ''}`;
    } else {
      return `/catalog/products/id:${p.id}${s ? '/' : ''}id:${s ? sku : ''}`;
    }
  } else {
    return `/catalog/products/${p.partnumber ?? p.id}${s ? '/' : ''}${
      s ? s.partnumber ?? s.id ?? s : ''
    }`;
  }
};
