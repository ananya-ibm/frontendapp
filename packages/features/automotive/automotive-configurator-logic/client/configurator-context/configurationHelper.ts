/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import { ConfiguredItemResponse } from '../hooks/useConfigurator';
import { Category } from '../types';

export const mapCategories = (
  categories: ConfiguredItemResponse['configuredItem']['optionCategories']
): Category[] => {
  const res: Category[] = categories?.map(category => ({
    name: category.name,
    id: category.id ?? category.name,
    title: category.description ?? category.name,
    image: category.view,
    subcategories: category.optionClassifications.map(subcategory => ({
      id: subcategory.id ?? subcategory.name,
      title: subcategory.description ?? subcategory.name,
      name: subcategory.name,
      isSingleSelect: subcategory.singleSelect,
      thumbnail: undefined,
      products: subcategory.options.map(product => ({
        id: product.product && product.product.id,
        isSelected: product.selected,
        isAvailable: product.available,
        name: product.product && product.product.name,
        thumbnail: product.product && product.product.thumbnail,
        price: (product.product && product.product.price && product.product.price.list) ?? {
          currency: 'GBP',
          value: '0'
        }
      }))
    }))
  }));
  return res;
};

export const mapUpdatedCategories = (product: any, categories: Category[]) => {
  const updatedCategory = categories
    .map(category =>
      category.subcategories.find(subcategory =>
        subcategory.products.find(option => option.id === product.id)
      )
    )
    .find(Boolean);

  const updatedCategoryId = updatedCategory && updatedCategory.id;
  const isSingleSelect = updatedCategory && updatedCategory.isSingleSelect;

  return categories.map(c => ({
    ...c,
    subcategories: c.subcategories.map(subcat => ({
      ...subcat,
      products: subcat.products.map(option => {
        const selected = !product.isSelected;
        if (option.id === product.id) {
          if (isSingleSelect && !selected) {
            // cannot deselect item by clicking on it if category is singleSelect
            return option;
          }
          return { ...option, isSelected: selected };
        }
        if (isSingleSelect && selected && subcat.id === updatedCategoryId) {
          // deselect all other items in the same category as the selected product if category is single select
          return { ...option, isSelected: false };
        }
        return option;
      })
    }))
  }));
};
