/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import * as R from 'ramda';
import { renameKeys, spreadProp } from 'ramda-adjunct';

// @ts-ignore
export const getCartItems = R.pipe(R.propOr([], 'lineItems'), R.pluck('product'));

export const getBaseProduct = cartItems =>
  cartItems.find(item =>
    ['Derivative', 'product'].includes(R.pathOr('', ['parentCategory', 'id'], item))
  );

export const getOptions = cartItems =>
  cartItems.filter(
    item => !['Derivative', 'product'].includes(R.pathOr('', ['parentCategory', 'id'], item))
  );

export const mapOptions = handleChange =>
  R.pipe(
    // @ts-ignore
    R.groupBy(R.path(['parentCategory', 'id'])),
    R.toPairs,
    R.map(R.zipObj(['title', 'options'])),
    R.map(
      // @ts-ignore
      R.evolve({
        options: R.map(
          R.pipe(
            renameKeys({ name: 'text' }),
            spreadProp('price'),
            spreadProp('parentCategory'),
            renameKeys({ list: 'amount', name: 'title' }),
            R.assoc('changeButtonText', 'Edit'),
            R.assoc('onProductSelectionChange', handleChange),
            R.pick([
              'amount',
              'text',
              'thumbnail',
              'title',
              'changeButtonText',
              'onProductSelectionChange'
            ])
          )
        )
      })
    )
  );

const mapPrice = R.pipe(
  // @ts-ignore
  R.groupBy(R.path(['parentCategory', 'id'])),
  R.toPairs,
  R.map(R.zipObj(['text', 'options'])),
  R.map(
    R.pipe(
      R.evolve({
        options: options =>
          // @ts-ignore
          R.pipe(R.pluck('price'), R.pluck('list'), R.pluck('value'), R.sum, value => ({
            amount: {
              value: R.defaultTo(0)(value),
              currency: R.pathOr('GBP', ['price', 'list', 'currency'], R.head(options))
            }
            // @ts-ignore
          }))(options)
      }),
      spreadProp('options')
    )
  )
);

export const getPriceBreakdown = ({ baseProduct, options }) => {
  // @ts-ignore
  const priceBreakdown = mapPrice(options);
  const currency = R.pathOr('GBP', ['price', 'list', 'currency'], baseProduct);

  return [
    {
      text: 'Base Price',
      amount: {
        currency,
        value: R.pathOr(0, ['price', 'list', 'value'], baseProduct)
      }
    },
    ...priceBreakdown,
    {
      text: 'Total Price',
      amount: {
        currency,
        value:
          // @ts-ignore
          parseFloat(R.pathOr(0, ['price', 'list', 'value'], baseProduct)) +
          // @ts-ignore
          R.pipe(R.pluck('amount'), R.pluck('value'), R.sum)(priceBreakdown)
      }
    }
  ];
};
