/*
Licensed Materials - Property of IBM
694906H
(c) Copyright IBM Corp.  2020 All Rights Reserved

US Government Users Restricted Rights - Use, duplication or disclosure restricted
by GSA ADP Schedule Contract with IBM Corp.
*/

import React from 'react';
import * as R from 'ramda';
import {
  useFinance,
  useCarts,
  useTradeIn
} from '@exo/frontend-features-automotive-cart-automotive-logic';
import { renameKeys, spreadProp } from 'ramda-adjunct';
import { AutomotiveCartSummary } from '@exo/frontend-components-automotive';
import { format, addMonths } from 'date-fns';

import { addImageExt } from '@exo/frontend-common-utils';
import { getPayments } from '../../utilities/Pcp.setup';
import * as S from '../../containers/CheckoutPage.styles';

const AutomotiveCheckoutSummary = ({ isConfirmation, isFinanced }: Props) => {
  const tradeIn = useTradeIn();
  const { data: tradeInData, error: tradeInError, loading: tradeInLoading } = tradeIn.getTradeIn();

  const finance = useFinance();
  const { data: financeData, loading: financeLoading, error: financeError } = finance.getPcp();

  const carts = useCarts();
  const { data, error, loading } = carts.getCarts();

  let tradeInRegistrationNumber;
  let tradeInAmount = 0;

  if (tradeInData && tradeInData.tradeInValuation) {
    tradeInRegistrationNumber = tradeInData.tradeInValuation.registration;
  }

  if (tradeInData && tradeInData.tradeInValuation) {
    tradeInAmount = tradeInData.tradeInValuation.value.value;
  }

  const financeBreakdown = financeData ? getPayments(financeData.personalContractPurchase) : [];

  if (loading || tradeInLoading || financeLoading) return <S.Skeleton />;
  if (error || financeError || tradeInError) return <div>Error</div>;

  const cartItems = data?.me?.carts
    ? // @ts-ignore
      R.pipe(R.propOr([], 'lineItems'), R.pluck('product'))(R.head(data.me.carts))
    : [];

  // @ts-ignore
  const baseProduct = cartItems.find(item =>
    ['Derivative', 'product'].includes(R.pathOr('', ['parentCategory', 'id'], item))
  );

  // @ts-ignore
  const options = cartItems.filter(
    item => !['Derivative', 'product'].includes(R.pathOr('', ['parentCategory', 'id'], item))
  );

  const currency = R.pathOr('GBP', ['price', 'list', 'currency'], baseProduct);

  const mapPrice = R.pipe(
    // @ts-ignore
    R.groupBy(R.path(['parentCategory', 'parentCategory', 'id'])),
    R.toPairs,
    R.map(R.zipObj(['text', 'options'])),
    R.map(
      R.pipe(
        R.evolve({
          options: opts =>
            // @ts-ignore
            R.pipe(R.pluck('price'), R.pluck('list'), R.pluck('value'), R.sum, value => ({
              amount: {
                value,
                currency: R.pathOr('GBP', ['price', 'list', 'currency'], R.head(opts))
              }
              // @ts-ignore
            }))(opts)
        }),
        spreadProp('options')
      )
    )
  );
  // @ts-ignore
  const priceBreakdown = mapPrice(options);
  const mapOptions = () =>
    R.pipe(
      // @ts-ignore
      R.groupBy(R.path(['parentCategory', 'parentCategory', 'id'])),
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
              renameKeys({
                list: 'amount',
                name: 'title'
              }),
              R.assoc('changeButtonText', 'Edit'),
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

  const totalPrice =
    // @ts-ignore
    parseFloat(R.pathOr(0, ['price', 'list', 'value'], baseProduct)) +
    // @ts-ignore
    R.pipe(R.pluck('amount'), R.pluck('value'), R.sum)(priceBreakdown);

  const payableNow = isFinanced
    ? financeData?.personalContractPurchase?.deposit?.value || 0
    : totalPrice;

  return baseProduct ? (
    <AutomotiveCartSummary
      isConfirmation={isConfirmation}
      image={addImageExt(baseProduct.thumbnail)}
      summaryText={baseProduct.description}
      deliveryDate={format(addMonths(new Date(), 1), 'MMMM yyyy')}
      priceBreakdown={[
        {
          text: 'On the road price (OTR)',
          amount: {
            currency,
            value: totalPrice
          },
          // @ts-ignore
          helpText: 'Helpful  about total price'
        },
        {
          text: 'VAT/Taxes',
          amount: {
            currency,
            // @ts-ignore
            value: R.pipe(R.head, R.path(['totalSalesTax', 'value']))(data.me.carts)
          }
        },
        {
          text: 'Balance from trade-in',
          amount: {
            currency,
            value: tradeInAmount
          },
          // @ts-ignore
          helpText: 'Helpful about balance from trade-in'
        },
        {
          text: 'Remaining Balance',
          amount: {
            currency,
            value: totalPrice - tradeInAmount
          },
          // @ts-ignore
          helpText: 'Helpful about remaining balance'
        },
        {
          text: 'Amount payable now',
          amount: {
            currency,
            value: payableNow - tradeInAmount
          },
          // @ts-ignore
          helpText: 'Helpful  about amount payable now'
        }
      ]}
      isFinanced={isFinanced}
      // @ts-ignore
      summarySelections={mapOptions()(options)}
      tradeInRegistrationNumber={tradeInRegistrationNumber}
      // @ts-ignore
      financeBreakdown={financeBreakdown}
    />
  ) : (
    // @ts-ignore
    // eslint-disable-next-line react/jsx-indent
    <AutomotiveCartSummary />
  );
};

type Props = {
  isFinanced?: boolean;
  isConfirmation?: boolean;
};

export default AutomotiveCheckoutSummary;
